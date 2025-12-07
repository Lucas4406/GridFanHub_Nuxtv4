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


const firebaseIdentifier = meetingData.value.meetingKey + "_" + slugify(meetingData.value.meetingName)
const firebaseYear = new Date(meetingData.value.meetingStartDate).getFullYear()
const firebaseSessionsPath = `${runtimeConfig.public.apiBase}/api-latest-session-f/view/${firebaseYear}/${firebaseIdentifier}?filter=true`
const { data: firebaseSessionsData } = await useFetch(firebaseSessionsPath)

function checkIfSessionResultAvailable(session){
  if(!firebaseSessionsData.value){
    return false;
  }
  let sessionName = session.description.toLowerCase().replaceAll(/\s+/g, '');
  if(sessionName === "sprintqualifying"){
    sessionName = "sprint shootout"
  }
  return firebaseSessionsData.value.some(s => s.session === sessionName);
}

const posterData = {
  circuitTitle: fullMeetingData.value?.race.circuitOfficialName || '',
  circuitDescription: fullMeetingData.value?.circuitDescriptionText || '',
  circuitStats: fullMeetingData.value?.circuitDescription || {},
  imageUrl: fullMeetingData.value?.raceImage.url || '',
}


useHead({
  title: `GridFanHub - ${meetingData?.value.meetingName} ${firebaseYear} `,
  meta: [
    {
      name: 'description',
      content: `Discover the full Formula 1 ${firebaseYear} race weekend schedule for ${meetingData?.value.meetingName}. Get all the session times in your local time zone. Explore circuit details, images, and session results for every Grand Prix of the ${firebaseYear} season.`
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://beta.gridfanhub.com/schedule/${firebaseYear}/${raceIdentifier}`,
    }
  ]
})

</script>

<template>
<UContainer>
  <UPageHeader :title="meetingData?.meetingOfficialName" :description="meetingData?.circuitLocation" />
  <UPageBody class="mt-0">
    <UContainer>
      <h2 class="text-3xl lg:text-4xl font-bold my-6">Schedule</h2>
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
                  v-if="checkIfSessionResultAvailable(session)"
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
    <ScrollablePoster :posterData="posterData" />
  </UPageBody>
</UContainer>
</template>

<style scoped>

</style>