import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.join("=") || true];
  })
);

const batchName = String(args.batch ?? "").trim();
const root = String(args.dir ?? path.resolve("exports", batchName));
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!batchName) {
  throw new Error("Informe --batch=NOME_DO_LOTE");
}

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell || row.length) {
    row.push(cell.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers, ...data] = rows;
  return data.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))
  );
}

const inventoryPath = path.join(root, "inventory.csv");
const rows = parseCsv(await fs.readFile(inventoryPath, "utf8"));

if (!rows.length) {
  throw new Error(`Nenhuma linha encontrada em ${inventoryPath}`);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const { data: batch, error: batchError } = await supabase
  .from("batches")
  .select("id,name")
  .eq("name", batchName)
  .maybeSingle();

if (batchError) throw batchError;
if (!batch) {
  throw new Error(
    `O lote "${batchName}" não existe no Supabase. Cadastre o lote e as placas antes de registrar os endpoints.`
  );
}

const plateCodes = rows.map((row) => row.plate_public_code).filter(Boolean);
const { data: plates, error: platesError } = await supabase
  .from("plates")
  .select("id,public_code,batch_id")
  .eq("batch_id", batch.id)
  .in("public_code", plateCodes);

if (platesError) throw platesError;

const plateByCode = new Map((plates ?? []).map((plate) => [plate.public_code, plate]));
const missing = plateCodes.filter((code) => !plateByCode.has(code));

if (missing.length) {
  throw new Error(
    `Há ${missing.length} placa(s) do CSV que ainda não existem no banco. Exemplos: ${missing.slice(0, 5).join(", ")}`
  );
}

const endpointRows = [];

for (const row of rows) {
  const plate = plateByCode.get(row.plate_public_code);
  if (!plate) continue;

  endpointRows.push({
    public_code: row.qr_public_code,
    kind: "qr",
    plate_id: plate.id,
    batch_id: batch.id,
    status: "available"
  });

  endpointRows.push({
    public_code: row.nfc_public_code,
    kind: "nfc",
    plate_id: null,
    batch_id: batch.id,
    status: "available"
  });
}

const codes = endpointRows.map((endpoint) => endpoint.public_code);
const { data: existing, error: existingError } = await supabase
  .from("plate_endpoints")
  .select("public_code,kind,plate_id")
  .in("public_code", codes);

if (existingError) throw existingError;

const existingByCode = new Map((existing ?? []).map((endpoint) => [endpoint.public_code, endpoint]));
const conflicts = endpointRows.filter((endpoint) => {
  const current = existingByCode.get(endpoint.public_code);
  if (!current) return false;
  return current.kind !== endpoint.kind ||
    (endpoint.kind === "qr" && current.plate_id !== endpoint.plate_id);
});

if (conflicts.length) {
  throw new Error(
    `Foram encontrados ${conflicts.length} código(s) já cadastrados com vínculo diferente. Operação cancelada.`
  );
}

const toInsert = endpointRows.filter((endpoint) => !existingByCode.has(endpoint.public_code));

if (toInsert.length) {
  const chunkSize = 500;
  for (let index = 0; index < toInsert.length; index += chunkSize) {
    const chunk = toInsert.slice(index, index + chunkSize);
    const { error } = await supabase.from("plate_endpoints").insert(chunk);
    if (error) throw error;
  }
}

console.log(`Lote: ${batchName}`);
console.log(`Placas validadas: ${plates?.length ?? 0}`);
console.log(`Endpoints esperados: ${endpointRows.length}`);
console.log(`Já existentes: ${existing?.length ?? 0}`);
console.log(`Inseridos agora: ${toInsert.length}`);
console.log("Registro concluído. QR e NFC estão prontos para o pareamento físico.");
