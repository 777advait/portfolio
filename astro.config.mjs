// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import { loadEnv } from "vite"

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";


// https://astro.build/config
export default defineConfig({
  output: "server",
  prefetch: { prefetchAll: true },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: vercel()
});
