import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sanity({
      projectId: "toj47gf1",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/admin",
    })
  ],
  adapter: vercel({
    maxDuration: 30,
    webAnalytics: {
      enabled: true
    }
  }),
  build: {
    assets: 'assets'
  }
});