<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('content').all()
})

const slugify = (str: string) =>
    str.trim().toLowerCase().split(/\s+/).join('-');
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader title="GridFanHub Blog" description="Latest articles" />
      <UBlogPosts class="mt-4">
        <UBlogPost
          v-for="post in posts"
          :key="post.title"
          :to="`/blog/${slugify(post.title)}`"
          v-bind="post"
          :description="post.description"
          :date="post.date"
          orientation="horizontal"
          variant="outline"
          class="p-4"
        >
        </UBlogPost>
      </UBlogPosts>
    </UContainer>
  </UPage>
</template>

<style scoped>

</style>