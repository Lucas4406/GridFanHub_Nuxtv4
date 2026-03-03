<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <NextRaceHero
              v-if="tracker?.next && !status?.error"
              class="lg:col-span-2"
              sessionShowNumber="3"
              :onlyNextSessions="true"
          />

          <LapsStatistic v-if="status?.seasonStatus !== 'season_not_started'" />
        </UPageGrid>
      </UContainer>

      <UContainer class="mt-8">
        <NewsComponent />
      </UContainer>

      <UContainer v-if="showLastRace" class="mt-12">
        <UPageHeader
            title="Last Race Results"
            :description="tracker.previous.meetingOfficialName"
        />
        <LastRacePodium
            :results="tracker.previous.topDriverResults"
            :resultsLink="lastRaceLink"
        />
      </UContainer>

      <UContainer v-else-if="tracker?.previous?.isTestEvent && status.value?.weekendStatus?.state === 'weekend_not_started'" class="mt-12">
        <UAlert
            icon="i-heroicons-information-circle"
            color="primary"
            variant="soft"
            title="Pre-season testing completed"
            description="The cars have hit the track! Stay tuned for the first official Grand Prix of the season."
        />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">

useHead({
  title: "GridFanHub - Home",
  meta: [
    { name: 'description', content: 'Stay updated with the latest Formula 1 news, videos, data and race schedules on GridFanHub.' },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://beta.gridfanhub.com'
    }
  ]
})
const weekendStore = useWeekendStatusStore()

// 1. Mapăm datele din store
const status = computed(() => weekendStore.weekendStatus)
const tracker = computed(() => status.value?.seasonTracker)

// 2. Logică pentru afișarea secțiunii "Last Race"
// Se afișează dacă nu suntem în timpul unei sesiuni active (weekend-ul nu a început sau s-a terminat)
const showLastRace = computed(() => {
  const state = status.value?.weekendStatus?.state
  const prevEvent = tracker.value?.previous

  // Condițiile de bază pentru a arăta secțiunea
  const isCorrectTiming = state === "weekend_not_started" || state === "weekend_completed"

  // Verificăm dacă evenimentul anterior EXISTĂ și NU este un test
  // De asemenea, verificăm dacă are datele de podium (topDriverResults)
  const isActualRace = prevEvent && !prevEvent.isTestEvent && prevEvent.type !== 'fom-testing'

  // Opțional: Verifică dacă există efectiv rezultate pentru a evita un podium gol
  const hasResults = prevEvent?.topDriverResults && prevEvent.topDriverResults.length > 0

  return isCorrectTiming && isActualRace && hasResults
})

const slugify = (str: string) => str?.trim().toLowerCase().split(/\s+/).join('-') || ''

// 3. Generăm link-ul către rezultate folosind datele din tracker.previous
const lastRaceLink = computed(() => {
  const prev = tracker.value?.previous
  if (!prev) return ""

  const year = new Date(prev.meetingStartDate).getFullYear()
  return `/results/${year}/${slugify(prev.meetingName)}/race`
})

</script>