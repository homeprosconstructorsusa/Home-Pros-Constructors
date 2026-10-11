import { test } from "node:test";
import assert from "node:assert/strict";
import municipalities from "../src/data/massachusetts.json";
import { demoCatalog } from "../src/lib/demo-catalog";
import { quoteCart } from "../src/lib/quote";
import { parseCart } from "../src/lib/cart-storage";
test("Massachusetts has exactly 351 unique municipalities across 14 counties", () => {
  assert.equal(municipalities.length, 351);
  assert.equal(new Set(municipalities.map((m) => m.slug)).size, 351);
  assert.equal(new Set(municipalities.map((m) => m.geoid)).size, 351);
  assert.equal(new Set(municipalities.map((m) => m.county)).size, 14);
  assert.equal(
    municipalities.find((m) => m.name === "Boston")?.county,
    "Suffolk",
  );
  assert.equal(
    municipalities.find((m) => m.name === "Cambridge")?.kind,
    "city",
  );
});
test("cart quote uses catalog prices and deduplicates identifiers", () => {
  const result = quoteCart(["cambridge", "cambridge", "salem"], demoCatalog);
  assert.equal(result.items.length, 2);
  assert.equal(result.depositTotalCents, 199400);
  assert.equal(result.valid, true);
});
test("unavailable or unknown cities cannot contribute a payable total", () => {
  const result = quoteCart(
    ["chelmsford", "worcester", "unknown", "cambridge"],
    demoCatalog,
  );
  assert.equal(result.depositTotalCents, 99700);
  assert.equal(result.valid, false);
  assert.equal(result.items.filter((item) => item.available).length, 1);
  assert.equal(quoteCart([], demoCatalog).valid, false);
});
test("a price or availability change is reflected in a fresh server quote", () => {
  const changed = demoCatalog.map((city) =>
    city.slug === "cambridge" ? { ...city, depositCents: 90000 } : city,
  );
  assert.equal(quoteCart(["cambridge"], changed).depositTotalCents, 90000);
  const unavailable = changed.map((city) =>
    city.slug === "cambridge" ? { ...city, status: "RESERVED" as const } : city,
  );
  assert.equal(quoteCart(["cambridge"], unavailable).valid, false);
});
test("corrupt browser storage does not crash or inject arbitrary objects", () => {
  assert.deepEqual(parseCart("not-json"), []);
  assert.deepEqual(
    parseCart(
      JSON.stringify([
        "cambridge",
        "cambridge",
        { slug: "salem" },
        null,
        "../../etc",
        "<script>",
      ]),
    ),
    ["cambridge"],
  );
});

test("deposit, remaining balance and final installment reconcile to the contract total", async () => {
  const { installments } = await import("../src/lib/license");
  const boston = demoCatalog.find((city) => city.slug === "boston")!;
  assert.equal(boston.depositCents, 99700);
  assert.equal(boston.totalPriceCents, 348500);
  const plan = installments(boston)!;
  assert.equal(plan.balanceCents, 248800);
  assert.equal(plan.regularCents, 13822);
  assert.equal(plan.finalCents, 13826);
  assert.equal(
    plan.regularCents * 17 + plan.finalCents + boston.depositCents!,
    boston.totalPriceCents,
  );
  const quote = quoteCart(["boston", "salem"], demoCatalog);
  assert.equal(quote.depositTotalCents, 199400);
  assert.equal(quote.contractTotalCents, 697000);
  assert.equal(quote.remainingBalanceCents, 497600);
});
