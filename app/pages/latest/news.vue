<script setup lang="ts">
useHead({
  title: "GridFanHub - Latest Formula 1 News",
  meta: [
    { name: 'description', content: 'Read about the lastest Formula 1 headlines and latest news' },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://beta.gridfanhub.com/latest/news'
    }
  ]
})
</script>

<template>
  <UPage>
  <UPageBody>
    <UContainer>
      <NewsComponent />
    </UContainer>
  </UPageBody>
  </UPage>
</template>

<style scoped>

</style>