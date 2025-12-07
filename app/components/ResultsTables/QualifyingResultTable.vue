<script setup lang="ts">
const { results } = defineProps<{
  results: Array<any>
}>()

import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'


type F1Result = {
  positionNumber: string
  driverFirstName: string
  driverLastName: string
  driverShortName: string
  displayTime: string
  driverAvatarImage: { public_id: string, default_image: string }
  teamLogoImage: { public_id: string }
  teamName: string
  teamColourCode: string
  q1?: { displayTime: string }
  q2?: { displayTime: string }
  q3?: { displayTime: string }
}

// TRANSFORMĂ IMAGINILE
const data = computed(() =>
    results.map(r => ({
      ...r,
      driverAvatar: `https://media.formula1.com/image/upload/c_thumb,g_auto:face,w_120,h_120,q_auto,f_auto/v1740000000/${r.driverAvatarImage.public_id}.png`,
      teamLogo: `https://media.formula1.com/image/upload/c_lfill,w_64/q_auto/v1740000000/${r.teamLogoImage.public_id}.png`,
      fullName: `${r.driverFirstName} ${r.driverLastName}`
    }))
)

const columns: TableColumn<F1Result & { driverAvatar: string; teamLogo: string; fullName: string }>[] = [
  {
    accessorKey: 'positionNumber',
    header: '#',
    size: 60,
  },
  {
    accessorKey: 'fullName',
    header: 'Driver',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [

        // Avatar
        h('div', {
          class: 'h-12 w-12 rounded-full overflow-hidden border bg-neutral-900 flex items-center justify-center'
        }, [
          h('img', {
            src: row.original.driverAvatar,
            class: 'w-full h-full object-cover scale-90'
          })
        ]),

        // NUME (versiuni diferite mobile / desktop)
        h('div', undefined, [

          // 🟢 Desktop: nume complet
          h('p', {
            class: 'hidden md:block font-medium text-highlighted text-base'
          }, row.original.fullName),

          // 🟢 Mobil: nume scurt (ex: VER)
          h('p', {
            class: 'block md:hidden font-semibold text-highlighted text-base'
          }, row.original.driverTLA)
        ])
      ])
    }
  },

  {
    accessorKey: 'teamName',
    header: 'Team',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2' }, [

        // Logo (vizibil peste tot)
        h('img', {
          src: row.original.teamLogo,
          class: 'h-7 w-auto bg-black rounded-2xl p-1'
        }),

        // Textul echipei — DOAR pe desktop
        h('span', {
          class: 'hidden md:block text-md',
          style: `color: #${row.original.teamColourCode}`
        }, row.original.teamName)
      ])
    }
  },

  {
    accessorKey: 'q1.displayTime',
    header: 'Q1',
    class: 'text-base',
    cell: ({ row }) => {
      return h('span', { class: 'text-base text-highlighted font-medium' }, row.original.q1?.displayTime || '-')
    }
  },
  {
    accessorKey: 'q2.displayTime',
    header: 'Q2',
    class: 'text-base',
    cell: ({ row }) => {
      return h('span', { class: 'text-base text-highlighted font-medium' }, row.original.q2?.displayTime || '-')
    }
  },
  {
    accessorKey: 'q3.displayTime',
    header: 'Q3',
    class: 'text-base',
    cell: ({ row }) => {
      return h('span', { class: 'text-base text-highlighted font-medium' }, row.original.q3?.displayTime || '-')
    }
  },
  {
    accessorKey: 'displayTime',
    header: 'Best Time',
    class: 'text-base',
    cell: ({ row }) => {
      return h('span', { class: 'text-base text-highlighted font-semibold' }, row.original.displayTime)
    }
  },
]
</script>

<template>
  <UTable
      :data="data"
      :columns="columns"
      class="flex-1 bg-gray-100 dark:bg-gray-900"
  />
</template>

<style scoped>

</style>