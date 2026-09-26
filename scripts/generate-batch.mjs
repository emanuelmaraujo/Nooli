import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.join("=") || true];
  })
);

const count = Number(args.count ?? 20);
const batch = String(args.batch ?? "pilot");
const base = String(args.base ?? "").replace(/\/$/, "");
const productType = String(args.product ?? "google_review");

const allowedProducts = new Set(["google_review", "direct_link", "nooli_page"]);

if (!Number.isInteger(count) || count < 1 || count > 100000) {
  throw new Error("--count deve ser um inteiro entre 1 e 100000");
}

if (!/^https:\/\//i.test(base)) {
  throw new Error("--base deve ser uma URL HTTPS");
}

if (!allowedProducts.has(productType)) {
  throw new Error("--product inválido");
}

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomCode(length) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return out;
}

function csvCell(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) return '"' + str.replaceAll('"', '""') + '"';
  return str;
}

function toCsv(rows) {
  return rows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}

const root = path.resolve("exports", batch);
const qrDir = path.join(root, "qr");
await fs.mkdir(qrDir, { recursive: true });

const used = new Set();
const factoryRows = [[
  "sequence",
  "public_code",
  "product_type",
  "redirect_url",
  "nfc_url",
  "qr_file"
]];
const inventoryRows = [[
  "sequence",
  "public_code",
  "product_type",
  "redirect_url",
  "status"
]];

for (let sequence = 1; sequence <= count; sequence++) {
  let publicCode;
  do {
    publicCode = randomCode(10);
  } while (used.has(publicCode));
  used.add(publicCode);

  const redirectUrl = `${base}/${publicCode}`;
  const number = String(sequence).padStart(6, "0");
  const file = `${number}_${publicCode}.svg`;

  const svg = await QRCode.toString(redirectUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 768
  });

  await fs.writeFile(path.join(qrDir, file), svg, "utf8");

  factoryRows.push([
    number,
    publicCode,
    productType,
    redirectUrl,
    redirectUrl,
    `qr/${file}`
  ]);

  inventoryRows.push([
    number,
    publicCode,
    productType,
    redirectUrl,
    "manufactured"
  ]);
}

await fs.writeFile(path.join(root, "factory.csv"), toCsv(factoryRows), "utf8");
await fs.writeFile(path.join(root, "inventory.csv"), toCsv(inventoryRows), "utf8");

console.log(`Lote ${batch} criado: ${count} placas em ${root}`);
console.log(`Produto: ${productType}`);
console.log("Envie factory.csv + pasta qr/ para a gráfica.");
