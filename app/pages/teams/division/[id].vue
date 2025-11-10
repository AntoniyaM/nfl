<script setup lang="ts">
import type { Team } from '~~/types'
import { useStore } from '~/stores'
import TeamCard from "~/components/TeamCard.vue";

const route = useRoute()
const toast = useToast()
const { getTeamsByDivisionId } = useStore()
const { state, asyncStatus } = getTeamsByDivisionId(route.params.id as string)

if (state.value.data?.error) {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'Failed to fetch division teams.',
  })
}

// Computed.
const loading = computed(() => asyncStatus.value === 'loading')

const teams = computed<Team[]>(() => {
  // Return teams sorted by standing in the division.
  const teams = state.value.data || []
  return [...teams].sort((a, b) => (parseInt(a.standingSummary) || 0) - (parseInt(b.standingSummary) || 0))
})
</script>

<template>
<!--  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <TeamCard v-for="team in teams" :team="team" />
  </div>-->
  <UContainer class="p-2">
    <ComingSoon
        title="Divisions Coming Soon"
        description="Real soon..."
    />
  </UContainer>
</template>
