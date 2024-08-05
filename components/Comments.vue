<template>
    <v-container>
      <v-card v-for="comment in comments" :key="comment.id" class="mb-2">
        <v-card-title>{{ comment.user.name }}</v-card-title>
        <v-card-text>{{ comment.content }}</v-card-text>
      </v-card>
      <v-form v-if="isLoggedIn" @submit.prevent="addComment">
        <v-text-field v-model="newComment" label="Add a comment" required></v-text-field>
        <v-btn type="submit" color="primary">Submit</v-btn>
      </v-form>
      <v-alert v-else type="info" dismissible>
        Please log in to add a comment.
      </v-alert>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRuntimeConfig } from '#app'
  
  const config = useRuntimeConfig()
  const comments = ref([])
  const newComment = ref('')
  const isLoggedIn = ref(!!localStorage.getItem('token'))
  const postId = ref(null)
  
  const fetchComments = async () => {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/posts/${postId.value}/comments`)
      if (response.ok) {
        comments.value = await response.json()
      } else {
        console.error('Failed to fetch comments')
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  
  const addComment = async () => {
    try {
      if (!isLoggedIn.value) {
        console.error('User is not authenticated')
        return
      }
  
      const token = localStorage.getItem('token')
      const response = await fetch(`${config.public.apiBaseUrl}/posts/${postId.value}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment.value }),
      })
  
      if (response.ok) {
        newComment.value = ''
        await fetchComments()
      } else {
        console.error('Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }
  
  onMounted(() => {
    postId.value = postId // Assuming postId is passed as a prop
    fetchComments()
  })
  </script>
  