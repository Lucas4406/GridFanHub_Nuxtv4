<script setup lang="ts">
import { marked } from "marked"

const { posterData } = defineProps<{
  posterData: Record<string, any>
}>()

const formattedDescription = computed(() =>
    posterData.circuitDescription
        ? marked.parse(posterData.circuitDescription)
        : ""
)
</script>

<template>
  <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 dark:bg-gray-900">
<!--    <div class="absolute inset-0 -z-10 overflow-hidden">-->
<!--      <svg class="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200 dark:stroke-gray-800" aria-hidden="true">-->
<!--        <defs>-->
<!--          <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">-->
<!--            <path d="M100 200V.5M.5 .5H200" fill="none" />-->
<!--          </pattern>-->
<!--        </defs>-->
<!--        <svg x="50%" y="-1" class="overflow-visible fill-gray-50 dark:fill-gray-800/50">-->
<!--          <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />-->
<!--        </svg>-->
<!--        <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />-->
<!--      </svg>-->
<!--    </div>-->
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
      <div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="lg:max-w-lg">
            <h1 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">{{posterData.circuitTitle}}</h1>
          </div>
        </div>
      </div>
      <div class="lg:-mt-12 lg:-ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
        <img class="w-3xl max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-228 dark:bg-gray-800 dark:ring-white/10" :src="posterData.imageUrl" alt="" />
      </div>
      <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="max-w-xl text-base/7 text-gray-600 lg:max-w-lg dark:text-gray-400">
            <div v-for="(item, i) in posterData.circuitStats.body" :key="i" class="space-y-4">
              <h2 class="text-3xl font-semibold text-f1red border-b border-gray-700 py-2">
                {{ item.heading }}
              </h2>

              <p class="dark:text-gray-300 text-gray-800 leading-relaxed">
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
