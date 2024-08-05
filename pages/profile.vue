<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Profile</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="updateProfile">
                <v-text-field
                  v-model="user.name"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  type="email"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary">Update Profile</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useFetch, useRouter } from '#app'
  import { useRuntimeConfig } from '#app'
  import { useState } from '#app'
  
  const config = useRuntimeConfig()
  const router = useRouter()
  const token = useState('token', () => null)
  const user = ref({ name: '', email: '' })
  
  const fetchUserProfile = async () => {
    try {
      const { data } = await useFetch(`${config.public.apiBaseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = data.value
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
  
  const updateProfile = async () => {
    try {
      await fetch(`${config.public.apiBaseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(user.value),
      })
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }
  
  onMounted(fetchUserProfile)
  </script>
  