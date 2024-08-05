<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Blog Platform</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/login" v-if="!isLoggedIn">Login</v-btn>
      <v-btn text to="/register" v-if="!isLoggedIn">Register</v-btn>
      <v-btn text @click="logout" v-if="isLoggedIn">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token')
}

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')
}

onMounted(checkLoginStatus)
</script>
