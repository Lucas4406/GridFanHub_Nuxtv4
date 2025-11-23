<script setup lang="ts">
const { results } = defineProps<{
  results: any[]
}>()

// sortare 1–2–3
const top3 = computed(() =>
    [...(results || [])].sort(
        (a, b) => Number(a.positionValue) - Number(b.positionValue)
    ).slice(0, 3)
)
</script>

<template>
  <div class="w-full flex justify-center mt-10">
    <UPageGrid
        :cols="3"
        :gap="6"
        class="w-full max-w-6xl items-end"
    >

      <!-- 🥈 P2 -->
      <UCard
          :style="{ backgroundColor: '#' + top3[1].teamColourCode }"
          class="relative w-full rounded-2xl p-6 text-white shadow-xl flex flex-col"
      >
        <p class="text-xl font-bold mb-1">2nd</p>

        <h2 class="text-2xl font-bold leading-tight">
          {{ top3[1].driverFirstName }} {{ top3[1].driverLastName }}
        </h2>
        <p class="text-white/90 -mt-1">{{ top3[1].teamName }}</p>

        <!-- Driver -->
        <NuxtImg
            :src="top3[1].driverPodiumImage"
            class="w-44 h-44 object-contain absolute right-3 bottom-4 opacity-95"
        />

        <!-- Extra info -->
        <div class="mt-24">
          <p class="font-semibold text-lg">P2 • {{ top3[1].displayTime }}</p>
          <p class="text-md">+{{ top3[1].racePoints }} pts</p>
        </div>
      </UCard>

      <!-- 🥇 P1 (mai mare & ridicat) -->
      <UCard
          :style="{ backgroundColor: '#' + top3[0].teamColourCode }"
          class="relative w-full rounded-2xl p-8 text-white shadow-xl flex flex-col lg:-mt-10"
      >
        <p class="text-xl font-bold mb-1">🏆 1st</p>

        <h2 class="text-3xl font-extrabold leading-tight">
          {{ top3[0].driverFirstName }} {{ top3[0].driverLastName }}
        </h2>
        <p class="text-white/90 -mt-1">{{ top3[0].teamName }}</p>

        <!-- Driver -->
        <NuxtImg
            :src="top3[0].driverPodiumImage"
            class="w-48 h-48 object-contain absolute right-3 bottom-4 opacity-95"
        />

        <div class="mt-28">
          <p class="font-semibold text-lg">P1 • {{ top3[0].displayTime }}</p>
          <p class="text-md">+{{ top3[0].racePoints }} pts</p>
        </div>
      </UCard>

      <!-- 🥉 P3 -->
      <UCard
          :style="{ backgroundColor: '#' + top3[2].teamColourCode }"
          class="relative w-full rounded-2xl p-6 text-white shadow-xl flex flex-col"
      >
        <p class="text-xl font-bold mb-1">3rd</p>

        <h2 class="text-2xl font-bold leading-tight">
          {{ top3[2].driverFirstName }} {{ top3[2].driverLastName }}
        </h2>
        <p class="text-white/90 -mt-1">{{ top3[2].teamName }}</p>

        <NuxtImg
            :src="top3[2].driverPodiumImage"
            class="w-44 h-44 object-contain absolute right-3 bottom-4 opacity-95"
        />

        <div class="mt-24">
          <p class="font-semibold text-lg">P3 • {{ top3[2].displayTime }}</p>
          <p class="text-md">+{{ top3[2].racePoints }} pts</p>
        </div>
      </UCard>

    </UPageGrid>
  </div>
</template>

<style scoped>
/* smooth hover + card feel */
.UCard {
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}
.UCard:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.25);
}
</style>
