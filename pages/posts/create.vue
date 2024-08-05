<template>
    <v-container>
      <v-card>
        <v-card-title>Create Post</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="content"
              label="Content"
              required
            ></v-textarea>
            <v-btn type="submit" color="primary">Create</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useNuxtApp } from '#app'
  
  const { $api } = useNuxtApp()
  const router = useRouter()
  
  const title = ref('')
  const content = ref('')
  
  const submit = async () => {
    try {
      await $api.post('/posts', { title: title.value, content: content.value })
      router.push('/')
    } catch (error) {
      console.error('Failed to create post', error)
    }
  }
  </script>
  