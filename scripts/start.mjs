import { spawn } from "node:child_process";
const args = process.argv.slice(2);
let hostname = process.env.HOSTNAME || "127.0.0.1";
let port = process.env.PORT || "3000";
for (let index = 0; index < args.length; index += 2) {
  if (args[index] === "--hostname" && args[index + 1])
    hostname = args[index + 1];
  else if (args[index] === "--port" && /^\d+$/.test(args[index + 1] ?? ""))
    port = args[index + 1];
  else
    throw new Error("Usage: npm start -- [--hostname 127.0.0.1] [--port 3000]");
}
const child = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: { ...process.env, HOSTNAME: hostname, PORT: port },
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => process.exit(code ?? 1));
