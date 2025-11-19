<template>
  <UPage>
    <UPageHeader title="Home Page" subtitle="Welcome to the new GridFanHub website!"/>
    <UPageBody>
      <UPageCard
          :title="nextRace"
          description="Nuxt UI integrates with latest Tailwind CSS v4, bringing significant improvements."
          icon="i-simple-icons-tailwindcss"
          orientation="horizontal"
          highlight
          highlight-color="primary"
      >
        <img :src="data.circuitSmallImage.url" alt="Tailwind CSS" class="w-full" />
      </UPageCard>
    </UPageBody>

  </UPage>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const {data} = await useFetch(`${runtimeConfig.public.cloudflareProxyBase}/v1/event-tracker`)
const nextRace = `Next race - ${data.value?.race.meetingName}`
console.log(data.value)
</script>