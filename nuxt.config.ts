import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],

  build: {
    transpile: ['vuetify'],
  },

  plugins: [
    '~/plugins/vuetify.ts'
  ],

  compatibilityDate: '2024-07-31',
})