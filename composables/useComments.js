import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export function useComments(postId) {
  const config = useRuntimeConfig()
  const comments = ref([])

  const fetchComments = async () => {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/posts/${postId}/comments`)
      const data = await response.json()
      comments.value = data
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  return { comments, fetchComments }
}
