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
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
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
  import { useRouter, useNuxtApp } from '#app'
  
  const { $api } = useNuxtApp()
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  
  const login = async () => {
    try {
      const response = await $api.post('/login', {
        email: email.value,
        password: password.value,
      })
      localStorage.setItem('token', response.data.token)
      router.push('/')
    } catch (error) {
      console.error('Login failed', error)
    }
  }
  </script>
  