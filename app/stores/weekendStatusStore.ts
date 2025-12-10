export const useWeekendStatusStore = defineStore('weekendStatus', {
    state: () => ({
        weekendStatus: null as any,
    }),
    actions: {
        set(data: any) {
            this.weekendStatus = data
        }
    }
})
