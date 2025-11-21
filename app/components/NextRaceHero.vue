<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const {data} = await useFetch(`${runtimeConfig.public.cloudflareProxyBase}/v1/event-tracker`, {
  headers: {
    "X-Cache-Duration": 120
  },
  key: "nextRaceData"
})
const nextRace = `Next - ${data.value?.race.meetingName}`
const nextRaceDescription = `${data.value?.race.roundText} - ${new Date(data.value?.race.meetingStartDate).toLocaleString()} `
</script>

<template>
  <UPageCard
      :title="nextRace"
      :description="nextRaceDescription"
      orientation="horizontal"
      variant="soft"
      highlight
      highlight-color="primary"
  >
    <img :src="data.circuitSmallImage.url" alt="Tailwind CSS" class="w-full" />
  </UPageCard>
</template>

<style scoped>

</style>