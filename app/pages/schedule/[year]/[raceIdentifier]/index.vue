<script setup lang="ts">
const route = useRoute()
const raceIdentifier = route.params.raceIdentifier as string
const runtimeConfig = useRuntimeConfig()
const { data: meetingData } = await useFetch(`${runtimeConfig.public.apiBase}/api-events-f/mongo/view?name=${raceIdentifier}`)
const meetingKey = meetingData.value.meetingKey as string
const { data: fullMeetingData } = await useFetch(`${runtimeConfig.public.apiBase}/api-calendar-f/meetings/${meetingKey}`)

</script>

<template>
<UContainer>
  <UPageHeader :title="meetingData?.meetingOfficialName" :description="meetingData?.circuitLocation" />
  <p>{{fullMeetingData}}</p>
</UContainer>
</template>

<style scoped>

</style>