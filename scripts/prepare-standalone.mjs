import { cp, mkdir, rm } from "node:fs/promises";
const target = ".next/standalone";
await mkdir(`${target}/.next`, { recursive: true });
await rm(`${target}/.next/static`, { recursive: true, force: true });
await cp(".next/static", `${target}/.next/static`, { recursive: true });
await rm(`${target}/public`, { recursive: true, force: true });
await cp("public", `${target}/public`, { recursive: true });
console.log("Standalone server assets prepared.");
