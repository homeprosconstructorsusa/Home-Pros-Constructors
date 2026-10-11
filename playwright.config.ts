import "dotenv/config";
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30000,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox"],
    },
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm run start -- --hostname 127.0.0.1 --port 3100",
      url: "http://127.0.0.1:3100",
      env: { CATALOG_MODE: "demo" },
      reuseExistingServer: false,
      timeout: 60000,
    },
    {
      command: "npm run start -- --hostname 127.0.0.1 --port 3101",
      url: "http://127.0.0.1:3101",
      env: { CATALOG_MODE: "live" },
      reuseExistingServer: false,
      timeout: 60000,
    },
    {
      command:
        "python3 -m http.server 3102 --bind 127.0.0.1 --directory preview",
      url: "http://127.0.0.1:3102/homepros-preview.html",
      reuseExistingServer: false,
      timeout: 10000,
    },
  ],
});
