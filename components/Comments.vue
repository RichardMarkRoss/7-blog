<template>
    <v-container>
      <!-- Render comments and the form for adding a new comment -->
      <v-card v-for="comment in comments" :key="comment.id" class="mb-2">
        <v-card-title>{{ comment.user?.name || 'Anonymous' }}</v-card-title>
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
  import { ref, onMounted, watch } from 'vue'
  import { useRuntimeConfig } from '#app'
  import { useRoute } from 'vue-router'
  
  const config = useRuntimeConfig()
  const comments = ref([])
  const newComment = ref('')
  const isLoggedIn = ref(!!localStorage.getItem('token'))
  const postId = ref(null)
  
  const fetchComments = async () => {
    if (!postId.value) {
      console.error('Post ID is not set.')
      return
    }
  
    try {
      console.log('Fetching comments for post:', postId.value)
      const response = await fetch(`${config.public.apiBaseUrl}/posts/${postId.value}/comments`)
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched comments:', data)
        comments.value = data
      } else {
        console.error('Failed to fetch comments')
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  
  const addComment = async () => {
    if (!newComment.value.trim()) {
      console.error('Comment content cannot be empty')
      return
    }
  
    try {
      if (!isLoggedIn.value) {
        console.error('User is not authenticated')
        return
      }
  
      const token = localStorage.getItem('token')
      console.log('Submitting comment for post:', postId.value)
      const response = await fetch(`${config.public.apiBaseUrl}/posts/${postId.value}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment.value }),
      })
  
      if (response.ok) {
        console.log('Comment submitted successfully')
        newComment.value = ''
        await fetchComments()
      } else {
        const errorData = await response.json()
        console.error('Failed to add comment:', errorData.message)
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }
  
  // Set postId value from route parameter or parent component
  onMounted(() => {
    const route = useRoute()
    postId.value = route.params.id // Assuming postId is coming from route
    if (postId.value) {
      fetchComments()
    } else {
      console.error('Post ID is not available')
    }
  })
  </script>
  