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
    "/courses/video-editing",
    "/courses/video-editing/abington",
    "/courses/video-editing/complete",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  for (const picture of await page.locator(".showcase-photo").all()) {
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
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
    .locator(".showcase-license")
    .getByRole("link", { name: /^Explorar cidades/ })
    .click();
  await expect(page.locator(".city-card")).toHaveCount(351);
  await page.getByLabel("Buscar cidades").fill("Cambridge");
  await page.getByRole("link", { name: "Ver detalhes de Cambridge" }).click();
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
    "rgb(248, 250, 248)",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("HOME PROS CONSTRUCTORS");
  await expect(page.locator(".home-headline")).toContainText("Trabalhe de Qualquer Lugar do Mundo");
  await expect.poll(() => page.locator(".page-backdrop-home .scene-image").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".page-backdrop-home .scene-image")).toHaveAttribute("src", /home-liberty\.png/);
  const agency = page.locator(".showcase-license");
  await expect(agency.locator("h2")).toContainText("Trabalhe de casa ou de qualquer lugar.");
  await expect(agency.locator("h2")).toContainText("Ganhe em dólares.");
  await expect(agency.locator("figcaption")).toHaveText("Em casa ou em um coworking.");
  await expect.poll(() => agency.locator(".agency-dollar-scene img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(agency.locator(".agency-dollar-scene img")).toHaveAttribute("src", /dollars\.webp/);
  const desktopPhotos = agency.locator(".agency-work-frame");
  const desktopFirst = await desktopPhotos.nth(0).boundingBox();
  const desktopSecond = await desktopPhotos.nth(1).boundingBox();
  expect(desktopFirst!.y).toBe(desktopSecond!.y);
  expect(desktopFirst!.x + desktopFirst!.width).toBeLessThan(desktopSecond!.x);
  await expect(
    page.locator("main section").first().locator(".shell"),
  ).toHaveCSS("display", "grid");
  await expect.poll(() => page.locator(".page-backdrop-market img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  for (const picture of await page.locator(".showcase-photo").all()) {
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "/tmp/homepros-home.png", fullPage: true });
  await page.goto("/cities/boston");
  await expect.poll(() => page.locator(".page-backdrop-boston img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: "/tmp/homepros-boston-background.png" });
  await page.goto("/cities/abington");
  await expect.poll(() => page.locator(".page-backdrop-abington img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: "/tmp/homepros-abington-background.png" });
  await page.goto("/cart");
  await expect.poll(() => page.locator(".page-backdrop-cart img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: "/tmp/homepros-cart-background.png", fullPage: true });
  await page.goto("/states/massachusetts");
  await page.getByLabel("Buscar cidades").fill("Cambridge");
  await expect.poll(() => page.locator(".page-backdrop-catalog img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
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
    await expect(page.locator(".purchase-entry")).toContainText("1.234,00");
    await expect(page.locator(".purchase-breakdown")).toContainText("3.485,00");
    await expect(page.locator(".purchase-breakdown")).toContainText("2.251,00");
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
  await expect(page.locator(".city-card .city-album")).toHaveCount(351);
  await expect(page.locator("dialog img")).toHaveCount(0);
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
  const cambridgeAlbum = page.getByRole("region", { name: "Álbum de Cambridge", exact: true });
  await expect(cambridgeAlbum).toBeVisible();
  await cambridgeAlbum.getByRole("button", { name: "Ver card 6", exact: true }).click();
  await expect(cambridgeAlbum.locator(".album-cover img")).toHaveAttribute("alt", /Home Pros School.*1º trimestre de 2027/);
  await expect(cambridgeAlbum.locator(".album-cover img")).toHaveAttribute("src", /general/);
  await page.goto("/cities/abington");
  await expect(page.getByRole("region", { name: "Álbum de Abington", exact: true })).toBeVisible();
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/cities/boston");
  await page.getByRole("button", { name: "Ver card 3", exact: true }).click();
  await page.getByRole("button", { name: "Ampliar cards de Boston" }).click();
  const offlineDialog = page.getByRole("dialog");
  await expect(offlineDialog).toContainText("Card 3 de 6");
  await expect(offlineDialog.locator("img")).toHaveAttribute("src", /^blob:/);
  await expect.poll(() => offlineDialog.locator("img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBe(1122);
  await offlineDialog.getByRole("button", { name: "Fechar" }).click();
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/states/massachusetts");
  await expect(page.locator(".city-card .city-album")).toHaveCount(351);
  const covers = page.locator(".album-cover img");
  const sources = await covers.evaluateAll((images) => images.map((img) => img.getAttribute("src")));
  expect(new Set(sources).size).toBe(1);
  await page.getByLabel("Buscar cidades").fill("Abington");
  await page.getByRole("button", { name: "Ampliar cards de Abington" }).click();
  const abingtonDialog = page.getByRole("dialog");
  await abingtonDialog.getByRole("button", { name: "Card anterior" }).click();
  await expect(abingtonDialog).toContainText("Card 6 de 6");
  await expect(abingtonDialog.locator("img")).toHaveAttribute("alt", /Home Pros School.*2027/);
  await abingtonDialog.getByRole("button", { name: "Fechar" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("City pages explain the license before the album and separate payment amounts", async ({ page }) => {
  await page.goto("/cities/abington");
  const overview = page.locator(".city-overview");
  const album = page.getByRole("region", { name: "Álbum de Abington", exact: true });
  await expect(overview).toBeVisible();
  await expect(album).toBeVisible();
  await expect(overview).toContainText("licença de uso da cidade de Abington, em Massachusetts");
  await expect(overview).toContainText("conforme contrato");
  const overviewBox = await overview.boundingBox();
  const albumBox = await album.boundingBox();
  expect(overviewBox!.y + overviewBox!.height).toBeLessThan(albumBox!.y);
  const summary = page.getByRole("complementary", { name: "Condições da licença de Abington" });
  await expect(summary.locator(".purchase-entry")).toContainText("Entrada");
  await expect(summary.locator(".purchase-entry")).toContainText("997,00");
  await expect(summary.locator(".purchase-breakdown")).toContainText("Valor total da licença");
  await expect(summary.locator(".purchase-breakdown")).toContainText("3.485,00");
  await expect(summary.locator(".purchase-breakdown")).toContainText("Saldo restante");
  await expect(summary.locator(".purchase-breakdown")).toContainText("2.488,00");
  await expect(summary.locator(".purchase-plan")).toContainText("17 parcelas de R$ 138,22");
  await expect(summary.locator(".purchase-plan")).toContainText("R$ 138,26");
  const details = page.getByRole("region", { name: "Detalhes da licença de Abington" });
  await expect(details.getByText("Criação de websites.", { exact: true })).toBeVisible();
  const english = details.locator("summary").filter({ hasText: "Inglês: do zero ao avançado" });
  await english.focus();
  await page.keyboard.press("Enter");
  await expect(details.getByText(/Sem inglês: comece atendendo brasileiros/)).toBeVisible();
  await expect(overview).toContainText("Trabalhe da sua casa no Brasil ou de qualquer lugar do mundo");
  await expect(overview).toContainText("materiais personalizados durante todo o ano");
  await expect(details).toContainText("Vendemos diversos serviços online");
  const materials = details.locator("details").filter({ has: page.getByRole("heading", { name: "Materiais e treinamento", exact: true }) });
  await materials.locator("summary").click();
  await expect(materials).toContainText("100 vídeos");
  await expect(materials).not.toContainText("Home Pros School");
  const school = details.locator("details").last();
  await expect(school.locator("summary")).toHaveText("Escola de inglês Home Pros School+");
  await school.locator("summary").click();
  await expect(school.getByText(/Início das aulas do curso avançado: 1º trimestre de 2027/)).toBeVisible();
  await details.locator("summary").filter({ hasText: "Remuneração do licenciado" }).click();
  await expect(details.getByText(/comissão de 54%/)).toBeVisible();
  await expect(details.getByText(/comissão prevista é de 3%/)).toBeVisible();
  await page.screenshot({ path: "/tmp/homepros-city-details.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/cities/abington");
  const offlineOverview = page.locator(".city-overview");
  const offlineSummary = page.locator(".city-purchase-summary");
  const offlineAlbum = page.getByRole("region", { name: "Álbum de Abington", exact: true });
  await expect(offlineOverview).toBeVisible();
  await expect(offlineSummary).toBeVisible();
  await expect(offlineAlbum).toBeVisible();
  const first = await offlineOverview.boundingBox();
  const second = await offlineSummary.boundingBox();
  const third = await offlineAlbum.boundingBox();
  expect(first!.y + first!.height).toBeLessThan(second!.y);
  expect(second!.y + second!.height).toBeLessThan(third!.y);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/homepros-city-mobile.png", fullPage: true });
  await page.goto("/cities/boston");
  await expect(page.locator(".city-overview")).not.toContainText("Trabalhe da sua casa no Brasil");
  await expect(page.locator(".city-overview")).not.toContainText("materiais personalizados durante todo o ano");
  await expect(page.getByRole("heading", { name: "Escola de inglês Home Pros School", exact: true })).toHaveCount(0);
  await expect(page.locator(".city-license-details")).not.toContainText("100 vídeos");
});

test("Courses present two offers, city editing rights and an independent inventory", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: /^Cursos/ });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.locator(".mega-panel").getByRole("link", { name: "Curso de edição de vídeos", exact: true }).click();
  await expect(page).toHaveURL(/\/courses\/video-editing$/);
  await expect(page.locator(".course-options article")).toHaveCount(2);
  await expect(page.locator(".course-options article").first()).toContainText("297,00");
  await expect(page.locator(".course-options article").last()).toContainText("997,00");
  await page.getByLabel("Buscar cidade para edição").fill("Abington");
  await expect(page.locator(".editor-city-card")).toHaveCount(1);
  await page.locator(".editor-city-card").click();
  await expect(page.getByRole("heading", { name: "Edição em Abington.", exact: true })).toBeVisible();
  await expect(page.locator(".editor-offer-summary")).toContainText("297,00");
  await expect(page.locator(".editor-offer-summary")).toContainText("12 meses");
  await expect(page.locator(".editor-offer-summary")).toContainText("freelancer para responsáveis por outras cidades");
  await expect(page.getByRole("button", { name: "Inscrição ainda não habilitada" })).toBeDisabled();
  await expect(page.locator(".cart-count")).toHaveText("0");
  await page.screenshot({ path: "/tmp/homepros-editor-abington.png", fullPage: true });
  await page.goto("/courses/video-editing/complete");
  await expect(page.locator(".complete-course-price")).toContainText("997,00");
  await expect(page.locator(".editor-offer-summary")).toContainText("sem vínculo com a Home Pros e sem exclusividade de cidade");
  await page.goto("http://127.0.0.1:3101/courses/video-editing/abington");
  await expect(page.locator(".editor-offer-summary")).toContainText("297,00");
  const { Pool } = await import("pg");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const result = await pool.query('SELECT COUNT(*) AS count FROM "EditorCityOffer" WHERE "courseCode" = $1 AND "priceCents" = $2 AND "exclusivityMonths" = $3 AND status = $4', ["video-editing", 29700, 12, "DRAFT"]);
    expect(Number(result.rows[0].count)).toBe(351);
    const cities = await pool.query('SELECT COUNT(*) AS count FROM "CityLicense"');
    expect(Number(cities.rows[0].count)).toBe(351);
  } finally { await pool.end(); }
  await page.route("**/*", (route) => route.request().url() === "http://127.0.0.1:3102/homepros-preview.html" ? route.continue() : route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/courses/video-editing");
  await expect(page.locator(".course-options article").first()).toContainText("297,00");
  await expect.poll(() => page.locator(".course-image img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.getByLabel("Buscar cidade para edição").fill("Cambridge");
  await page.locator(".editor-city-card").click();
  await expect(page.getByRole("heading", { name: "Edição em Cambridge.", exact: true })).toBeVisible();
  await expect(page.locator(".editor-offer-summary")).toContainText("297,00");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/courses/video-editing/complete");
  await expect(page.locator(".complete-course-price")).toContainText("997,00");
  await page.screenshot({ path: "/tmp/homepros-course-complete-mobile.png", fullPage: true });
});

test("Wide navigation supports hover, keyboard, closing and functional destinations", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const licenses = page.getByRole("button", { name: /^Licenças/ });
  await licenses.hover();
  await expect(licenses).toHaveAttribute("aria-expanded", "true");
  const panel = page.locator(".mega-panel");
  await panel.getByRole("link", { name: "Massachusetts", exact: true }).hover();
  await expect(panel).toBeVisible();
  const panelBox = await panel.boundingBox();
  expect(panelBox!.width).toBe(1440);
  await page.screenshot({ path: "/tmp/homepros-wide-menu.png" });
  await page.keyboard.press("Escape");
  await expect(licenses).toBeFocused();
  await expect(panel).toHaveCount(0);
  await licenses.press("ArrowDown");
  await expect(panel.getByRole("link", { name: "Agência Americana de Marketing", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/licenses$/);
  await expect(page.locator(".license-overview-grid article")).toContainText("Outros estados");
  await page.getByRole("link", { name: "Loja", exact: true }).click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.locator(".information-grid")).toContainText("297,00");
  await expect(page.locator(".information-grid")).toContainText("997,00");
  await expect(page.locator(".information-page")).toContainText("pagamentos estão em preparação");
  await page.getByRole("link", { name: "Contato", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator(".information-grid a")).toHaveCount(3);
  await expect(page.locator(".information-grid a").first()).toHaveAttribute("href", "https://www.instagram.com/homeprosconstructors/");
  await expect(page.locator(".contact-preparation")).toContainText("dados oficiais forem fornecidos");
  const favicon = await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  const bytes = await favicon.body();
  expect(Array.from(bytes.subarray(0, 6))).toEqual([0, 0, 1, 0, 3, 0]);
  expect([bytes[6], bytes[22], bytes[38]]).toEqual([16, 32, 48]);
  const apple = await request.get("/icons/icon-180.png");
  expect(apple.status()).toBe(200);
  const appleBytes = await apple.body();
  expect(appleBytes.readUInt32BE(16)).toBe(180);
  expect(appleBytes.readUInt32BE(20)).toBe(180);
  await expect(page.locator('head link[rel="apple-touch-icon"]').first()).toHaveAttribute("sizes", "180x180");
});

test("Homepage uses supplied photographs and offline mobile navigation reaches every destination", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.route("**/*", (route) => route.request().url() === "http://127.0.0.1:3102/homepros-preview.html" ? route.continue() : route.abort());
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/");
  await expect(page.locator(".home-category-nav a").first()).toContainText("Agência Americana de Marketing");
  await expect(page.locator(".showcase-card").first()).toContainText("Trabalhe de casa ou de qualquer lugar.");
  await expect(page.locator(".showcase-card").first()).toContainText("Ganhe em dólares.");
  await expect(page.locator(".showcase-card").last()).toContainText("Edite histórias.");
  await expect(page.locator(".showcase-card").last()).toContainText("Desenvolva sua atuação.");
  const images = page.locator(".showcase-photo");
  await expect(images).toHaveCount(5);
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute("src", /^blob:/);
    await expect.poll(() => img.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  const mobilePhotos = page.locator(".agency-work-frame");
  const mobileFirst = await mobilePhotos.nth(0).boundingBox();
  const mobileSecond = await mobilePhotos.nth(1).boundingBox();
  expect(mobileFirst!.y + mobileFirst!.height).toBeLessThan(mobileSecond!.y);
  await expect(page.locator(".agency-work-gallery figcaption")).toHaveText("Em casa ou em um coworking.");
  await expect.poll(() => page.locator(".agency-dollar-scene img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('head link[rel="icon"]')).toHaveAttribute("href", /^data:image\/png/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "/tmp/homepros-new-home-mobile.png", fullPage: true });
  const courses = page.getByRole("button", { name: /^Cursos/ });
  await courses.tap();
  await expect(courses).toHaveAttribute("aria-expanded", "true");
  await courses.tap();
  await expect(courses).toHaveAttribute("aria-expanded", "false");
  await courses.tap();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/homepros-wide-menu-mobile.png" });
  await page.getByRole("button", { name: "Fechar submenu", exact: true }).tap();
  await expect(courses).toHaveAttribute("aria-expanded", "false");
  for (const [name, destination] of [["Loja", "shop"], ["Contato", "contact"], ["Home", ""]]) {
    await page.getByRole("link", { name, exact: true }).tap();
    await expect(page).toHaveURL(new RegExp(`#/${destination}$`));
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.getByRole("button", { name: /^Licenças/ }).tap();
  await page.locator(".mega-panel").getByRole("link", { name: "Agência Americana de Marketing", exact: true }).tap();
  await expect(page.getByRole("heading", { name: "Agência Americana de Marketing.", exact: true })).toBeVisible();
  await expect(page.locator(".license-overview-grid")).toContainText("351 cidades");
  await context.close();
});

test("English school presents the proposed price without inventing billing or enabling registration", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Cursos/ }).click();
  await page.locator(".mega-panel").getByRole("link", { name: "Home Pros School", exact: true }).click();
  await expect(page).toHaveURL(/\/courses\/english$/);
  const summary = page.getByRole("complementary", { name: "Proposta da Home Pros School" });
  await expect(summary).toContainText("99,00");
  await expect(summary).toContainText("Periodicidade e condições de acesso em definição");
  await expect(page.getByRole("button", { name: "Inscrição ainda não habilitada" })).toBeDisabled();
  await expect(page.locator(".english-school-details")).toContainText("5 minutos");
  await expect(page.locator(".english-school-details")).toContainText("Este recurso ainda não está disponível");
  await expect(page.locator(".english-school-details")).toContainText("1º trimestre de 2027");
  await expect(page.locator(".cart-count")).toHaveText("0");
  await page.goto("/shop");
  await expect(page.locator(".shop-offer-grid article")).toHaveCount(4);
  await page.getByRole("link", { name: /^Conhecer a escola/ }).click();
  await expect(page.getByRole("heading", { name: "Home Pros School.", exact: true })).toBeVisible();
  await page.route("**/*", (route) => route.request().url() === "http://127.0.0.1:3102/homepros-preview.html" ? route.continue() : route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:3102/homepros-preview.html#/courses/english");
  await expect(page.locator(".english-school-summary")).toContainText("99,00");
  await expect(page.getByRole("button", { name: "Inscrição ainda não habilitada" })).toBeDisabled();
  const picture = page.locator(".english-school-photo");
  await picture.scrollIntoViewIfNeeded();
  await expect.poll(() => picture.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "/tmp/homepros-school-mobile.png", fullPage: true });
});
