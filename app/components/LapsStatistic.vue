<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { data } = await useFetch(`${runtimeConfig.public.apiBase}/laps-statistics`)


const progressValue = ref(Number(data.value?.lapsProgress.replace('%', '')))

</script>

<template>
  <UPageCard
      :title="`${data?.racedLaps} of ${data?.totalLapsInSeason} laps completed`"
      description="2025 Season"
      orientation="vertical"
      variant="soft"
      highlight
      highlight-color="primary"
      class="flex items-center gap-6"
  >

    <div class="flex flex-col items-center justify-center w-full">

      <!-- Big Percentage with subtle gradient -->
      <div class="text-6xl font-extrabold text-red-500 bg-clip-text">
        {{ data?.lapsProgress }}
      </div>

      <!-- Small subtitle -->
      <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 tracking-wide uppercase">
        Completion Rate
      </div>

      <!-- Progress bar -->
      <UProgress
          v-model="progressValue"
          color="primary"
          class="w-3/4 h-2 mt-4 rounded-full"
      />
    </div>

  </UPageCard>
</template>
