export const useWeekendStatus = () => {
    const config = useRuntimeConfig()

    return useFetch(`${config.public.apiBase}/weekend-status`)
}