<script setup lang="ts">
const { topThreeData } = defineProps<{
  topThreeData: Record<array, any>
}>()
</script>

<template>
  <div v-for="driver in topThreeData" :key="driver.driverTLA" class="flex flex-row gap-2 items-center">
    <div>
      <p class="font-bold">{{driver.displayPosition}}</p>
    </div>
    <UUser
        :name="driver.driverFirstName + ' ' + driver.driverLastName"
        :description="driver.displayTime"
        :avatar="{ src: driver.driverImage}"
        size="lg"
    />
  </div>
</template>

<style scoped>

</style>