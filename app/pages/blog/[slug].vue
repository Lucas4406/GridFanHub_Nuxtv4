<script setup>
const slug = useRoute().params.slug

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('content').path(`/blog/${slug}`).first()
})


// 🔹 Dynamic SEO / Meta
useHead(() => {
  if (!post.value) return {}

  return {
    title: post.value.title,
    meta: [
      { name: 'description', content: post.value.description },
      { name: 'keywords', content: post.value.tags.join(', ') },
      { property: 'og:title', content: post.value.title },
      { property: 'og:description', content: post.value.description },
      { property: 'og:image', content: post.value.image },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.value.title },
      { name: 'twitter:description', content: post.value.description },
      { name: 'twitter:image', content: post.value.image }
    ],
    link: [
      { rel: 'canonical', href: `https://beta.gridfanhub.com/blog/${slug}` }
    ]
  }
})


</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <NuxtLink
            to="/blog"
            class="text-black dark:text-white hover:underline font-medium inline-block"
        >
          ← Back
        </NuxtLink>
        <UPageHeader :title="post.title" :headline="new Date(post.date).toLocaleDateString()" >
          <template #description>
            <div class="flex flex-row gap-2">
              <div v-for="(postTag, index) in post.tags.slice(0,2)" :key="index" class="flex flex-row items-center gap-2">
                <UBadge :label="postTag" color="primary" size="sm" />
              </div>
            </div>
          </template>
        </UPageHeader>
        <div class="w-full flex justify-center py-4" v-if="post.image?.includes('media.formula1.com')" >
          <NuxtImg :src="post.image" :alt="post.location" class="w-full" />
        </div>
        <UContainer>
          <ContentRenderer v-if="post" :value="post" />
          <UUser
              orientation="horizontal"
              :name="post.author"
              description="Admin"
              size="md"
              :avatar="{
                  src: '/favicon.png'
                }"
              class="flex justify-center"
          />
        </UContainer>
      </UContainer>
    </UPageBody>
  </UPage>
</template>