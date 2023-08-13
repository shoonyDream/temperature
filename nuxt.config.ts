import { IntlifyModuleOptions } from '@intlify/nuxt3';
import eslintPlugin from 'vite-plugin-eslint';
import { defineNuxtConfig } from 'nuxt/config';

declare module '@nuxt/schema' {
  export interface NuxtConfig {
    intlify?: IntlifyModuleOptions;
  }
}
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [eslintPlugin()],
    build: {
      sourcemap: false,
      target: 'esnext',
    },
    css: {
      postcss: {
        plugins: [require('postcss-nested')],
      },
    },
  },
  ssr: false,
  app: {
    head: {
      meta: [{ name: 'charset', content: 'utf-8' }],
    },
  },
  css: ['@/assets/styles/reset.css', '@/assets/styles/common.css'],
  modules: ['@intlify/nuxt3'],
  intlify: {
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      legacy: false,
    },
  },
});
