import {useAuthClient} from "~/composables/auth";

export default defineNuxtRouteMiddleware(async to => {
    const isUserNavigatingToTheApp = to.path.startsWith('/profile')
    if (!isUserNavigatingToTheApp) {
        return
    }

    const { data: loggedIn } = await useAuthClient().useSession(useFetch)
    if (!loggedIn.value) {
        return navigateTo('/auth/login')
    }
})