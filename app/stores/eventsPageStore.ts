export const useEventsPageStore = defineStore('eventsPageStore', {
    state: () => ({
        eventsArray: []
    }),
    actions: {
        async fetch (options?: {year: string}) {
            const runtimeConfig = useRuntimeConfig()
            const res = await $fetch<any>(
                `${runtimeConfig.public.apiBase}/api-events-f/view?season=${options?.year}`
            )

            const key = res.currentOrNextMeetingKey

            // copiem array-ul original ca să evităm mutații nedorite
            this.eventsArray = res.events.map((event: any) => ({
                ...event,
                isCurrentMeeting: event.meetingKey === key
            }))

        },
    },
})