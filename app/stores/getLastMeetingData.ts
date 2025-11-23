export const useLastMeetingDataStore = defineStore('lastMeetingData', {
    state: () => ({
        lastMeetingData: Object
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            this.lastMeetingData = await $fetch<any>(`${runtimeConfig.public.apiBase}/get-last-meeting`)
        },
    },
})