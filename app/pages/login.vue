<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import {ref} from "vue";
const { signIn } = useAuthClient()

const loading = ref(false)

const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

function loginWith(provider: string) {
  signIn.social({ provider })
}

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    loginWith('google')
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    loginWith('github')
  }
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await signIn.email({
      email: payload.email,
      password: payload.password
    })
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}

useHead({
  title: "GridFanHub - Login",
  meta: [
    { name: 'description', content: 'Sign in to your GridFanHub account' },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://beta.gridfanhub.com/login'
    }
  ]
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
          :schema="schema"
          title="Login"
          description="Enter your credentials to access your account."
          icon="i-lucide-user"
          :fields="fields"
          :providers="providers"
          @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>

