<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sessionShowNumber?: string | number,
  onlyNextSessions?: boolean
}>()

const weekendStore = useWeekendStatusStore()
const data = computed(() => weekendStore.weekendStatus)

// 1. Sursa principală de date pentru UI (Meeting-ul curent trimis de API)
// Backend-ul tău face spread la meetingData, deci race e direct în rădăcină
const race = computed(() => data.value?.race)
const state = computed(() => data.value?.weekendStatus?.state)
const tracker = computed(() => data.value?.seasonTracker)

// 2. Sesiunile: luăm direct din obiectul race returnat
const timetable = computed(() => race.value?.meetingSessions || [])

const displaySessions = computed(() => {
  const sessions = timetable.value
  if (props.onlyNextSessions) {
    // În timpul weekend-ului: arătăm ce urmează (sau ce e acum)
    // Dacă weekend-ul s-a terminat: slice(0,3) va arăta primele sesiuni (sau poți returna gol)
    return sessions
        .filter(s => s.status === "isNext" || s.status === "isCurrent")
        .slice(0, Number(props.sessionShowNumber) || 3)
  }
  return sessions
})

// 3. Titlu Dinamic bazat pe STATE-ul din backend
const mainTitle = computed(() => {
  if (!race.value) return "Loading..."

  switch (state.value) {
    case 'session_in_progress': return `LIVE - ${race.value.meetingName}`
    case 'between_sessions':    return `Ongoing - ${race.value.meetingName}`
    case 'weekend_not_started': return `Next - ${race.value.meetingName}`
    case 'weekend_completed':   return `Last - ${race.value.meetingName}`
    default:                    return race.value.meetingName
  }
})

const subTitle = computed(() => {
  if (!race.value) return ""
  const round = race.value.meetingNumber && race.value.meetingNumber !== "0"
      ? `R${race.value.meetingNumber} • `
      : ""
  return `${round}${race.value.meetingLocation}, ${race.value.circuitShortName}`
})

// 4. Imaginea de circuit: API-ul o are în seasonTracker.current sau next
const circuitImage = computed(() => {
  return tracker.value?.current?.circuitSmallImage || tracker.value?.next?.circuitSmallImage
})

// Funcții de formatare (fără modificări majore, doar safe checks)
function formatDate(dateStr: string, gmtOffset: string = "+00:00") {
  if(!dateStr) return ""
  const cleanDate = dateStr.includes('Z') || dateStr.includes('+') ? dateStr : `${dateStr}${gmtOffset}`
  return new Date(cleanDate).toLocaleString('en-GB', {
    weekday: "short", hour: "2-digit", minute: "2-digit",
  })
}

function formatDateStable(dateStr: string) {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return `${date.getDate()} ${date.toLocaleString("en", { month: "short" })}`
}

const slugify = (str: string) => str ? str.trim().toLowerCase().split(/\s+/).join('-') : '';
</script>

<template>
  <UPageCard
      v-if="race"
      orientation="horizontal"
      variant="soft"
      highlight
      highlight-color="primary"
      :to="`/schedule/${new Date(race.meetingStartDate).getFullYear()}/${slugify(race.meetingName)}`"
  >
    <NuxtImg
        v-if="circuitImage"
        :src="circuitImage"
        :alt="race.circuitShortName"
        class="hidden lg:block w-64 xl:w-80 object-contain p-2 ml-auto"
    />
    <template #body>
      <div class="p-4 flex flex-col gap-3">
        <div>
          <h2 class="text-2xl font-bold">{{ mainTitle }}</h2>
          <p class="text-lg opacity-80">{{ subTitle }}</p>
        </div>

        <p class="text-sm opacity-70 font-medium">
          {{ formatDateStable(race.meetingStartDate) }} – {{ formatDateStable(race.meetingEndDate) }}
        </p>

        <div class="mt-2 space-y-1 border-t border-gray-500/20 pt-3">
          <h3 class="text-xs uppercase tracking-wider font-bold opacity-50 mb-2">
            {{ state === 'weekend_completed' ? 'Results Available' : 'Event Schedule' }}
          </h3>

          <div v-if="displaySessions.length > 0" class="space-y-2">
            <div v-for="s in displaySessions" :key="s.meetingSessionKey"
                 class="flex justify-between text-sm items-center"
                 :class="{'text-primary-500 font-bold': s.status === 'isCurrent'}"
            >
              <div class="flex items-center gap-2">
                <span v-if="s.status === 'isCurrent'" class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>{{ s.shortName }}</span>
              </div>
              <span class="opacity-70 tabular-nums">{{ formatDate(s.startTime, s.gmtOffset) }}</span>
            </div>
          </div>
          <p v-else-if="state === 'weekend_completed'" class="text-sm text-primary-400">
            Check the full results page for details.
          </p>
          <p v-else class="text-sm opacity-60 italic">No more sessions scheduled for today.</p>
        </div>
      </div>
    </template>
  </UPageCard>
</template>