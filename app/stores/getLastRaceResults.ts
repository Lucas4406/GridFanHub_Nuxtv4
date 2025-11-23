export const useLastRaceDataStore = defineStore('lastRaceData', {
    state: () => ({
        lastRaceData: null as any
    }),
    actions: {
        async fetch () {
            try {
                const runtimeConfig = useRuntimeConfig()
                const lastMeetingStore = useLastMeetingDataStore()

                await lastMeetingStore.fetch()

                const meeting = lastMeetingStore.lastMeetingData
                if (!meeting) {
                    console.warn("No meeting data found.")
                    return
                }

                const meetingYear = meeting.season
                const firebaseIdentifier = `${meeting.meetingId}_${meeting.meetingData.race.meetingName.replaceAll(" ", "-").toLowerCase()}`

                const url = `${runtimeConfig.public.apiBase}/season-results/homepage/${meetingYear}/${firebaseIdentifier}`

                const data = await $fetch<any>(url).catch(err => {
                    console.warn("API lastRaceData failed:", err)
                    return null     // <- NU lasăm să bubuie
                })

                if (data) {
                    this.lastRaceData = data
                } else {
                    this.lastRaceData = null
                    console.warn("No last race data returned.")
                }

            } catch (err) {
                console.error("Unexpected error in lastRaceData fetch:", err)
                this.lastRaceData = null
            }
        },
    },
})