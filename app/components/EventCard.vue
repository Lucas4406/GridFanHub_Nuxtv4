<script setup lang="ts">
import DriverTop3Avatars from "~/components/driverTop3Avatars.vue";

const { event } = defineProps<{
  event: Record<string, any>
}>()

function extractDayAndMonthShort(dateString: string) {
  const date = new Date(dateString)

  const day = date.getUTCDate()
  const month = date.toLocaleString("en-GB", {month: "short"}).toUpperCase()

  return {day, month}
}

</script>

<template>
  <UPageCard
      :title="event.meetingLocation"
      :description="event.meetingOfficialName"
      :to="`/schedule/${new Date(event.meetingStartDate).getFullYear()}/${event.meetingName.replaceAll(/\s+/g, '-').toLowerCase()}`"
      orientation="horizontal"
      variant="soft"
      :class="event.isCurrentMeeting ? 'bg-primary border-primary' : ''"
  >
    <NuxtImg v-if="event.status !== 'completed'" :src="event.circuitSmallImage" :alt="event.circuitOfficialName" class="w-full"  />
    <div class="flex flex-col gap-4 h-full justify-between" v-if="event.status === 'completed' && event.type !== 'fom-testing'">
      <driver-top3-avatars :topThreeData="event.drivers" />
    </div>
    <NuxtImg v-if="event.type === 'fom-testing' && event.status === 'completed'" :alt="event.circuitOfficialName" :src="event.circuitSmallImage" class="w-full"  />
    <template #header>
      <h3 class="text-xs font-semibold">{{event.roundText}}</h3>
    </template>
    <template #footer>
      <h3 class="font-bold flex items-center gap-1">
        <!-- Icon doar dacă status === completed -->
        <UIcon name="i-lucide-flag" v-if="event.status === 'completed'" class="w-4 h-4" />
        {{ extractDayAndMonthShort(event.meetingStartDate).day + " - " + extractDayAndMonthShort(event.meetingEndDate).day + " " + extractDayAndMonthShort(event.meetingEndDate).month }}
      </h3>
    </template>
  </UPageCard>
</template>

<style scoped>

</style>