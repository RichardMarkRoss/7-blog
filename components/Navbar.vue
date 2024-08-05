<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Blog Platform</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text v-if="!isLoggedIn" to="/login">Login</v-btn>
    <v-btn text v-if="!isLoggedIn" to="/register">Register</v-btn>
    <v-btn text v-if="isLoggedIn" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(!!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')
}
</script>
