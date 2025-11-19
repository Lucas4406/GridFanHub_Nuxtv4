import axios from "axios"
import { useRuntimeConfig } from '#imports'
export default async function getNext() {
    const runtimeConfig = useRuntimeConfig() // ✅ acum funcționează
    const link_api = `${runtimeConfig.public.apiBase}/get-next`
    const res = await axios.get(link_api)
    return res.data
}