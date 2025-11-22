export const useCurrentMeetingStore = defineStore('currentMeeting', {
    state: () => ({
        currentMeeting: null,
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            this.currentMeeting = await $fetch<any>(`${runtimeConfig.public.cloudflareProxyBase}/v1/event-tracker`)
        },
    },
})