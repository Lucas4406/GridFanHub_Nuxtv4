<script setup>
const slug = useRoute().params.slug

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('content').path(`/blog/${slug}`).first()
})

</script>

<template>
    <ContentRenderer v-if="post" :value="post" />
</template>