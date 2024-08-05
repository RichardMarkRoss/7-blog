<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" v-for="post in posts" :key="post.id">
        <v-card>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.content.substring(0, 200) }}...</v-card-text>
          <v-card-actions>
            <v-btn :to="`/posts/${post.id}`" color="primary">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const posts = ref([])

const fetchPosts = async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}/posts`)
    if (response.ok) {
      posts.value = await response.json()
    } else {
      console.error('Failed to fetch posts')
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

onMounted(fetchPosts)
</script>
