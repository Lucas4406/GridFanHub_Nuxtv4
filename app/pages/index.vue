<template>
  <UPage>
    <UPageHeader title="Home Page" subtitle="Welcome to the new GridFanHub website!"/>
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
        <UButton v-if="session" color="primary" @click="handleSignOut">
          Sign Out
        </UButton>

        <UCard>
          <template #header>
            <Placeholder class="h-8" />
          </template>

          <Placeholder class="h-32" />

          <template #footer>
            <Placeholder class="h-8" />
          </template>
        </UCard>
      </UContainer>
    </UPageBody>

  </UPage>
</template>

<script setup lang="ts">
const { signOut } = useAuthClient()
import { useSession } from "~/lib/auth-client";
const { data: session } = await useSession(useFetch);
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
console.log(data.value)
</script>