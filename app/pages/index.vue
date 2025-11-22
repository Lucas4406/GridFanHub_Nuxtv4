<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <NextRaceHero class="lg:col-span-2" />
          <LapsStatistic />
        </UPageGrid>
      </UContainer>
      <UContainer>
        <NewsComponent />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "GridFanHub - Home",
  description: "Stay updated with the latest Formula 1 news, videos, data and race schedules on GridFanHub.",
  link: [
    {
      rel: 'canonical',
      href: 'https://beta.gridfanhub.com'
    }
  ]
})

</script>