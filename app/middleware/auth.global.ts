import {useAuthClient} from "~/composables/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data: loggedIn } = await useAuthClient().useSession(useFetch)
    if (!loggedIn.value) {
        if (to.path === "/profile") {
            return navigateTo("/login");
        }
    }
})