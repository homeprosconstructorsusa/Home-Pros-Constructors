"use client";
import Link from "next/link";
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
export function StateSelector() {
  return (
    <div className="mt-8 max-w-lg">
      <label
        htmlFor="state-choice"
        className="mb-2 block text-sm font-semibold"
      >
        Selecione um estado americano
      </label>
      <div className="flex flex-wrap gap-3">
        <select
          id="state-choice"
          className="state-select flex-1"
          defaultValue="Massachusetts"
        >
          {states.map((state) => (
            <option key={state} disabled={state !== "Massachusetts"}>
              {state}
              {state !== "Massachusetts" ? " — em breve" : ""}
            </option>
          ))}
        </select>
        <Link className="btn" href="/states/massachusetts">
          Explorar cidades →
        </Link>
      </div>
      <p className="mt-3 text-xs text-stone-500">
        Massachusetts é o primeiro mercado. Outros estados ainda não estão
        disponíveis.
      </p>
    </div>
  );
}
