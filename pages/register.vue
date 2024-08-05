<!-- pages/register.vue -->
<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field label="Name" v-model="name" required></v-text-field>
      <v-text-field label="Email" v-model="email" required></v-text-field>
      <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
      <v-btn @click="register">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const valid = ref(false)
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const register = async () => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
    })

    if (response.ok) {
      router.push('/login')
    } else {
      const error = await response.json()
      alert('Registration failed: ' + (error.message || 'Unknown error'))
    }
  } catch (error) {
    alert('Registration failed: ' + error.message)
  }
}
</script>
