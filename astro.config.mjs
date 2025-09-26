// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import { loadEnv } from "vite"

import react from "@astrojs/react";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

const { ASTRO_ADAPTER } = loadEnv(
  process.env.MODE ?? "development",
  process.cwd(),
  "",
)

// https://astro.build/config
export default defineConfig({
  output: "server",
  prefetch: { prefetchAll: true },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: ASTRO_ADAPTER === "vercel" ? vercel() : node({ mode: "standalone" })
});
