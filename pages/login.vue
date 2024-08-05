<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    
    if (!response.ok) {
      const error = await response.json()
      alert('Login failed: ' + (error.message || 'Unknown error'))
      return
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    router.push('/')
  } catch (error) {
    console.error('Error logging in:', error)
    alert('Login failed: ' + error.message)
  }
}
</script>
