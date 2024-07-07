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
        { name: 'application-name', content: '20+ Web Projects with Nuxt3' },
        { name: 'description', content: `Based on Brad Traversy's vanilla web projects repo. This has been adapted to Vue3 and Nuxt3. Some constructs are different because of the adaptation process.` },
        { name: 'robots', content: 'index,follow'},
        { name: 'googlebot', content: 'index,follow'},
        { name: 'rating', content: 'General Education'},
        { name: 'og:url', content: 'https://nuxt-web-projects.vercel.app'},
        { name: 'og:type', content: 'website'},
        { name: 'og:title', content: '20+ Web Projects with Nuxt'},
        { name: 'og:image', content: 'https://nuxt-web-projects.vercel.app/assets/docsbrand.png'},
        { name: 'og:site_name', content: '20+ Web Projects with Nuxt3'},
        { name: 'og:locale', content:'en_US'},
        { name: 'twitter:card', content: 'https://nuxt-web-projects.vercel.app/assets/docsbrand.png'},
        { name: 'twitter:title', content: '20+ Web Projects with Nuxt3'},
        { name: 'twitter:description', content:`Based on Brad Traversy's vanilla web projects repo. This has been adapted to Vue3 and Nuxt3. Some constructs are different because of the adaptation process.`},
        { name: 'twitter:image', content:'https://nuxt-web-projects.vercel.app/assets/docsbrand.png'}
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ],
    }
  },
  ssr: false,
  telemetry: true,
  routeRules: {
    '/*/components/*': { redirect: '/' },
    '/*/assets/*': { redirect: '/' },
  },
  modules: [
    '@vueuse/nuxt',
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/html-validator"
  ],
  compatibilityDate: '2024-07-07',
})