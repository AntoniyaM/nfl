<script setup lang="ts">
import type { Team, Player } from '~~/types'
import { useStore } from '~/stores'

const route = useRoute()
const teamId = route.params.id as string
const { getTeamById, getPlayersByTeamId } = useStore()

const team = ref<Team | null>(null)
const players = ref<Player[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [teamData, playersData] = await Promise.all([getTeamById(teamId), getPlayersByTeamId(teamId)])

    team.value = teamData
    players.value = playersData
  } catch (error) {
    console.error('Failed to fetch team data:', error)
  } finally {
    loading.value = false
  }
})

// Group players by position for better display
const groupedPlayers = computed(() => {
  const positions = {
    Offense: ['QB', 'RB', 'FB', 'WR', 'TE', 'OL', 'C', 'G', 'T'],
    Defense: ['DL', 'DE', 'DT', 'NT', 'LB', 'OLB', 'ILB', 'MLB', 'CB', 'S', 'FS', 'SS'],
    'Special Teams': ['K', 'P', 'LS', 'KR', 'PR'],
  }

  const result = {
    Offense: [],
    Defense: [],
    'Special Teams': [],
    Other: [],
  }

  players.value.forEach((player) => {
    let assigned = false

    for (const [group, positionList] of Object.entries(positions)) {
      if (positionList.includes(player.position)) {
        result[group].push(player)
        assigned = true
        break
      }
    }

    if (!assigned) {
      result['Other'].push(player)
    }
  })

  return result
})
</script>

<template>
<!--  <div>
    <UButton icon="i-heroicons-arrow-left" variant="ghost" to="/teams" class="mb-4"> Back to Teams </UButton>

    <div v-if="loading">
      <UCard class="mb-4">
        <div class="flex justify-center p-8">Loading ...</div>
      </UCard>
    </div>

    <template v-else-if="team">
      <div class="mb-8">
        <UCard class="mb-6">
          <div class="flex flex-col items-center p-6 sm:flex-row">
            <div
              class="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 sm:mr-6 sm:mb-0 dark:bg-gray-800"
            >
              <img
                v-if="team.logoUrl"
                :src="team.logoUrl"
                :alt="`${team.name} logo`"
                class="max-h-full max-w-full p-1"
              />
              <span v-else class="text-2xl font-bold">{{ team.shortName }}</span>
            </div>

            <div class="text-center sm:text-left">
              <h1 class="mb-2 text-3xl font-bold">{{ team.location }} {{ team.name }}</h1>
              <div class="mb-2 text-gray-600 dark:text-gray-300">
                {{ team.conference }} {{ team.division }} Division
              </div>

              <div class="flex flex-wrap justify-center gap-4 sm:justify-start">
                <div v-if="team.establishedYear" class="text-sm">
                  <span class="font-medium">Established:</span> {{ team.establishedYear }}
                </div>
                <div v-if="team.stadiumName" class="text-sm">
                  <span class="font-medium">Stadium:</span> {{ team.stadiumName }}
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <h2 class="mb-4 text-2xl font-bold">Team Roster</h2>

        <template v-for="(playerGroup, groupName) in groupedPlayers" :key="groupName">
          <template v-if="playerGroup.length > 0">
            <h3 class="mt-6 mb-3 text-xl font-semibold">{{ groupName }}</h3>

            <UTable
              :rows="playerGroup"
              :columns="[
                { key: 'jerseyNumber', label: '#' },
                { key: 'name', label: 'Name' },
                { key: 'position', label: 'Pos' },
                { key: 'college', label: 'College' },
              ]"
            >
              <template #name-data="{ row }">
                <NuxtLink :to="`/players/${row.id}`" class="text-primary-500 hover:underline">
                  {{ row.firstName }} {{ row.lastName }}
                </NuxtLink>
              </template>
            </UTable>
          </template>
        </template>
      </div>
    </template>

    <template v-else>
      <UAlert title="Team Not Found" color="red" icon="i-heroicons-exclamation-triangle">
        The requested team could not be found.
      </UAlert>
    </template>
  </div>-->
  <UContainer class="p-2">
    <ComingSoon
        title="Team Details Coming Soon"
        description="I solemnly swear to provide team information, rosters, and statistics.. at some point."
    />
  </UContainer>
</template>
