<script setup lang="ts">
const news = useNewsStore()
await callOnce(news.fetch)
const authors = ref([
  {
    name: 'formula1.com',
    to: 'https://formula1.com/',
    target: '_blank'
  }
])

</script>

<template>
  <UPageHeader title="Latest News" description="Stay updated with the latest news articles." />
  <UBlogPosts>
        <UBlogPost
          v-for="article in news.newsArray"
          :key="article.id"
          :title="article.title"
          :image="article.thumbnail.image.url"
          :date="new Date(article.updatedAt)"
          :badge="article.articleType"
          :to="`https://formula1.com/en/latest/article/${article.slug}.${article.id}`"
          target="_blank"
          :authors="authors"
          rel="noopener noreferrer"
          variant="soft"
        />
  </UBlogPosts>
</template>

<style scoped>

</style>