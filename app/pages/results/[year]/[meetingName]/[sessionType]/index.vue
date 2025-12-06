<script setup lang="ts">
import QualifyingResultTable from "~/components/ResultsTables/QualifyingResultTable.vue";

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


const resultsObj = sessionData?.value?.data?.["raceResults" + firestoreSessionName] || { results: [] }
const resultsArray = resultsObj.results || []


</script>

<template>
<UPage>
  <UPageBody>
    <UContainer>
      <UPageHeader :title="`${displaySessionName} Results`" :description="sessionData?.data.meeting.meetingName" />
      <div class="mt-6">
        <QualifyingResultTable :results="resultsArray" />
      </div>
    </UContainer>
  </UPageBody>
</UPage>
</template>

<style scoped>

</style>