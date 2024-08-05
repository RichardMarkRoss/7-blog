import axios from 'axios'
import { useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
  })

  api.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  })

  return {
    provide: {
      api
    }
  }
})
