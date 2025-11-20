<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UPageCard
            :title="nextRace"
            :description="nextRaceDescription"
            icon="i-simple-icons-tailwindcss"
            orientation="horizontal"
            highlight
            highlight-color="primary"
        >
          <img :src="data.circuitSmallImage.url" alt="Tailwind CSS" class="w-full" />
        </UPageCard>
      </UContainer>
      <UContainer>
        <NewsComponent />
      </UContainer>
    </UPageBody>

  </UPage>
</template>

<script setup lang="ts">
const { signOut } = useAuthClient()
const router = useRouter()

async function handleSignOut() {
  await signOut()

  // Refresh pagina după ce cookie-ul este șters
  router.go(0)     // 🔥 face un reload complet al paginii
}
const runtimeConfig = useRuntimeConfig()
const {data} = await useFetch(`${runtimeConfig.public.cloudflareProxyBase}/v1/event-tracker`)
const nextRace = `Next race - ${data.value?.race.meetingName}`
const nextRaceDescription = `${data.value?.race.roundText} - ${data.value?.race.meetingStartDate.toLocaleString()} `
</script>