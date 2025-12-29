<script setup lang="ts">
import type { Team } from '~~/types'

defineProps<{
  team: Team
}>()
</script>

<template>
  <NuxtLink :to="`/teams/${team.id}`" class="block rounded-lg border border-muted overflow-hidden duration-300 hover:shadow-xl">
    <div
      class="flex flex-col h-full p-4 gap-4"
      :style="`background-color: #${team.color}25; border: 2px solid #${team.color}`">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 min-h-20">
          <img :src="team.logoUrl" :alt="`${team.name} logo`" class="w-12 h-12 object-contain" />
          <div>
            <h3 class="text-lg font-bold" :style="`color: #${team.color}`">{{ team.name }}</h3>
            <p class="text-sm text-muted">{{ team.seasonSummary }}</p>
          </div>
        </div>
      </div>
      <div class="mt-auto border-t border-muted pt-4">
        <p class="font-medium">{{ team.standingSummary }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Additional scoped styles if needed */
</style>
