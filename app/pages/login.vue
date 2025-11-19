<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
    <UCard class="w-full max-w-md shadow-2xl rounded-2xl">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold">Log in</h1>
      </div>

      <UForm :state="form" @submit="onSubmit" class="space-y-4">
        <UFormField label="Email" name="email">
          <UInput v-model="form.email" type="email" placeholder="you@example.com" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="form.password" type="password" placeholder="••••••••" />
        </UFormField>

        <UButton type="submit" block :loading="loading">
          Login
        </UButton>
      </UForm>

      <USeparator label="or" class="my-6" />

      <div class="space-y-3">
        <UButton color="neutral" block @click="loginWith('google')">
          <UIcon name="i-simple-icons-google" class="mr-2" /> Login with Google
        </UButton>

        <UButton color="neutral" block @click="loginWith('github')">
          <UIcon name="i-simple-icons-github" class="mr-2" /> Login with GitHub
        </UButton>
      </div>

      <div class="mt-6 text-center text-sm">
        <NuxtLink to="/register" class="text-primary hover:underline">
          No account? Register here.
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { signIn } = useAuthClient()

const loading = ref(false)
const form = ref({ email: '', password: '' })

async function onSubmit() {
  loading.value = true
  try {
    await signIn.email({
      email: form.value.email,
      password: form.value.password
    })
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}

function loginWith(provider: string) {
  signIn.social({ provider })
}
</script>
