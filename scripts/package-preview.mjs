import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { crc32, deflateRawSync } from "node:zlib";

// ZIP the two review files using only the pinned Node 24 runtime.
export async function packagePreview() {
  const source = "preview/homepros-preview.html";
  const files = [
    ["ABRA-O-SITE.html", await readFile(source)],
    ["LEIA-ME.txt", Buffer.from("HOME PROS CONSTRUCTORS — PRÉVIA ATUALIZADA\n\nDê dois cliques em ABRA-O-SITE.html para abrir no Chrome ou Safari.\n\nNo menu Parceria, escolha a Home Pros ou o responsável por uma cidade.\nNa prévia, Abington, Boston e Cambridge possuem contatos fictícios para demonstração.\n\nAbra o arquivo desta nova pasta, criada ao extrair este ZIP. Arquivos de pastas baixadas anteriormente não são atualizados automaticamente.\n\nEsta prévia não efetua pagamentos, não envia mensagens e não contrata hospedagem.\n", "utf8")],
  ];
  const timestamp = (await stat(source)).mtime;
  const fields = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(timestamp).map((part) => [part.type, Number(part.value)]));
  const date = (fields.year - 1980) << 9 | fields.month << 5 | fields.day;
  const time = fields.hour << 11 | fields.minute << 5 | Math.floor(fields.second / 2);
  const parts = [];
  const directory = [];
  let offset = 0;
  for (const [filename, data] of files) {
    const name = Buffer.from(filename, "utf8");
    const compressed = deflateRawSync(data);
    const checksum = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    parts.push(local, name, compressed);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(date, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    directory.push(central, name);
    offset += local.length + name.length + compressed.length;
  }
  const central = Buffer.concat(directory);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(central.length, 12);
  end.writeUInt32LE(offset, 16);
  await mkdir("downloads", { recursive: true });
  await writeFile("downloads/Home-Pros-Preview.zip", Buffer.concat([...parts, central, end]));
}
