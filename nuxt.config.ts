// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@formkit/auto-animate',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxthub/core',
    '@nuxt/ui',
  ],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
            cloudflareProxyBase: 'https://proxy.gridfanhub.com'
        },
    },
    app: {
        head: {
            title: 'GridFanHub - the new website where you can find the latest news and data about Formula1', // default fallback title
            htmlAttrs: {
                lang: 'en',
            },
            link: [
                {   rel: 'icon', type: 'image/x-icon', href: '/favicon.ico',
                    rel: 'apple-touch-icon', type: 'image/x-icon', href: '/favicon.ico'
                },
            ],
        },
    },
})