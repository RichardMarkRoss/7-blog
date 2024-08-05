import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],

  build: {
    transpile: ['vuetify'],
  },

  plugins: [
    '~/plugins/vuetify.ts'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:8000/api',
    }
  },

  compatibilityDate: '2024-08-05',
})