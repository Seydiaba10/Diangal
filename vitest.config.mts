import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Les tests lisent aussi les modules « server-only » (corrigés de démonstration).
      "server-only": fileURLToPath(new URL("./scripts/empty-module.js", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts", "tests/db/**/*.test.ts"],
    // Les tests de base démarrent un Postgres (PGlite) et appliquent toutes les migrations.
    testTimeout: 60_000,
    hookTimeout: 120_000,
  },
});
