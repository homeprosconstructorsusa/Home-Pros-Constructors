import { test, expect } from "@playwright/test";
test("351-city catalog: search, county, availability and reset", async ({
  page,
}) => {
  await page.goto("/states/massachusetts");
  await expect(page.locator(".city-card")).toHaveCount(351);
  await page.getByLabel("Buscar cidades").fill("cambridge");
  await expect(page.locator(".city-card")).toHaveCount(1);
  await expect(page.locator(".city-card")).toContainText("Cambridge");
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await page.getByLabel("Condado", { exact: true }).selectOption("Middlesex");
  await expect(page.locator(".city-card")).toHaveCount(54);
  await page.getByLabel("Disponibilidade").selectOption("RESERVED");
  await expect(page.locator(".city-card")).toHaveCount(1);
  await expect(page.locator(".city-card")).toContainText("Chelmsford");
  await page.getByLabel("Buscar cidades").fill("NoSuchCity");
  await expect(
    page.getByRole("heading", { name: "Nenhuma cidade encontrada" }),
  ).toBeVisible();
});
test("city page and persistent cart prevent duplicates and support removal", async ({
  page,
}) => {
  await page.goto("/cities/cambridge");
  await expect(
    page.getByRole("heading", { name: "Cambridge.", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Adicionar licença ao carrinho" })
    .click();
  await expect(
    page.getByRole("button", { name: "Adicionada ao carrinho" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Ver carrinho" }).click();
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await expect(page.locator(".summary-total")).toContainText("997,00");
  await page.reload();
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await page.goto("/cities/salem");
  await page
    .getByRole("button", { name: "Adicionar licença ao carrinho" })
    .click();
  await page.getByRole("link", { name: "Ver carrinho" }).click();
  await expect(page.locator(".cart-item")).toHaveCount(2);
  await expect(page.locator(".summary-total")).toContainText("1.994,00");
  await page.getByRole("button", { name: "Remover Cambridge" }).click();
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await page.getByRole("button", { name: "Esvaziar carrinho" }).click();
  await expect(
    page.getByRole("heading", { name: "Seu carrinho está vazio" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Pagamento não habilitado" }),
  ).toBeDisabled();
});
test("reserved, sold and missing licenses have safe behavior", async ({
  page,
}) => {
  await page.goto("/cities/chelmsford");
  await expect(
    page.getByRole("button", { name: "Licença reservada" }),
  ).toBeDisabled();
  await page.goto("/cities/worcester");
  await expect(
    page.getByRole("button", { name: "Licença vendida" }),
  ).toBeDisabled();
  const response = await page.goto("/cities/does-not-exist");
  // Next.js documents 200 for streamed not-found responses and 404 before streaming.
  expect([200, 404]).toContain(response?.status());
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(
    page.getByRole("heading", { name: "Vamos encontrar sua cidade." }),
  ).toBeVisible();
});
test("server quote validates identifiers and rejects client price injection", async ({
  request,
}) => {
  const valid = await request.post("/api/cart/quote", {
    data: { slugs: ["cambridge", "salem"], depositTotalCents: 1 },
  });
  expect(valid.status()).toBe(200);
  expect(await valid.json()).toMatchObject({
    depositTotalCents: 199400,
    demo: true,
    checkoutEnabled: false,
    valid: true,
  });
  const invalid = await request.post("/api/cart/quote", {
    data: { slugs: ["../../etc"] },
  });
  expect(invalid.status()).toBe(400);
  const reserved = await request.post("/api/cart/quote", {
    data: { slugs: ["chelmsford"] },
  });
  expect(await reserved.json()).toMatchObject({
    depositTotalCents: 0,
    valid: false,
  });
});
test("mobile pages do not overflow and remain navigable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/states/massachusetts",
    "/cities/west-springfield",
    "/cart",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await page.screenshot({ path: "/tmp/homepros-mobile.png", fullPage: true });
});
test("downloadable preview runs offline with catalog, pages and cart", async ({
  page,
}) => {
  // Managed Chromium blocks file:// navigation; serve only the self-contained HTML.
  await page.route("**/*", (route) =>
    route.request().url() === "http://127.0.0.1:3102/homepros-preview.html"
      ? route.continue()
      : route.abort(),
  );
  await page.goto("http://127.0.0.1:3102/homepros-preview.html");
  await expect(
    page.getByRole("heading", { name: "HOME PROS CONSTRUCTORS", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explorar cidades", exact: true })
    .first()
    .click();
  await expect(page.locator(".city-card")).toHaveCount(351);
  await page.getByLabel("Buscar cidades").fill("Cambridge");
  await page.locator(".city-card").click();
  await page
    .getByRole("button", { name: "Adicionar licença ao carrinho" })
    .click();
  await page.getByRole("link", { name: "Ver carrinho" }).click();
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await expect(page.locator(".summary-total")).toContainText("997,00");
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
  });
  await page.screenshot({ path: "/tmp/homepros-cart.png", fullPage: true });
});
test("desktop design screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("main section").first()).toHaveCSS(
    "background-color",
    "rgb(16, 44, 40)",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("HOME PROS CONSTRUCTORS");
  await expect(page.locator(".home-headline")).toContainText("Trabalhe de Qualquer Lugar do Mundo");
  await expect.poll(() => page.locator(".home-hero-image").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(
    page.locator("main section").first().locator(".shell"),
  ).toHaveCSS("display", "grid");
  await page.screenshot({ path: "/tmp/homepros-home.png", fullPage: true });
  await page.goto("/states/massachusetts");
  await page.getByLabel("Buscar cidades").fill("Cambridge");
  await page.screenshot({ path: "/tmp/homepros-catalog.png", fullPage: true });
});
test("live PostgreSQL publishes a license and preserves changes on reseed", async ({
  page,
  request,
}) => {
  const { Pool } = await import("pg");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const previous = (
    await pool.query('SELECT * FROM "CityLicense" WHERE slug = $1', [
      "cambridge",
    ])
  ).rows[0];
  try {
    expect(
      Number(
        (
          await pool.query(
            'SELECT COUNT(*) AS count FROM "CityLicense" WHERE state = $1',
            ["MA"],
          )
        ).rows[0].count,
      ),
    ).toBe(351);
    const { execFileSync } = await import("node:child_process");
    execFileSync(
      "npm",
      [
        "run",
        "catalog:set",
        "--",
        "cambridge",
        "AVAILABLE",
        "123400",
        "348500",
        "18",
      ],
      { stdio: "pipe" },
    );
    execFileSync("npm", ["run", "db:seed"], { stdio: "pipe" });
    expect(
      (
        await pool.query(
          'SELECT "depositCents" FROM "CityLicense" WHERE slug = $1',
          ["cambridge"],
        )
      ).rows[0].depositCents,
    ).toBe(123400);
    await page.goto("http://127.0.0.1:3101/cities/cambridge");
    await expect(page.locator(".summary-card")).toContainText("1.234,00");
    await expect(page.locator(".demo-bar")).toHaveCount(0);
    await page
      .getByRole("button", { name: "Adicionar licença ao carrinho" })
      .click();
    await page.getByRole("link", { name: "Ver carrinho" }).click();
    await expect(page.locator(".summary-total")).toContainText("1.234,00");
    execFileSync("npm", ["run", "catalog:set", "--", "cambridge", "RESERVED"], {
      stdio: "pipe",
    });
    const quote = await request.post("http://127.0.0.1:3101/api/cart/quote", {
      data: { slugs: ["cambridge"] },
    });
    expect(await quote.json()).toMatchObject({
      demo: false,
      valid: false,
      depositTotalCents: 0,
    });
    await page.reload();
    await expect(
      page.getByText("Esta licença está indisponível.", { exact: false }),
    ).toBeVisible();
  } finally {
    await pool.query(
      'UPDATE "CityLicense" SET status = $1, "depositCents" = $2, "totalPriceCents" = $3, "installmentCount" = $4, currency = $5 WHERE slug = $6',
      [
        previous.status,
        previous.depositCents,
        previous.totalPriceCents,
        previous.installmentCount,
        previous.currency,
        "cambridge",
      ],
    );
    await pool.end();
  }
});

test("City albums can be read before entering details and enlarged offline", async ({ page }) => {
  await page.goto("/states/massachusetts");
  await page.getByLabel("Buscar cidades").fill("Boston");
  const album = page.getByRole("region", { name: "Álbum de Boston", exact: true });
  await album.getByRole("button", { name: "Ampliar cards de Boston" }).click();
  const dialog = page.getByRole("dialog", { name: "Cards de Boston ampliados" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Próximo card" }).click();
  await expect(dialog).toContainText("Card 2 de 6");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("Card 1 de 6");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(album.getByRole("button", { name: "Ampliar cards de Boston" })).toBeFocused();
  await page.getByRole("link", { name: "Ver detalhes de Boston" }).click();
  const detailAlbum = page.getByRole("region", { name: "Álbum de Boston", exact: true });
  for (let index = 1; index <= 6; index++) {
    await detailAlbum.getByRole("button", { name: `Ver card ${index}`, exact: true }).click();
    await expect(detailAlbum.getByRole("button", { name: "Ampliar cards de Boston" }).locator("img")).toBeVisible();
    await expect.poll(() => detailAlbum.locator(".album-cover img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.screenshot({ path: "/tmp/homepros-boston-album.png", fullPage: true });
  await page.goto("/cities/cambridge");
  await expect(page.getByRole("region", { name: "Álbum de Cambridge" })).toHaveCount(0);
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/cities/boston");
  await page.getByRole("button", { name: "Ver card 3", exact: true }).click();
  await page.getByRole("button", { name: "Ampliar cards de Boston" }).click();
  const offlineDialog = page.getByRole("dialog");
  await expect(offlineDialog).toContainText("Card 3 de 6");
  await expect(offlineDialog.locator("img")).toHaveAttribute("src", /^data:image\/png;base64,/);
  await expect.poll(() => offlineDialog.locator("img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBe(1122);
  await offlineDialog.getByRole("button", { name: "Fechar" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
