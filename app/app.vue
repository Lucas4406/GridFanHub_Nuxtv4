<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <Navbar />

      <UMain>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UMain>

      <Footer />
    </UApp>
  </div>
</template>

<script setup lang="ts">
const weekendStatus = useWeekendStatusStore()
const config = useRuntimeConfig()


const { data } = await useFetch(`${config.public.apiBase}/weekend-status`)

// salvăm în store (ATENȚIE: trebuie să fie după await)
if (data.value) {
  weekendStatus.set(data.value)
}

// 2️⃣ Client-side refetch la 2 minute
if (import.meta.client) {
  setInterval(async () => {
    const fresh = await $fetch(`${config.public.apiBase}/weekend-status`)
    weekendStatus.set(fresh)
  }, 2 * 60 * 1000)
}
</script>