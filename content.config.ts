import { defineContentConfig, defineCollection } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        content: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: '**/*.md',
                schema: z.object({
                    tags: z.array(z.string()),
                    image: z.string(),
                    date: z.date(),
                    category: z.string(),
                    location: z.string(),
                    slug: z.string(),
                    author: z.string(),
                })
            }),
        )
    }
})
