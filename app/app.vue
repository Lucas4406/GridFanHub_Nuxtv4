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

      <UFooter class="dark:bg-stone-900" />
    </UApp>
  </div>
</template>

<script setup lang="ts">
</script>