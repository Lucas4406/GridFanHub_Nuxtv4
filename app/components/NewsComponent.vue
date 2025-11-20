<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { data } = await useFetch(`${runtimeConfig.public.cloudflareProxyBase}/v1/editorial/articles?limit=9`)

</script>

<template>
  <UPageHeader title="Latest News" description="Stay updated with the latest news articles." />
  <UBlogPosts>
        <UBlogPost
          v-for="article in data.items"
          :key="article.id"
          :title="article.title"
          :image="article.thumbnail.image.url"
          :date="new Date(article.updatedAt)"
          :badge="article.articleType"
          :to="`https://formula1.com/en/latest/article/${article.slug}.${article.id}`"
          target="_blank"
          rel="noopener noreferrer"
          variant="soft"
        />
  </UBlogPosts>
</template>

<style scoped>

</style>