import { getCatalog, isDemoMode } from "@/lib/catalog";
import { quoteCart } from "@/lib/quote";
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (
    !body ||
    typeof body !== "object" ||
    !("slugs" in body) ||
    !Array.isArray(body.slugs) ||
    body.slugs.length > 351 ||
    !body.slugs.every(
      (slug: unknown) =>
        typeof slug === "string" && /^[a-z]+(?:-[a-z]+)*$/.test(slug),
    )
  ) {
    return Response.json(
      { error: "Provide up to 351 valid city identifiers" },
      { status: 400 },
    );
  }
  try {
    return Response.json(
      {
        ...quoteCart(body.slugs, await getCatalog()),
        demo: isDemoMode(),
        checkoutEnabled: false,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Catalog unavailable. Please try again later." },
      { status: 503 },
    );
  }
}
