<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card v-if="post">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
        </v-card>
        <v-alert v-else type="info" dismissible>
          Loading post or post not found...
        </v-alert>
      </v-col>
    </v-row>
    <Comments v-if="post && post.id" :post-id="post.id" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#app'
import { useRuntimeConfig } from '#app'
import Comments from '~/components/Comments.vue'

const route = useRoute()
const config = useRuntimeConfig()
const post = ref(null)

const fetchPost = async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}/posts/${route.params.id}`)
    if (!response.ok) {
      console.error('Error fetching post:', await response.text())
      return
    }
    const data = await response.json()
    console.log('Fetched post data:', data) // Debugging line
    if (data && data.id) {
      post.value = data
    } else {
      console.error('No post data received or invalid data structure')
    }
  } catch (error) {
    console.error('Error fetching post:', error)
  }
}

onMounted(fetchPost)
</script>
