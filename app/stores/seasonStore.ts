export const useSeasonStore = defineStore('season', {
    state: () => ({
        seasonYear: 2025 as number
    }),

    actions: {
        setSeason(year: number) {
            this.seasonYear = year
        }
    }
})