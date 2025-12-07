export const useLastMeetingDataStore = defineStore('lastMeetingData', {
    state: () => ({
        lastMeetingData: null as any
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            const nextMeeting = await $fetch<any>(`${runtimeConfig.public.apiBase}/get-next`)
            let data
            if(nextMeeting.meetingContext.isLastEvent === false) {
                data = await $fetch<any>(`${runtimeConfig.public.apiBase}/get-last`)
            }else{
                data = nextMeeting
            }
            // dacă API a trimis doar un mesaj, NU este un meeting valid
            if (data && data.message) {
                console.warn("API returned message instead of meeting:", data.message)
                this.lastMeetingData = null
                return
            }

            this.lastMeetingData = data
        },
    },
})