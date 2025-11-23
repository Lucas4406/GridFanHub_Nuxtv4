<script setup lang="ts">
import { useSession } from "~/lib/auth-client";
const { data: session } = await useSession(useFetch);

const season = useSeasonStore()

const items = ref([
  {
    label: 'Schedule',
    icon: 'i-lucide-calendar',
    to: `/schedule/${season.seasonYear}`,
  },
  {
    label: 'Latest',
    icon: 'i-lucide-database',
    to: '/latest/news',
    children: [
      {
        label: 'Latest news',
        icon: 'i-lucide-database',
        description: 'Read the latest headlines',
        to: '/latest/news'
      },
      {
        label: 'Latest videos',
        icon: 'i-lucide-video',
        description: 'View the latest videos',
        to: '/latest/videos'
      },
    ]
  },
  {
    label: 'Standings',
    icon: 'i-lucide-database',
    to: '/standings/drivers',
    children: [
      {
        label: 'Driver standings',
        icon: 'i-lucide-database',
        description: 'Driver standings updated after every session',
        to: '/standings/drivers'
      },
      {
        label: 'Team standings',
        icon: 'i-lucide-video',
        description: 'Team standings updated after every session',
        to: '/standings/teams'
      },
    ]
  },
  {
    label: 'Results',
    icon: 'i-lucide-database',
    to: '/results',
  },
])

const route = useRoute()

const itemsWithActive = computed(() =>
    items.value.map(item => {
      if (item.children) {
        const isChildActive = item.children.some(child => child.to === route.path)
        return { ...item, active: isChildActive }
      }
      return { ...item, active: item.to === route.path }
    })
)
</script>

<template>
  <UHeader :toggle="{ size: 'xl' }">

    <template #title>
      <img src="/Logo-transparent-456x139.png"  class="h-18 w-auto"  alt="GridFanHub logo"/>
    </template>

    <UNavigationMenu :items="itemsWithActive"/>

    <template #right>
      <NavbarAvatarDpdn :profileData="session ?? null" class="cursor-pointer" />
    </template>

    <template #body>
      <UNavigationMenu orientation="vertical" :items="itemsWithActive" />
    </template>
  </UHeader>
</template>
