<script setup lang="ts">
import { useSession } from "~/lib/auth-client";
const { data: session } = await useSession(useFetch);

const items = ref([
  {
    label: 'Schedule',
    icon: 'i-lucide-calendar',
    to: '/schedule',
  },
  {
    label: 'News',
    icon: 'i-lucide-database',
    to: '/latest-news',
    children: [
      {
        label: 'Latest news',
        icon: 'i-lucide-database',
        description: 'Read the latest headlines',
        to: '/latest-news'
      },
      {
        label: 'Latest videos',
        icon: 'i-lucide-video',
        description: 'View the latest videos',
        to: '/latest-videos'
      },
    ]
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    to: '/docs/components',
    active: true,
    children: [
      {
        label: 'Link',
        icon: 'i-lucide-file-text',
        description: 'Use NuxtLink with superpowers.',
        to: '/docs/components/link'
      },
      {
        label: 'Modal',
        icon: 'i-lucide-file-text',
        description: 'Display a modal within your application.',
        to: '/docs/components/modal'
      },
      {
        label: 'NavigationMenu',
        icon: 'i-lucide-file-text',
        description: 'Display a list of links.',
        to: '/docs/components/navigation-menu'
      },
      {
        label: 'Pagination',
        icon: 'i-lucide-file-text',
        description: 'Display a list of pages.',
        to: '/docs/components/pagination'
      },
      {
        label: 'Popover',
        icon: 'i-lucide-file-text',
        description: 'Display a non-modal dialog that floats around a trigger element.',
        to: '/docs/components/popover'
      },
      {
        label: 'Progress',
        icon: 'i-lucide-file-text',
        description: 'Show a horizontal bar to indicate task progression.',
        to: '/docs/components/progress'
      }
    ]
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    badge: '3.8k',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
  },
  {
    label: 'Help',
    icon: 'i-lucide-circle-help',
    disabled: true
  }
])
</script>

<template>
  <UHeader>

    <template #title>
      <img src="/Logo-transparent-456x139.png"  class="h-18 w-auto"  alt="GridFanHub logo"/>
    </template>

    <UNavigationMenu :items="items"/>

    <template #right>
      <NavbarAvatarDpdn :profileData="session ?? null" />
    </template>
  </UHeader>
</template>
