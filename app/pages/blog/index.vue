<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('content').all()
})

useHead({
  title: "GridFanHub - Blog",
  meta: [
    { name: 'description', content: 'Discover short, engaging Formula 1 articles and exactly 100-word race reviews for every Grand Prix. Quick insights, sharp analysis, and the fastest way to stay updated with each F1 weekend.' },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://beta.gridfanhub.com/blog'
    }
  ]
})
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader title="GridFanHub Blog" description="Latest articles" />
      <UBlogPosts class="mt-4 lg:grid-cols-2">
        <UBlogPost
          v-for="post in posts"
          :key="post.title"
          :to="`/blog/${post.slug}`"
          v-bind="post"
          :description="post.description"
          :date="post.date"
          :image="post.image"
          orientation="horizontal"
          variant="subtle"
          class="p-4"
        >
          <template #authors>
            <UUser
                orientation="horizontal"
                :name="post.author"
                description="Admin"
                size="sm"
                :avatar="{
                  src: '/favicon.png'
                }"
            />
          </template>
        </UBlogPost>
      </UBlogPosts>
    </UContainer>
  </UPage>
</template>

<style scoped>

</style>