export const useLastRaceDataStore = defineStore('lastRaceData', {
    state: () => ({
        lastRaceData: Object
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            const lastMeetingStore = useLastMeetingDataStore()
            await lastMeetingStore.fetch()
            const meetingYear = lastMeetingStore.lastMeetingData.season
            const firebaseIdentifier = lastMeetingStore.lastMeetingData.meetingId + "_" + lastMeetingStore.lastMeetingData.meetingData.race.meetingName.replaceAll(" ", "-").toLowerCase()
            this.lastRaceData = await $fetch<any>(`${runtimeConfig.public.apiBase}/season-results/homepage/${meetingYear}/${firebaseIdentifier}`)
        },
    },
})