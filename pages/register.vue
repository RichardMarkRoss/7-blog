<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Register</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  v-model="name"
                  label="Name"
                  required
                ></v-text-field>
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
                <v-text-field
                  v-model="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary">Register</v-btn>
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
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')
  
  const register = async () => {
    if (password.value !== passwordConfirmation.value) {
      console.error('Passwords do not match')
      return
    }
  
    try {
      const response = await $api.post('/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      })
      localStorage.setItem('token', response.data.token)
      router.push('/')
    } catch (error) {
      console.error('Registration failed', error)
    }
  }
  </script>
  