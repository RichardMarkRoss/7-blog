<template>
    <v-container>
      <v-card>
        <v-card-title>Profile</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateProfile">
            <v-text-field v-model="user.name" label="Name" required></v-text-field>
            <v-text-field v-model="user.email" label="Email" disabled></v-text-field>
            <v-text-field v-model="password" label="New Password" type="password"></v-text-field>
            <v-btn type="submit" color="primary">Update Profile</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useRuntimeConfig } from '#app'
  
  const config = useRuntimeConfig()
  const router = useRouter()
  const user = ref({ name: '', email: '' })
  const password = ref('')
  
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.ok) {
        user.value = await response.json()
      } else {
        console.error('Failed to fetch profile')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
  
  const updateProfile = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.value.name,
          password: password.value,
        }),
      })
      if (response.ok) {
        console.log('Profile updated successfully')
      } else {
        const errorData = await response.json()
        console.error('Failed to update profile:', errorData.message)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }
  
  onMounted(fetchUserProfile)
  </script>
  