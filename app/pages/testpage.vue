<script setup>
import { ref } from 'vue'
import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const darkMode = ref(true)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors duration-300">
      <!-- <CHANGE> Added sticky positioning with backdrop blur -->
      <nav class="sticky top-0 z-50 bg-neutral-50/95 dark:bg-black/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center gap-8">
              <div class="text-2xl font-bold text-red-600">F1</div>

              <!-- Desktop Navigation -->
              <div class="hidden md:flex items-center gap-6">
                <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Latest</a>
                <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Schedule</a>
                <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Drivers</a>
                <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Teams</a>
                <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Video</a>
              </div>
            </div>

            <!-- Right side actions -->
            <div class="flex items-center gap-4">
              <!-- Dark mode toggle -->
              <button
                  @click="toggleDarkMode"
                  class="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Toggle dark mode"
              >
                <Sun v-if="darkMode" class="w-5 h-5" />
                <Moon v-else class="w-5 h-5" />
              </button>

              <!-- Mobile menu button -->
              <button
                  @click="toggleMobileMenu"
                  class="md:hidden p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Toggle menu"
              >
                <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
                <X v-else class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- Mobile Navigation -->
          <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800">
            <div class="flex flex-col gap-4">
              <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Latest</a>
              <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Schedule</a>
              <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Drivers</a>
              <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Teams</a>
              <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors">Video</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- ... existing code ... -->

      <!-- Hero Section -->
      <section class="relative h-[600px] overflow-hidden">
        <img
            src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=600&width=1920"
            alt="F1 Racing"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div class="max-w-2xl">
              <h1 class="text-5xl md:text-6xl font-bold mb-4 text-white">
                2024 SEASON
              </h1>
              <p class="text-xl md:text-2xl text-neutral-200 mb-8">
                The battle for the championship intensifies
              </p>
              <button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition-colors">
                Watch Highlights
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ... existing code ... -->

      <!-- Quick Links -->
      <section class="bg-neutral-100 dark:bg-neutral-900 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#" class="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors">
              Race Results <ChevronRight class="w-4 h-4" />
            </a>
            <a href="#" class="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors">
              Driver Standings <ChevronRight class="w-4 h-4" />
            </a>
            <a href="#" class="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors">
              Team Standings <ChevronRight class="w-4 h-4" />
            </a>
            <a href="#" class="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors">
              Calendar <ChevronRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <!-- ... existing code ... -->

      <!-- Latest Stories Grid -->
      <section class="py-12 bg-white dark:bg-black">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8">Latest Stories</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Story Card 1 -->
            <article class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg mb-4">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=300&width=400"
                    alt="Race Story"
                    class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
                  RACE
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                Verstappen dominates in spectacular fashion
              </h3>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">
                The championship leader extends his advantage with another commanding performance
              </p>
            </article>

            <!-- Story Card 2 -->
            <article class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg mb-4">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=300&width=400"
                    alt="Driver Story"
                    class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
                  FEATURE
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                Rising star makes history with maiden podium
              </h3>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">
                Young talent delivers breakthrough performance in thrilling race
              </p>
            </article>

            <!-- Story Card 3 -->
            <article class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg mb-4">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=300&width=400"
                    alt="Team Story"
                    class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
                  TECH
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                Technical analysis: The upgrades making the difference
              </h3>
              <p class="text-neutral-600 dark:text-neutral-400 text-sm">
                Inside look at the innovations pushing teams to the front of the grid
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- ... existing code ... -->

      <!-- Spotlight Section -->
      <section class="py-12 bg-neutral-100 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Main Spotlight -->
            <article class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg mb-4">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=400&width=600"
                    alt="Spotlight"
                    class="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 class="text-3xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                The championship battle heats up
              </h2>
              <p class="text-neutral-600 dark:text-neutral-400 mb-4">
                With only six races remaining, the fight for the title is reaching its climax. We analyze the key factors that will determine this season's champion.
              </p>
              <a href="#" class="text-red-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Read More <ChevronRight class="w-5 h-5" />
              </a>
            </article>

            <!-- Secondary Stories -->
            <div class="flex flex-col gap-6">
              <article class="flex gap-4 group cursor-pointer">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=120&width=180"
                    alt="Story"
                    class="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">
                    Team principals react to controversial decision
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    Heated debate continues after weekend's dramatic events
                  </p>
                </div>
              </article>

              <article class="flex gap-4 group cursor-pointer">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=120&width=180"
                    alt="Story"
                    class="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">
                    Next race preview: What to expect
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    Key talking points ahead of the upcoming Grand Prix
                  </p>
                </div>
              </article>

              <article class="flex gap-4 group cursor-pointer">
                <img
                    src="https://g-jgcga1vpino.vusercontent.net/placeholder.svg?height=120&width=180"
                    alt="Story"
                    class="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">
                    Driver market: Latest transfer rumors
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    Who's moving where for next season?
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- ... existing code ... -->

      <!-- Driver Standings -->
      <section class="py-12 bg-white dark:bg-black">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Driver Standings</h2>
            <a href="#" class="text-red-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View Full Standings <ChevronRight class="w-5 h-5" />
            </a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b-2 border-neutral-200 dark:border-neutral-800">
              <tr class="text-left">
                <th class="pb-4 font-bold">Pos</th>
                <th class="pb-4 font-bold">Driver</th>
                <th class="pb-4 font-bold">Team</th>
                <th class="pb-4 font-bold text-right">Points</th>
              </tr>
              </thead>
              <tbody>
              <tr class="border-b border-neutral-200 dark:border-neutral-800">
                <td class="py-4 font-bold">1</td>
                <td class="py-4">Max Verstappen</td>
                <td class="py-4">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                      Red Bull Racing
                    </span>
                </td>
                <td class="py-4 text-right font-bold">575</td>
              </tr>
              <tr class="border-b border-neutral-200 dark:border-neutral-800">
                <td class="py-4 font-bold">2</td>
                <td class="py-4">Sergio Perez</td>
                <td class="py-4">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-blue-600"></span>
                      Red Bull Racing
                    </span>
                </td>
                <td class="py-4 text-right font-bold">285</td>
              </tr>
              <tr class="border-b border-neutral-200 dark:border-neutral-800">
                <td class="py-4 font-bold">3</td>
                <td class="py-4">Lewis Hamilton</td>
                <td class="py-4">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-teal-400"></span>
                      Mercedes
                    </span>
                </td>
                <td class="py-4 text-right font-bold">234</td>
              </tr>
              <tr class="border-b border-neutral-200 dark:border-neutral-800">
                <td class="py-4 font-bold">4</td>
                <td class="py-4">Fernando Alonso</td>
                <td class="py-4">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-green-600"></span>
                      Aston Martin
                    </span>
                </td>
                <td class="py-4 text-right font-bold">206</td>
              </tr>
              <tr>
                <td class="py-4 font-bold">5</td>
                <td class="py-4">Charles Leclerc</td>
                <td class="py-4">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-red-600"></span>
                      Ferrari
                    </span>
                </td>
                <td class="py-4 text-right font-bold">206</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ... existing code ... -->

      <!-- Footer -->
      <footer class="bg-neutral-900 dark:bg-neutral-950 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-4 text-red-600">F1</h3>
              <p class="text-neutral-400 text-sm">
                The official home of Formula 1 racing
              </p>
            </div>
            <div>
              <h4 class="font-bold mb-4">Racing</h4>
              <ul class="space-y-2 text-sm text-neutral-400">
                <li><a href="#" class="hover:text-white transition-colors">Schedule</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Results</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Standings</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Content</h4>
              <ul class="space-y-2 text-sm text-neutral-400">
                <li><a href="#" class="hover:text-white transition-colors">Video</a></li>
                <li><a href="#" class="hover:text-white transition-colors">News</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">More</h4>
              <ul class="space-y-2 text-sm text-neutral-400">
                <li><a href="#" class="hover:text-white transition-colors">Tickets</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Store</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Gaming</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2025 Formula 1. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>