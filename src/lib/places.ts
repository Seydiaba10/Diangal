// Villes proposées dans l'annuaire des répétiteurs. Même liste que la table cities (seed).

export const CITIES: { name: string; slug: string; region: string }[] = [
  { name: "Dakar", slug: "dakar", region: "Dakar" },
  { name: "Pikine", slug: "pikine", region: "Dakar" },
  { name: "Guédiawaye", slug: "guediawaye", region: "Dakar" },
  { name: "Rufisque", slug: "rufisque", region: "Dakar" },
  { name: "Thiès", slug: "thies", region: "Thiès" },
  { name: "Mbour", slug: "mbour", region: "Thiès" },
  { name: "Saint-Louis", slug: "saint-louis", region: "Saint-Louis" },
  { name: "Ziguinchor", slug: "ziguinchor", region: "Ziguinchor" },
  { name: "Kaolack", slug: "kaolack", region: "Kaolack" },
  { name: "Touba", slug: "touba", region: "Diourbel" },
];

export const CITY_NAMES = CITIES.map((c) => c.name).sort((a, b) => a.localeCompare(b, "fr"));
