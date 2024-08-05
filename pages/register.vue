<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-text-field v-model="password_confirmation" label="Confirm Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const register = async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      const errorData = await response.json()
      console.error('Registration failed:', errorData.message)
    }
  } catch (error) {
    console.error('Error registering:', error)
  }
}
</script>
