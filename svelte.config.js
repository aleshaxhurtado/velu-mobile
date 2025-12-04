import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $atoms: 'src/lib/components/atoms',
      $molecules: 'src/lib/components/molecules',
      $organisms: 'src/lib/components/organisms',
      $templates: 'src/lib/components/templates',
      $tokens: 'src/lib/tokens',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
      $services: 'src/lib/services',
    },
  },
};

export default config;
