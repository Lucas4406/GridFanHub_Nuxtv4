<script setup lang="ts">
const { results } = defineProps<{
  results: Array<any>
}>()

import { h, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'

type F1Result = {
  positionNumber: string
  driverFirstName: string
  driverLastName: string
  driverShortName: string
  displayTime: string
  driverTLA: string
  driverAvatarImage: { public_id: string, default_image: string }
  teamLogoImage: { public_id: string }
  teamName: string
  teamColourCode: string
  racePoints?: number
  gapToLeader?: string
  lapsBehindLeader?: string
  lapsCompleted: string
}

// 🔹 TRANSFORMĂ IMAGINILE ȘI DISPLAY TIME
const data = computed(() => {
  return results.map((r, index) => {
    let display = ''
    if (index === 0) {
      display = r.displayTime // primul loc: timpul total
    } else if (r.lapsBehindLeader && parseInt(r.lapsBehindLeader) > 0) {
      display = `+${r.lapsBehindLeader} lap${parseInt(r.lapsBehindLeader) > 1 ? 's' : ''}`
    } else if (r.gapToLeader) {
      display = `+${r.gapToLeader}s`
    }

    return {
      ...r,
      driverAvatar: `https://media.formula1.com/image/upload/f_auto,c_fill,g_auto,w_100,h_100/${r.driverAvatarImage.public_id}.png`,
      teamLogo: `https://media.formula1.com/image/upload/c_lfill,w_64/q_auto/v1740000000/${r.teamLogoImage.public_id}.png`,
      fullName: `${r.driverFirstName} ${r.driverLastName}`,
      displayTimeFormatted: display,
    }
  })
})

const columns: TableColumn<F1Result & { driverAvatar: string; teamLogo: string; fullName: string; displayTimeFormatted: string }>[] = [
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
        h('img', {
          src: row.original.driverAvatar,
          class: 'h-7 w-7 lg:h-10 lg:w-10 object-cover rounded-full'
        }),
        // Nume
        h('div', undefined, [
          h('p', { class: 'hidden md:block font-medium text-highlighted text-base' }, row.original.fullName),
          h('p', { class: 'block md:hidden font-semibold text-highlighted text-base' }, row.original.driverTLA)
        ])
      ])
    }
  },
  {
    accessorKey: 'teamName',
    header: 'Team',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h('img', {
          src: row.original.teamLogo,
          class: 'h-7 w-auto bg-black rounded-2xl p-1'
        }),
        h('span', { class: 'hidden md:block text-md', style: `color: #${row.original.teamColourCode}` }, row.original.teamName)
      ])
    }
  },
  {
    accessorKey: 'displayTimeFormatted',
    header: 'Race Time',
    class: 'text-base',
    cell: ({ row }) => h('span', { class: 'text-base text-highlighted font-semibold' }, row.original.displayTimeFormatted)
  },
  {
    accessorKey: 'racePoints',
    header: 'Points',
    class: 'text-base font-semibold text-highlighted',
    cell: ({ row }) => {
      let points: number | string = '-'

      if (row.original.racePoints != null) {
        points = row.original.racePoints
      } else {
        const pos = parseInt(row.original.positionNumber)
        if (pos >= 1 && pos <= 8) {
          points = 9 - pos
        }
      }

      return h('span', { class: 'text-base font-semibold text-highlighted' }, points)
    }
  },
  {
    accessorKey: 'raceLaps',
    header: 'Laps',
    class: 'text-base font-semibold text-highlighted',
    cell: ({ row }) => h('span', { class: 'text-base font-semibold text-highlighted' }, row.original.lapsCompleted)
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
