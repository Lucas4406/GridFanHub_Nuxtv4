<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <NextRaceHero class="lg:col-span-2" sessionShowNumber="3" :onlyNextSessions="true" v-if="weekendStatus.seasonTracker.next && !weekendStatus.error" />
          <LapsStatistic v-if="weekendStatus.seasonStatus !== 'season_not_started'" />
        </UPageGrid>
      </UContainer>
      <UContainer>
        <NewsComponent />
      </UContainer>
      <UContainer v-if="isLastRace">
        <UPageHeader title="Last Race" :description="lastRaceStore.lastRaceData.meeting.meetingOfficialName" />
        <LastRacePodium :results="lastRaceStore.lastRaceData.topDriverResults" :resultsLink="lastRaceLink" />
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

const isLastRace = ref(false)
const lastRaceLink = ref("")



const weekend = useWeekendStatusStore()
const weekendStatus = weekend.weekendStatus

const slugify = (str: string) =>
    str.trim().toLowerCase().split(/\s+/).join('-');

const lastRaceStore = useLastRaceDataStore()
const start = new Date(weekendStatus.currentMeeting?.race.meetingStartDate)
const minus24h = new Date(start.getTime() - 24 * 60 * 60 * 1000)

if(weekendStatus?.weekendStatus.state === "weekend_not_started" || weekendStatus?.weekendStatus.state === "weekend_completed"){
  if (weekendStatus.seasonTracker.previous){
    console.log("Showing last race data")
    isLastRace.value = true
    await callOnce(lastRaceStore.fetch)
    lastRaceLink.value = `/results/${lastRaceStore.lastRaceData.year}/${slugify(lastRaceStore.lastRaceData.meeting.meetingName)}/race`
  }
}else{
  if(minus24h > new Date()){
    console.log("Showing last race data")
    isLastRace.value = true
    await callOnce(lastRaceStore.fetch)
  }
}

</script>