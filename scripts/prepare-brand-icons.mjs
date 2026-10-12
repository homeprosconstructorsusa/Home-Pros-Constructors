import sharp from "sharp";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
const directory = "public/icons";
await mkdir(directory, { recursive: true });
// Extract the exact house symbol from the supplied original card. No redraw.
const source = "public/photos/boston/card-06.png";
const region = { left: 414, top: 22, width: 136, height: 132 };
const sizes = [16, 32, 48];
const images = [];
for (const size of [...sizes, 180]) {
  const buffer = await sharp(source).extract(region).resize(size, size, { fit: "contain", background: "#102c28" }).ensureAlpha().png().toBuffer();
  await writeFile(`${directory}/icon-${size}.png`, buffer);
  if (sizes.includes(size)) images.push(buffer);
}
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((buffer, index) => {
  const row = 6 + index * 16;
  header[row] = sizes[index]; header[row + 1] = sizes[index];
  header.writeUInt16LE(1, row + 4); header.writeUInt16LE(32, row + 6);
  header.writeUInt32LE(buffer.length, row + 8); header.writeUInt32LE(offset, row + 12);
  offset += buffer.length;
});
await writeFile(`${directory}/favicon.ico`, Buffer.concat([header, ...images]));
await copyFile(`${directory}/favicon.ico`, "src/app/favicon.ico");
await copyFile(`${directory}/icon-180.png`, "src/app/apple-icon.png");
console.log("Original brand icons prepared: 16, 32, 48, and 180px.");
