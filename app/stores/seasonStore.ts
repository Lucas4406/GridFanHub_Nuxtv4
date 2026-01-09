export const useSeasonStore = defineStore('season', {
    state: () => ({
        seasonYear: 2026 as number
    }),

    actions: {
        setSeason(year: number) {
            this.seasonYear = year
        }
    }
})