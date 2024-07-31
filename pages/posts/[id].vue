<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>{{ post.date }}</v-card-subtitle>
          <v-card-text>{{ post.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const postId = route.params.id;
const post = {
  id: postId,
  title: `Post ${postId}`,
  date: '2024-07-31',
  content: 'This is the content of the post...',
};
</script>
