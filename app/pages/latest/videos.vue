<script setup lang="ts">
useHead({
  title: "GridFanHub - Latest Formula 1 Videos",
  meta: [
    { name: 'description', content: 'View the lastest Formula 1 videos. Pole position laps, Interviews, Key race moments and much more' },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://beta.gridfanhub.com/latest/videos'
    }
  ]
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <VideosComponent />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<style scoped>

</style>