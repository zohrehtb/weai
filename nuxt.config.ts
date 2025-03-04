// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  
  app: {
    head: {
      htmlAttrs: { dir: 'ltr', lang: 'en' },
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    },
  },

  css: [
    'vuetify/styles',
    '~/assets/scss/Styles.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  build: {
    transpile: ['vuetify'],
    
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
