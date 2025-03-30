import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "mr5wnv0b",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-02-04"
})