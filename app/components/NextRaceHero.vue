<script setup lang="ts">
import {useCurrentMeetingStore} from "~/stores/currentOrNextMeeting";

const runtimeConfig = useRuntimeConfig()
const meetingData = useCurrentMeetingStore()
await callOnce(meetingData.fetch)


const nextRace = `Next - ${meetingData.currentMeeting?.race.meetingName}`
const nextRaceDescription = `${meetingData.currentMeeting?.race.roundText} - ${new Date(meetingData.currentMeeting?.race.meetingStartDate).toLocaleString()} `

// const lastCompleted = computed(() => {
//   const t = meetingData.currentMeeting?.seasonContext?.timetables
//   if (!t) return null
//
//   return t.slice().reverse().find(s => s.state === "completed")
// })
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
      :description="nextRaceDescription"
      orientation="horizontal"
      variant="soft"
      highlight
      highlight-color="primary"
  >
    <template #header>
      <h2>{{nextRace}}</h2>
    </template>
    <template #body>
      <h1>Hello</h1>
    </template>
    <NuxtImg :src="meetingData.currentMeeting?.circuitSmallImage.url" alt="Tailwind CSS" class="w-full" />
  </UPageCard>
</template>

<style scoped>

</style>