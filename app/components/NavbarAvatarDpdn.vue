<script setup lang="ts">
const { profileData } = defineProps<{
  profileData: {
    user?: {
      name?: string
      image?: string
    }
  } | null
}>()

const items = computed(() => [
  [
    {
      label: profileData?.user?.name,
      avatar: {
        src: profileData?.user?.image
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      onClick() {
        navigateTo("/profile")
      }
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onClick(){
        const { signOut } = useAuthClient()
        signOut().then(() => {
          const router = useRouter()
          router.go(0) // Reload the page
        })
      }
    }
  ]
])
</script>

<template>
  <UDropdownMenu v-if="profileData" :items="items" size="xl">
    <UAvatar :src="profileData?.user?.image ?? ''" size="xl" icon="i-lucide-image"/>
  </UDropdownMenu>
  <UButton v-else color="primary" to="/login">Login</UButton>
</template>

<style scoped>

</style>