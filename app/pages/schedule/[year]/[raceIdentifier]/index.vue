<script setup lang="ts">
const route = useRoute()
const raceIdentifier = route.params.raceIdentifier as string
const runtimeConfig = useRuntimeConfig()
const { data: meetingData } = await useFetch(`${runtimeConfig.public.apiBase}/api-events-f/mongo/view?name=${raceIdentifier}`)
const meetingKey = meetingData.value.meetingKey as string
const { data: fullMeetingData } = await useFetch(`${runtimeConfig.public.apiBase}/api-calendar-f/meetings/${meetingKey}`)

const timetables = fullMeetingData.value?.race?.meetingSessions

function getLocalTime(startTime, gmtOffset) {
  // Construiți un ISO corect cu offset
  const date = new Date(`${startTime}${gmtOffset}`);

  // Returnează ora locală (ex: "16:00")
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}


function getLocalDatePretty(startTime, gmtOffset) {
  const date = new Date(`${startTime}${gmtOffset}`);

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

const slugify = (str: string) =>
    str.trim().toLowerCase().split(/\s+/).join('-');


</script>

<template>
<UContainer>
  <UPageHeader :title="meetingData?.meetingOfficialName" :description="meetingData?.circuitLocation" />
  <UPageBody class="mt-0">
    <NuxtImg :src="fullMeetingData?.raceImage.url" class="w-full" />
    <UContainer>
      <UPageList divide class="border-2 border-neutral-800 rounded-xl p-4">
        <UPageCard
            v-for="(session, meetingSessionKey) in timetables"
            :key="meetingSessionKey"
            variant="ghost"
        >
          <template #body>
            <div class="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              <!-- Left section -->
              <div class="flex flex-row items-center gap-4">

                <!-- Time + Date -->
                <div class="flex flex-col min-w-[80px] text-center sm:text-left">
                  <h4 class="font-semibold text-xs lg:text-lg leading-tight">
                    {{ getLocalTime(session.startTime, session.gmtOffset) }} -
                    {{ getLocalTime(session.endTime, session.gmtOffset) }}
                  </h4>
                  <p class="text-xs sm:text-sm text-gray-500">
                    {{ getLocalDatePretty(session.startTime, session.gmtOffset) }}
                  </p>
                </div>

                <!-- Vertical separator -->
                <USeparator
                    orientation="vertical"
                    class="h-10 border-gray-300"
                />

                <!-- Session Description -->
                <h3 class="text-2xl lg:text-3xl font-bold tracking-tight">
                  {{ session.description }}
                </h3>

              </div>

              <!-- Right section: Button -->
              <NuxtLink
                  :to="`/results/${new Date(session.startTime).getFullYear()}/${slugify(meetingData?.meetingName || '')}/${slugify(session.description)}`"
                  class="px-4 py-2 rounded-md bg-primary text-white hover:underline text-sm font-medium self-start sm:self-auto"
              >
                View Results
              </NuxtLink>

            </div>
          </template>
        </UPageCard>
      </UPageList>
    </UContainer>
  </UPageBody>
</UContainer>
</template>

<style scoped>

</style>