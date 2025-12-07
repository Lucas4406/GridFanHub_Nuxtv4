export const useCurrentMeetingStore = defineStore('currentMeeting', {
    state: () => ({
        currentMeeting: null,
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            const data = await $fetch<any>(`${runtimeConfig.public.apiBase}/get-next`)
            data.meetingContext.nr_runda = data.meetingContext.nr_runda + 1
            this.currentMeeting = data
        },
    },
})