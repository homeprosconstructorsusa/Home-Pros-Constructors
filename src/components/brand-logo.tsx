import Image from "next/image";
// The owner supplied the original logo embedded in card 06, not as a separate file.
// A viewport shows the exact original pixels; the source artwork remains unchanged.
export function BrandLogo() {
  return (
    <span className="brand-logo">
      <Image
        src="/photos/boston/card-06.png"
        alt="Home Pros Constructors"
        width={1122}
        height={1402}
        unoptimized
        className="brand-logo-source"
      />
    </span>
  );
}
