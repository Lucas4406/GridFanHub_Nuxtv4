const runtimeConfig = useRuntimeConfig()
export const useVideosStore = defineStore('videosStore', {
    state: () => ({
        videosArray: []
    }),
    actions: {
        async fetch () {
            const videosCall = await $fetch<any>(`${runtimeConfig.public.cloudflareProxyBase}/v1/video-assets/videos?limit=9`)

            this.videosArray = videosCall.videos
        },
    },
})