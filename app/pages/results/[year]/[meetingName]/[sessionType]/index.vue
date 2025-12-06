<script setup lang="ts">
const route = useRoute()
const sessionType = route.params.sessionType as string
const meetingName = route.params.meetingName as string
const year = route.params.year as string
const runtimeConfig = useRuntimeConfig()

import type { TableColumn } from '@nuxt/ui'



let sessionFirestore = sessionType.replaceAll("-", "")
if(sessionFirestore === "sprintqualifying"){
  sessionFirestore = "sprint shootout"
}

const { data: meetingData } = await useFetch(`${runtimeConfig.public.apiBase}/api-events-f/mongo/view?name=${meetingName}`)
const meetingKey = meetingData.value.meetingKey as string
const firebaseIdentifier = meetingKey + "_" + meetingName
const firebaseSessionPath = `${runtimeConfig.public.apiBase}/api-latest-session-f/view/${year}/${firebaseIdentifier}/session/${sessionFirestore}`
const { data: sessionData } = await useFetch(firebaseSessionPath)

let displaySessionName
if(sessionType === "practice-1"){
  displaySessionName = "Practice 1"
} else if(sessionType === "practice-2"){
  displaySessionName = "Practice 2"
} else if(sessionType === "practice-3"){
  displaySessionName = "Practice 3"
} else if(sessionType === "qualifying"){
  displaySessionName = "Qualifying"
} else if(sessionType === "sprint-qualifying"){
  displaySessionName = "Sprint Qualifying"
} else if(sessionType === "race"){
  displaySessionName = "Race"
} else if(sessionType === "sprint"){
  displaySessionName = "Sprint"
} else {
  displaySessionName = sessionType
}

let firestoreSessionName
if(sessionType === "practice-1"){
  firestoreSessionName = "Practice1"
} else if(sessionType === "practice-2"){
  firestoreSessionName = "Practice2"
} else if(sessionType === "practice-3"){
  firestoreSessionName = "Practice3"
} else if(sessionType === "qualifying"){
  firestoreSessionName = "Qualifying"
} else if(sessionType === "sprint-qualifying"){
  firestoreSessionName = "SprintShootout"
} else if(sessionType === "race"){
  firestoreSessionName = "Race"
} else if(sessionType === "sprint"){
  firestoreSessionName = "Sprint"
} else {
  firestoreSessionName = sessionType
}


const resultsObj = sessionData?.value.data?.["raceResults" + firestoreSessionName] || { results: [] }
const resultsArray = resultsObj.results || []

const rows = resultsArray.map((r: any) => ({
  position: r.displayPosition,
  driver: {
    name: r.driverShortName,
    avatar: r.driverAvatarImage?.public_id
        ? `https://media.formula1.com/image/upload/${r.driverAvatarImage.public_id}.png`
        : `https://media.formula1.com/image/upload/${r.driverAvatarImage?.default_image}.png`,
  },
  team: {
    name: r.displayTeamName,
    color: `#${r.teamColourCode}`,
    logo: r.teamLogoImage?.public_id
        ? `https://media.formula1.com/image/upload/${r.teamLogoImage.public_id}.png`
        : '',
  },
  laps: r.lapsCompleted,
  time: r.displayTime,
}))


</script>

<template>
<UPage>
  <UPageBody>
    <UContainer>
      <UPageHeader :title="`${displaySessionName} Results`" :description="sessionData?.data.meeting.meetingName" />
      <div class="mt-6">
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead class="bg-gray-800">
            <tr>
              <th class="px-3 py-2 text-left text-sm font-medium text-gray-700 w-16">Pos</th>
              <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Driver</th>
              <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Team</th>
              <th class="px-3 py-2 text-center text-sm font-medium text-gray-700">Laps</th>
              <th class="px-3 py-2 text-center text-sm font-medium text-gray-700">Time</th>
            </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-200">
            <tr v-for="row in rows" :key="row.position" class="hover:bg-gray-50">
              <td class="px-3 py-2 text-center">{{ row.position }}</td>
              <td class="px-3 py-2 flex items-center gap-2">
                <img :src="row.driver.avatar" alt="avatar" class="w-6 h-6 rounded-full border" />
                <span>{{ row.driver.name }}</span>
              </td>
              <td class="px-3 py-2 flex items-center gap-2">
                <img v-if="row.team.logo" :src="row.team.logo" alt="team logo" class="w-6 h-6" />
                <span :style="{ color: row.team.color }">{{ row.team.name }}</span>
              </td>
              <td class="px-3 py-2 text-center">{{ row.laps }}</td>
              <td class="px-3 py-2 text-center">{{ row.time }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UContainer>
  </UPageBody>
</UPage>
</template>

<style scoped>

</style>