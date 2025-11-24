<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <NextRaceHero class="lg:col-span-2" sessionShowNumber="3" />
          <LapsStatistic />
        </UPageGrid>
      </UContainer>
      <UContainer>
        <NewsComponent />
      </UContainer>
      <UContainer v-if="lastRaceStore.lastRaceData">
        <UPageHeader title="Last Race" :description="lastRaceStore.lastRaceData.meeting.meetingOfficialName" />
        <LastRacePodium :results="lastRaceStore.lastRaceData.topDriverResults" />
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

const lastRaceStore = useLastRaceDataStore()
await callOnce(lastRaceStore.fetch)

</script>