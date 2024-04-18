// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  app: {
    head: { 
      title: '20+ Web Projects with Nuxt',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ],
    }
  },
  ssr: false, // default: true
  routeRules: {
    '/*/components/*': { redirect: '/' },
    '/*/assets/*': { redirect: '/' },
  },
  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 10000,
    }
  },
  modules: ['@vueuse/nuxt', "@nuxt/fonts", "@nuxt/image", "nuxt-security"],
})