<template>
    <v-container>
      <v-row v-for="comment in comments" :key="comment.id" class="mb-2">
        <v-col>
          <v-card>
            <v-card-text>
              {{ comment.content }}
              <v-btn v-if="isAuthor(comment)" @click="editComment(comment)">Edit</v-btn>
              <v-btn v-if="isAuthor(comment)" @click="deleteComment(comment.id)">Delete</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row v-if="token" class="mt-4">
        <v-col>
          <v-form @submit.prevent="addComment">
            <v-text-field
              v-model="newComment"
              label="Add a comment"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const comments = ref([])
const newComment = ref('')
const token = localStorage.getItem('token')
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const addComment = async () => {
  if (!newComment.value.trim()) return

  try {
    const response = await fetch(`${config.public.apiBaseUrl}/posts/${props.postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({ content: newComment.value }),
    })

    if (response.ok) {
      const data = await response.json()
      comments.value.push(data)
      newComment.value = ''
    } else {
      const error = await response.json()
      alert('Failed to add comment: ' + (error.message || 'Unknown error'))
    }
  } catch (error) {
    alert('Failed to add comment: ' + error.message)
  }
}
</script>
