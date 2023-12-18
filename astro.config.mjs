import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno(),
  integrations: [tailwind(), solidJs()],
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    }
  }
});