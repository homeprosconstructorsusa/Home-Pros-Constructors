import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";
const password = randomBytes(24).toString("hex");
const contents = `POSTGRES_PASSWORD=${password}\nDATABASE_URL="postgresql://homepros:${password}@127.0.0.1:5432/homepros?schema=public"\nCATALOG_MODE=demo\n`;
try {
  await writeFile(".env", contents, { flag: "wx", mode: 0o600 });
  console.log("Created local-development .env without printing credentials. Do not use this configuration in production.");
} catch (error) {
  if (error.code === "EEXIST") console.log("Existing .env preserved. No values overwritten.");
  else throw error;
}
