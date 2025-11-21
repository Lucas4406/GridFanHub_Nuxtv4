<script setup lang="ts">
const route = useRoute()
const seasonYear = route.params.year as string
const events = useEventsPageStore()

await callOnce(() => events.fetch({ year: seasonYear }))
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