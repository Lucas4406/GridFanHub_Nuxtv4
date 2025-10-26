<template>
  <nav class="bg-white dark:bg-black text-black dark:text-white shadow-lg transition-colors duration-300">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 md:h-24 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/">
            <img src="/Logo-transparent-456x139.png" alt="GridFanHub Logo" class="h-12 md:h-16 w-auto" />
          </NuxtLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex md:items-center space-x-8">
          <div v-for="item in menuItems" :key="item.name" class="relative group">
            <NuxtLink
                :to="item.link"
                class="px-3 py-3 md:py-4 text-lg md:text-xl font-medium hover:text-red-600 transition-colors duration-300"
            >
              {{ item.name }}
            </NuxtLink>

            <!-- Dropdown -->
            <div
                v-if="item.submenu && item.submenu.length"
                class="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10"
            >
              <NuxtLink
                  v-for="sub in item.submenu"
                  :key="sub.name"
                  :to="sub.link"
                  class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 text-base transition-colors duration-200"
              >
                {{ sub.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button @click="mobileOpen = !mobileOpen" class="focus:outline-none">
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileOpen" class="md:hidden bg-white dark:bg-black transition-colors duration-300">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <div v-for="item in menuItems" :key="item.name">
          <button
              @click="toggleMobileSubmenu(item.name)"
              class="w-full flex justify-between items-center px-3 py-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 text-base transition-colors duration-300"
          >
            <span>{{ item.name }}</span>
            <svg
                v-if="item.submenu && item.submenu.length"
                :class="{'transform rotate-90': mobileSubmenuOpen[item.name]}"
                class="w-4 h-4 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Mobile Dropdown -->
          <div
              v-if="item.submenu && item.submenu.length"
              v-show="mobileSubmenuOpen[item.name]"
              class="pl-4"
          >
            <NuxtLink
                v-for="sub in item.submenu"
                :key="sub.name"
                :to="sub.link"
                class="block px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {{ sub.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive } from 'vue'

const mobileOpen = ref(false)

const menuItems = [
  { name: 'Schedule', link: '/schedule', submenu: [{ name: 'Calendar', link: '/schedule/calendar' }, { name: 'Tracks', link: '/schedule/tracks' }] },
  { name: 'News', link: '/news', submenu: [{ name: 'Latest', link: '/news/latest' }, { name: 'Analysis', link: '/news/analysis' }] },
  { name: 'Results', link: '/results', submenu: [{ name: 'Race', link: '/results/race' }, { name: 'Sprint', link: '/results/sprint' }] },
  { name: 'Standings', link: '/standings', submenu: [{ name: 'Drivers', link: '/standings/drivers' }, { name: 'Teams', link: '/standings/teams' }] },
]

const mobileSubmenuOpen = reactive({})

const toggleMobileSubmenu = (name) => {
  mobileSubmenuOpen[name] = !mobileSubmenuOpen[name]
}
</script>

<style scoped>
/* Optional: smooth dropdown fade for desktop */
.group:hover > div {
  transition: opacity 0.2s ease-in-out;
}
</style>
