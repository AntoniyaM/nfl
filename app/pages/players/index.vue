<script setup lang="ts">
import type { Player } from '~~/types'
import { useStore } from '~/stores'

const { getPlayers } = useStore()
const { state, asyncStatus } = getPlayers()
const searchQuery = ref('')

// Computed.
const loading = computed(() => asyncStatus.value === 'loading')

const players = computed<Player[]>(() => {
  return [...(state.value.data || [])].sort((a, b) => a.lastName - b.lastName)
})

const filteredPlayers = computed(() => {
  // Todo: Paginaion?
  if (!searchQuery.value) return players.value.slice(0, 100)

  const query = searchQuery.value.toLowerCase()
  return players.value.filter((player) => {
    return (
      player.firstName.toLowerCase().includes(query) ||
      player.lastName.toLowerCase().includes(query) ||
      player.position.toLowerCase().includes(query) ||
      (player.team?.name || '').toLowerCase().includes(query)
    )
  })
})
</script>

<template>
  <div>
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-3xl font-bold">NFL Players</h1>
      <p class="text-muted">Browse all NFL players</p>
    </div>

    <div v-if="loading">
      <UCard class="mb-4">
        <div class="flex justify-center p-8">Loading ...</div>
      </UCard>
    </div>

    <template v-else>
<!--      <div class="mb-6">
        <UInput
          v-model="searchQuery"
          placeholder="Search players by name, position, or team..."
          icon="i-heroicons-magnifying-glass"
          size="lg"
          class="w-full"
        />
      </div>

      <UCard>
        <UTable
          :data="filteredPlayers"
          :columns="[
            { accessorKey: 'jersey', header: '#' },
            { accessorKey: 'fullName', header: 'Name' },
            { accessorKey: 'position', header: 'Position' },
            { accessorKey: 'team', header: 'Team' },
          ]"
          :sort="{ column: 'fullName', direction: 'asc' }"
          :loading="loading"
        >
          <template #fullName-data="{ row }">
            <NuxtLink :to="`/players/${row.id}`" class="text-primary-500 hover:underline">
              {{ row.firstName }} {{ row.lastName }}
            </NuxtLink>
          </template>

          <template #team-data="{ row }">
            <NuxtLink v-if="row.team" :to="`/teams/${row.teamId}`" class="text-primary-500 hover:underline">
              {{ row.team.location }} {{ row.team.name }}
            </NuxtLink>
            <span v-else>-</span>
          </template>

          <template #empty-state>
            <div class="py-8 text-center">
              <UIcon name="i-heroicons-user-group" class="mb-2 text-gray-400 dark:text-gray-600" size="xl" />
              <p v-if="searchQuery" class="text-gray-500 dark:text-gray-400">
                No players found matching "{{ searchQuery }}"
              </p>
              <p v-else class="text-gray-500 dark:text-gray-400">No players available</p>
            </div>
          </template>
        </UTable>
      </UCard>-->
      <UContainer class="p-2">
        <ComingSoon
            title="Players Database Coming Soon"
            description="I solemnly swear to provide a comprehensive database of all NFL players with stats and profiles.. soon."
        />
      </UContainer>
    </template>
  </div>
</template>
