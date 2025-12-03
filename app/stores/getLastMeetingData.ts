export const useLastMeetingDataStore = defineStore('lastMeetingData', {
    state: () => ({
        lastMeetingData: null as any
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            const data = await $fetch<any>(`${runtimeConfig.public.apiBase}/get-last`)

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