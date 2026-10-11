import { build } from "esbuild";
import { mkdir, readFile, writeFile, rm, cp } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
async function main() {
  const work = resolve(tmpdir(), "homepros-preview-build");
  await mkdir(work, { recursive: true });
  const cssPath = resolve(work, "preview.css");
  const css = spawnSync(
    "node",
    [
      "node_modules/@tailwindcss/cli/dist/index.mjs",
      "-i",
      "src/app/globals.css",
      "-o",
      cssPath,
      "--minify",
    ],
    { stdio: "inherit" },
  );
  if (css.status !== 0) throw new Error("Preview CSS compilation failed");
  const result = await build({
    entryPoints: ["preview/app.tsx"],
    bundle: true,
    minify: true,
    platform: "browser",
    format: "iife",
    write: false,
    alias: {
      "next/link": resolve("preview/link.tsx"),
      "next/image": resolve("preview/image.tsx"),
    },
    define: { "process.env.NODE_ENV": '"production"' },
  });
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Home Pros Constructors · Prévia para aprovação</title><style>${await readFile(cssPath, "utf8")}</style></head><body><div id="root"></div><noscript>Ative o JavaScript para usar a prévia interativa.</noscript><script>${result.outputFiles[0].text.replaceAll("</script", "<\\/script")}</script></body></html>`;
  await writeFile("preview/homepros-preview.html", html);
  await rm("preview/public", { recursive: true, force: true });
  await cp("public", "preview/public", { recursive: true });
  await writeFile(
    "preview/OPEN-ME.txt",
    "Abra homepros-preview.html no navegador do computador. Não é necessário contratar hospedagem. A prévia usa os mesmos componentes do website, com navegação local. Os valores são do modelo enviado para Boston e a disponibilidade é demonstrativa. Não há conexão com pagamentos ou PostgreSQL. Se seu navegador bloquear arquivos locais, execute python3 -m http.server 8080 nesta pasta e abra a porta 8080 no navegador.\n",
  );
  await rm(work, { recursive: true, force: true });
  console.log(
    "Created preview/homepros-preview.html — interactive local review, no hosting required.",
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
