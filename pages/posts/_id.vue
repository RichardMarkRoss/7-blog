<template>
  <v-container>
    <v-card>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>{{ post.content }}</v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title>Comments</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="comment in comments" :key="comment.id">
            <v-list-item-content>
              <v-list-item-title>{{ comment.user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title>Add a Comment</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitComment">
          <v-textarea
            v-model="newComment"
            label="Your comment"
            outlined
            required
          ></v-textarea>
          <v-btn type="submit" color="primary" class="mt-2">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, useFetch } from '#app'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const route = useRoute()
const config = useRuntimeConfig()

const post = ref(null)
const comments = ref([])
const newComment = ref('')

onMounted(async () => {
  try {
    const { data: postData } = await useFetch(`${config.public.apiBaseUrl}/posts/${route.params.id}`)
    post.value = postData.value

    const { data: commentsData } = await useFetch(`${config.public.apiBaseUrl}/posts/${route.params.id}/comments`)
    comments.value = commentsData.value
  } catch (error) {
    console.error('Failed to load data', error)
  }
})

const submitComment = async () => {
  if (!newComment.value.trim()) return

  try {
    const { data } = await $api.post(`/posts/${route.params.id}/comments`, { content: newComment.value })
    comments.value.push(data)
    newComment.value = ''
  } catch (error) {
    console.error('Failed to submit comment', error)
  }
}
</script>
