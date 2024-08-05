<template>
    <v-container>
      <v-card>
        <v-card-title>Edit Post</v-card-title>
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
            <v-btn type="submit" color="primary">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter, useNuxtApp } from '#app'
  
  const { $api } = useNuxtApp()
  const router = useRouter()
  const route = useRoute()
  
  const title = ref('')
  const content = ref('')
  const isLoading = ref(true)
  
  onMounted(async () => {
    try {
      const { data } = await $api.get(`/posts/${route.params.id}`)
      title.value = data.title
      content.value = data.content
      isLoading.value = false
    } catch (error) {
      console.error('Failed to load post data', error)
    }
  })
  
  const submit = async () => {
    try {
      await $api.put(`/posts/${route.params.id}`, { title: title.value, content: content.value })
      router.push('/')
    } catch (error) {
      console.error('Failed to update post', error)
    }
  }
  </script>
  