export const useNewsStore = defineStore('newsStore', {
    state: () => ({
        newsArray: []
    }),
    actions: {
        async fetch () {
            const runtimeConfig = useRuntimeConfig()
            const news = await $fetch<any>(`${runtimeConfig.public.cloudflareProxyBase}/v1/editorial/articles?limit=9`)

            this.newsArray = news.items
        },
    },
})