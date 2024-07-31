<template>
    <v-container>
      <v-row>
        <v-col
          v-for="post in posts"
          :key="post.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text>{{ post.summary }}</v-card-text>
            <v-card-actions>
              <v-btn :to="`/posts/${post.id}`" color="primary">Read More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const posts = [
    { id: 1, title: 'Post One', summary: 'Summary of post one...' },
    { id: 2, title: 'Post Two', summary: 'Summary of post two...' },
  ];
  </script>
  