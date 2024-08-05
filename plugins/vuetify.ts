import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
export default defineNuxtPlugin((nuxtApp) => {
  
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
        dark: {
          colors: {
            primary: '#1e88e5',
            secondary: '#424242',
            accent: '#ff4081',
            error: '#f44336',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})