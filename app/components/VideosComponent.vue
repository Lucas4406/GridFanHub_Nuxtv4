<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { data } = await useFetch(`${runtimeConfig.public.cloudflareProxyBase}/v1/video-assets/videos`)
const authors = ref([
  {
    name: 'formula1.com',
    to: 'https://formula1.com/',
    target: '_blank'
  }
])

</script>

<template>
  <UPageHeader title="Latest Videos" description="Stay updated with the latest videos." />
  <UBlogPosts>
    <UBlogPost
        v-for="article in data.videos.slice(0, 9)"
        :key="article.id"
        :title="article.caption"
        :description="article.description"
        :image="article.thumbnail.url"
        :date="new Date(article.publishedAt)"
        :badge="article.videoDuration"
        :to="`https://formula1.com${article.url}`"
        target="_blank"
        :authors="authors"
        rel="noopener noreferrer"
        variant="soft"
    />
  </UBlogPosts>
</template>

<style scoped>

</style>