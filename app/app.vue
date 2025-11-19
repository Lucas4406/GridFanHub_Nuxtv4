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
import Footer from "~/components/Footer.vue";
</script>