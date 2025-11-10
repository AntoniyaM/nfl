// https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxt/ui', '@pinia/nuxt', '@pinia/colada-nuxt'],
  css: ['~/assets/css/main.css'],
  devtools: {
    enabled: true,
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      apiUrl: 'https://nfl-api-kappa.vercel.app/api',
    },
  },
  app: {
    head: {
      title: 'NFL Stats 🏆',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'NFL Stats app for data about teams, players and the current season.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ],
    },
  },
})
