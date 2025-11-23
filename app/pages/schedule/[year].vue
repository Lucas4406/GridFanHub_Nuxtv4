<script setup lang="ts">
const route = useRoute()
const seasonYear = route.params.year as string
const events = useEventsPageStore()

await callOnce(() => events.fetch({ year: seasonYear }))

useHead({
  title: `GridFanHub - ${seasonYear} Formula 1 Schedule`,
  meta: [
    { name: 'description', content: `Explore the complete Formula 1 ${seasonYear} schedule, including all Grand Prix dates, race weekends, session times, and circuits. Stay updated with the full F1 calendar for ${seasonYear}, featuring detailed information for every practice, qualifying, sprint, and race event throughout the season.` },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://beta.gridfanhub.com/schedule/${seasonYear}`,
    }
  ]
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UPageHeader :title="`Formula 1 ${seasonYear} schedule`" />
        <UPageGrid>
          <EventCard
            v-for="event in events.eventsArray"
            :key="event.meetingKey"
            :event="event"
          />
        </UPageGrid>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<style scoped>

</style>