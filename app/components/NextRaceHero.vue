<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sessionShowNumber?: string | number,
  onlyNextSessions?: boolean
}>()

const weekendStore = useWeekendStatusStore()
const data = computed(() => weekendStore.weekendStatus)

const timetable = computed(() => data.value?.race?.meetingSessions || [])

// 2. Filtrarea sesiunilor: includem și "isCurrent" pentru a vedea ziua de test în desfășurare
const displaySessions = computed(() => {
  const sessions = timetable.value

  if (props.onlyNextSessions) {
    // Includem sesiunea curentă + cele viitoare
    return sessions
        .filter(s => s.status === "isNext" || s.status === "isCurrent")
        .slice(0, Number(props.sessionShowNumber) || 3)
  }
  return sessions
})

const state = computed(() => data.value?.weekendStatus?.state)
const race = computed(() => data.value?.race)

// Titlu dinamic: Scoatem "R0" dacă este Pre-season testing
const mainTitle = computed(() => {
  if (!race.value) return "Loading..."
  const prefix = (state.value === 'session_in_progress' || state.value === 'between_sessions') ? 'Now' :
      (state.value === 'weekend_not_started') ? 'Next' : 'Last'

  return `${prefix} - ${race.value.meetingName}`
})

const subTitle = computed(() => {
  if (!race.value) return ""
  // Dacă meetingNumber e 0 sau lipsește (cazul testelor), nu afișăm "R0"
  const round = race.value.meetingNumber && race.value.meetingNumber !== "0"
      ? `R${race.value.meetingNumber} • `
      : ""
  return `${round}${race.value.meetingLocation}, ${race.value.circuitShortName}`
})

function formatDate(dateStr: string, gmtOffset: string = "+00:00") {
  // Curățăm offset-ul dacă vine dublat sau lipsește
  const cleanDate = dateStr.includes('Z') || dateStr.includes('+') ? dateStr : `${dateStr}${gmtOffset}`
  const d = new Date(cleanDate)
  return d.toLocaleString('en-GB', {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
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
        v-if="data.seasonTracker.current.circuitSmallImage"
        :src="data.seasonTracker.current.circuitSmallImage"
        :alt="race.circuitShortName"
    />
    <template #body>
      <div class="p-4 flex flex-col gap-3">

        <div>
          <h2 class="text-2xl font-bold">{{ mainTitle }}</h2>
          <p class="text-lg opacity-80">{{ subTitle }}</p>
        </div>

        <!-- Dates -->
        <p class="text-sm opacity-70">
          {{ formatDateStable(data.seasonTracker?.current?.meetingStartDate) }}
          –
          {{ formatDateStable(data.seasonTracker?.current?.meetingEndDate) }}
        </p>

        <div class="mt-2 space-y-1 border-t border-gray-500/20 pt-3">
          <h3 class="text-xs uppercase tracking-wider font-bold opacity-50 mb-2">
            {{ state === 'weekend_completed' ? 'Results' : 'Schedule' }}
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
                <span v-if="s.description && s.shortName.includes('Day')" class="text-xs opacity-50 font-normal italic">
                   ({{ s.description }})
                </span>
              </div>

              <span class="opacity-70 tabular-nums">
                {{ formatDate(s.startTime, s.gmtOffset) }}
              </span>
            </div>
          </div>
          <p v-else class="text-sm opacity-60 italic">No more sessions today.</p>
        </div>

      </div>
    </template>
  </UPageCard>
</template>


<style scoped>

</style>