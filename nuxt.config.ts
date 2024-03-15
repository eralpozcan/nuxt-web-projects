// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: false,
    },
  },
  ssr: false, // default: true
  routeRules: {
    '/*/components/*': { redirect: '/' },
    '/*/assets/*': { redirect: '/' },
  },
  modules: ['@vueuse/nuxt', "@nuxt/fonts", "@nuxt/image"],
})