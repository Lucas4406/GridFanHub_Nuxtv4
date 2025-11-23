<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const season = useSeasonStore()

const items: NavigationMenuItem[] = [
  {
    label: 'Full Schedule',
    to: `/schedule/${season.seasonYear}`,
  },
  {
    label: 'Latest news',
    to: '/latest/news',
  },
  {
    label: 'Latest videos',
    to: '/latest/videos',
  }
]
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">GridFanHub © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeSelect />
    </template>
  </UFooter>
</template>

