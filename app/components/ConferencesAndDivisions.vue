<script setup lang="ts">
import type { Team } from '~~/types'

const { getConferences, getTeams } = useStore()
const { state, asyncStatus } = getConferences()
const { state: teams, asyncStatus: teamsStatus } = getTeams()

// Computed.
const conferences = computed(() => state.value.data)
const loading = computed(() => asyncStatus.value === 'loading' || teamsStatus.value === 'loading')

// Teams grouped by conference and division.
const groupedTeams = computed(() => {
  const grouped: Record<string, Record<string, Team[]>> = {}

  conferences.value?.forEach((conf) => {
    if (!grouped[conf.id]) {
      grouped[conf.id] = {}
    }
    conf.divisions.forEach((division: any) => {
      grouped[conf.id]![division.id] = teams.value.data!.filter((team: Team) => team.conference === conf.id && team.division === division.id)
    })
  })

  return grouped
})
</script>

<template>
  <div class="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
    <template v-if="loading">
      <div class="flex flex-col gap-4">
        <USkeleton class="h-4 w-full" />
        <div class="flex gap-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
        <div class="flex gap-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <USkeleton class="h-4 w-full" />
        <div class="flex gap-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
        <div class="flex gap-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
      </div>
    </template>
    <template v-else>
      <UCard v-for="item in conferences" :key="item.id">
        <template #header>
          <div
              class="rounded-md text-3xl flex items-center justify-center gap-2 p-4 font-mono font-bold"
              :class="[item.id === 'afc' ? 'bg-afc/15' : 'bg-nfc/15']"
          >
            <UIcon name="i-lucide-lab-football-helmet" :class="`text-${item.id}`" />
            {{ item.abbreviation }}
          </div>
        </template>

        <div v-for="division in item.divisions" :key="division.id">
          <h3
              class="mb-3 text-lg font-bold border-b pb-3"
              :class="[item.id === 'afc' ? 'text-afc border-afc/30' : 'text-nfc border-nfc/30']"
          >
            {{ division.name }}
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <TeamCard
                v-for="team in groupedTeams[item.id]?.[division.id!]"
                :key="team.id"
                :team="team"
            />
          </div>
        </div>
      </UCard>
    </template>
  </div>
</template>
