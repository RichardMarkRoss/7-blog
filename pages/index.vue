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
import { ref } from 'vue'
import { useFetch } from '#app'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const posts = ref([])

const { data } = await useFetch(`${config.public.apiBaseUrl}/posts`)
posts.value = data.value
</script>
