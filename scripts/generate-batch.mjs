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

function randomCode(length = 10) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return out;
}

function uniqueCode(used) {
  let code;
  do {
    code = randomCode();
  } while (used.has(code));
  used.add(code);
  return code;
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
  "plate_public_code",
  "product_type",
  "qr_public_code",
  "qr_url",
  "qr_file"
]];
const nfcRows = [[
  "tag_sequence",
  "nfc_public_code",
  "nfc_url",
  "status"
]];
const inventoryRows = [[
  "sequence",
  "plate_public_code",
  "product_type",
  "qr_public_code",
  "nfc_public_code",
  "pairing_status",
  "status"
]];

const nfcPool = [];

for (let sequence = 1; sequence <= count; sequence++) {
  const nfcCode = uniqueCode(used);
  const number = String(sequence).padStart(6, "0");
  nfcPool.push({
    number,
    code: nfcCode,
    url: `${base}/n/${nfcCode}`
  });
}

for (let sequence = 1; sequence <= count; sequence++) {
  const qrCode = uniqueCode(used);
  const number = String(sequence).padStart(6, "0");
  const qrUrl = `${base}/q/${qrCode}`;
  const file = `${number}_${qrCode}.svg`;

  const svg = await QRCode.toString(qrUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 768
  });

  await fs.writeFile(path.join(qrDir, file), svg, "utf8");

  factoryRows.push([
    number,
    qrCode,
    productType,
    qrCode,
    qrUrl,
    `qr/${file}`
  ]);

  const nfc = nfcPool[sequence - 1];
  inventoryRows.push([
    number,
    qrCode,
    productType,
    qrCode,
    nfc.code,
    "unpaired",
    "manufactured"
  ]);
}

for (const tag of nfcPool) {
  nfcRows.push([
    tag.number,
    tag.code,
    tag.url,
    "available"
  ]);
}

await fs.writeFile(path.join(root, "factory.csv"), toCsv(factoryRows), "utf8");
await fs.writeFile(path.join(root, "nfc-inventory.csv"), toCsv(nfcRows), "utf8");
await fs.writeFile(path.join(root, "inventory.csv"), toCsv(inventoryRows), "utf8");

console.log(`Lote ${batch} criado: ${count} placas + ${count} tags NFC em ${root}`);
console.log(`Produto: ${productType}`);
console.log("A gráfica recebe factory.csv + qr/. As tags usam nfc-inventory.csv.");
console.log("A correspondência final QR↔NFC é feita por leitura física na Torvya, não por sequência.");
