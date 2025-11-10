<script setup lang="ts">
import type { Team } from '~~/types'

defineProps<{
  team: Team
}>()
</script>

<template>
  <NuxtLink :to="`/teams/${team.id}`" class="block transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
    <div
      class="rounded-lg overflow-hidden shadow-md flex flex-col h-full"
      :style="`background-color: #${team.color}25; border: 2px solid #${team.color}`">
      <div class="p-4 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img :src="team.logoUrl" :alt="`${team.name} logo`" class="w-12 h-12 object-contain" />
          <div>
            <h3 class="text-lg font-bold" :style="`color: #${team.color}`">{{ team.name }}</h3>
            <p class="text-sm text-gray-700">{{ team.seasonSummary }}</p>
          </div>
        </div>
      </div>
      <div class="p-4 mt-auto border-t" :style="`border-color: #${team.color}50`">
        <p class="font-medium">{{ team.standingSummary }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Additional scoped styles if needed */
</style>
