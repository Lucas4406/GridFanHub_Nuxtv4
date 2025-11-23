<script setup lang="ts">
import {useCurrentMeetingStore} from "~/stores/currentOrNextMeeting";

const runtimeConfig = useRuntimeConfig()
const meetingData = useCurrentMeetingStore()
await callOnce(meetingData.fetch)


const nextRace = `Next - ${meetingData.currentMeeting?.race.meetingName}`
const nextRaceDescription = `${meetingData.currentMeeting?.race.roundText} - ${new Date(meetingData.currentMeeting?.race.meetingStartDate).toLocaleString()} `


const race = meetingData.currentMeeting?.race
const timetable = meetingData.currentMeeting?.seasonContext?.timetables || []


// Primele 3 sesiuni viitoare
const nextSessions = timetable.slice(0, 3)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleString(undefined, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  })
}

const mainTitle = race ? `Next – ${race.meetingName}` : "Next Race"
const subTitle = race
    ? `${race.roundText} • ${race.meetingLocation}, ${race.meetingCountryName}`
    : ""

// const lastCompleted = computed(() => {
//   const t = meetingData.currentMeeting?.seasonContext?.timetables
//   if (!t) return null
//
//   return t.slice().reverse().find(s => s.state === "completed")
// })
//
// console.log(lastCompleted.value)
//
// const currentEventsLinks = useCurrentEventsLinksStore()
// await callOnce(async () => {
//   if (meetingData.currentMeeting?.fomRaceId) {
//     await currentEventsLinks.fetch(meetingData.currentMeeting?.fomRaceId)
//   }
// })
//
// let lastEventLink
//
// currentEventsLinks.currentEventLinks.map(event => {
//   if(event.text === lastCompleted.value.description){
//     lastEventLink = event.value
//   }
// })
//
// let lastEventData
//
// if(lastEventLink){
//   try {
//     const { data: res } = await useFetch(`${runtimeConfig.public.cloudflareProxyBase}/v2/fom-results/${lastEventLink}`, {
//       key: "lastEventData"
//     })
//     lastEventData = res.value
//   } catch (e) {
//     console.error("Failed to fetch last event data:", e)
//   }
// }
//
//
// console.log("lastEventLink:", lastEventLink)
// console.log("lastEventData raw:", lastEventData)
//
// function extractRaceResults(data: any) {
//   if (!data) return null
//   return Object.values(data).find(v => v?.session)
// }
//
// const topThreeLastSession = extractRaceResults(lastEventData)
//
// console.log(topThreeLastSession)

</script>

<template>
  <UPageCard
      orientation="horizontal"
      variant="soft"
      highlight
      highlight-color="primary"
  >
    <!-- LEFT SIDE -->
    <template #body>
      <div class="p-4 flex flex-col gap-3">

        <!-- Title -->
        <h2 class="text-2xl font-bold">{{ mainTitle }}</h2>
        <p class="text-lg opacity-80">{{ subTitle }}</p>

        <!-- Dates -->
        <p class="text-sm opacity-70">
          {{ new Date(race?.meetingStartDate).toLocaleDateString("en-GB", {
          day: "numeric", month: "short"
        }) }}
          –
          {{ new Date(race?.meetingEndDate).toLocaleDateString("en-GB", {
          day: "numeric", month: "short"
        }) }}
        </p>

        <!-- Next sessions -->
        <div class="mt-2 space-y-1">
          <h3 class="text-sm font-semibold opacity-70">Upcoming sessions</h3>

          <div v-for="s in nextSessions" :key="s.session" class="flex justify-between text-sm">
            <span class="font-medium">{{ s.shortName }}</span>
            <span class="opacity-70">{{ formatDate(s.startTime + s.gmtOffset) }}</span>
          </div>
        </div>

      </div>
    </template>

    <!-- RIGHT SIDE IMAGE -->
    <NuxtImg
        :src="meetingData.currentMeeting?.circuitSmallImage.url"
    />
  </UPageCard>
</template>


<style scoped>

</style>