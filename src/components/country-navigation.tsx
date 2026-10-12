"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Country = "brazil" | "united-states" | "canada";
const countries: { id: Country; label: string; href: string }[] = [
  { id: "brazil", label: "Brasil", href: "/countries/brazil" },
  { id: "united-states", label: "Estados Unidos", href: "/licenses" },
  { id: "canada", label: "Canadá", href: "/countries/canada" },
];

function Flag({ country }: { country: Country }) {
  return <svg viewBox="0 0 60 40" className="country-flag" aria-hidden="true" focusable="false">
    {country === "brazil" ? <>
      <path fill="#169b62" d="M0 0h60v40H0z" />
      <path fill="#ffdf00" d="m30 4 25 16-25 16L5 20z" />
      <circle cx="30" cy="20" r="10" fill="#002776" />
      <path d="M20 17q11-1 19 8" stroke="white" strokeWidth="2" fill="none" />
      <g fill="white"><circle cx="26" cy="23" r=".7" /><circle cx="32" cy="27" r=".7" /><circle cx="34" cy="18" r=".7" /><circle cx="28" cy="15" r=".7" /></g>
    </> : country === "united-states" ? <>
      <path fill="white" d="M0 0h60v40H0z" />
      {Array.from({ length: 7 }, (_, index) => <rect key={index} y={index * 80 / 13} width="60" height={40 / 13} fill="#b22234" />)}
      <path fill="#3c3b6e" d="M0 0h26v21.54H0z" />
      <g fill="white">{Array.from({ length: 9 }, (_, row) => Array.from({ length: row % 2 ? 5 : 6 }, (_, column) => <path key={`${row}-${column}`} transform={`translate(${(row % 2 ? 4.3 : 2.15) + column * 4.3} ${2 + row * 2.2})`} d="m0-.85.25.55.6.06-.45.4.13.6L0 .46l-.53.3.13-.6-.45-.4.6-.06z" />))}</g>
    </> : <>
      <path fill="white" d="M0 0h60v40H0z" />
      <path fill="#d80621" d="M0 0h15v40H0zM45 0h15v40H45z" />
      <path fill="#d80621" d="m30 7 2.5 5 2-1-1 8 4.5-4 1 3.5 4-1-2 6 2 1-9 6 .8 3-4.2-.6V37h-1.2v-4.1l-4.2.6.8-3-9-6 2-1-2-6 4 1 1-3.5 4.5 4-1-8 2 1z" />
    </>}
  </svg>;
}

export function CountryNavigation() {
  const pathname = usePathname();
  const selected: Country = pathname?.startsWith("/countries/brazil") ? "brazil" : pathname?.startsWith("/countries/canada") ? "canada" : "united-states";
  return <nav className="country-strip" aria-label="Países Home Pros">
    <div className="shell country-strip-inner">
      {countries.map((country) => <Link href={country.href} key={country.id} className={`country-choice${selected === country.id ? " country-choice-selected" : ""}`} aria-current={selected === country.id ? "true" : undefined}>
        <Flag country={country.id} /><span>{country.label}</span>
      </Link>)}
    </div>
  </nav>;
}
