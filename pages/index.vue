<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" v-for="post in posts" :key="post?.id">
        <v-card v-if="post && post.id">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.content.substring(0, 200) }}...</v-card-text>
          <v-card-actions>
            <v-btn :to="`/posts/${post.id}`" color="primary">Read More</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert v-else type="warning" dismissible>
          Post data missing or corrupted
        </v-alert>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const posts = ref([])

const fetchPosts = async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}/posts`)
    if (!response.ok) {
      console.error('Error fetching posts:', await response.text())
      return
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      posts.value = data
    } else {
      console.error('Unexpected data structure:', data)
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

onMounted(fetchPosts)
</script>
