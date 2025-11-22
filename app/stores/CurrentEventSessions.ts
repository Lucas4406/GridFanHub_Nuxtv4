export const useCurrentEventsLinksStore = defineStore('currentEventsLinks', {
    state: () => ({
        currentEventLinks: []
    }),
    actions: {
        async fetch (meetingKey: string | number) {
            const runtimeConfig = useRuntimeConfig()
            this.currentEventLinks = await $fetch<any>(`${runtimeConfig.public.cloudflareProxyBase}/v2/fom-results/dropdown-meeting-datasets?meeting=${meetingKey}`)
        },
    },
})