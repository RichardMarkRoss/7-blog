import axios from 'axios'
import { useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
  })

  return {
    provide: {
      api
    }
  }
})
