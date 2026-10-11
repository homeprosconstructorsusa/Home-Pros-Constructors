import Image from "next/image";

const scenes = {
  home: "/photos/backgrounds/home-liberty.png",
  market: "/photos/backgrounds/boston.png",
  abington: "/photos/backgrounds/home.png",
  boston: "/photos/backgrounds/boston.png",
  cart: "/photos/backgrounds/cart.png",
  catalog: "/photos/backgrounds/cart.png",
};

export function PageBackdrop({ scene }: { scene: keyof typeof scenes }) {
  return (
    <div className={`page-backdrop page-backdrop-${scene}`} aria-hidden="true">
      <Image src={scenes[scene]} alt="" width={1672} height={941} sizes="100vw" loading="eager" className="scene-image" />
      <div className="scene-gradient" />
    </div>
  );
}
