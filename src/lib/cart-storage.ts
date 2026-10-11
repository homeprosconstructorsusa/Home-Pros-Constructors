export const CART_KEY = "homepros-cart-v2";
export function parseCart(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed.filter(
          (s): s is string =>
            typeof s === "string" && /^[a-z]+(?:-[a-z]+)*$/.test(s),
        ),
      ),
    ].slice(0, 351);
  } catch {
    return [];
  }
}
