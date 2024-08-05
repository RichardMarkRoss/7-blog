<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      const errorData = await response.json()
      console.error('Login failed:', errorData.message)
    }
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>
