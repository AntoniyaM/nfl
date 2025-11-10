<script setup lang="ts">
import type { Player } from '~~/types'
import { useStore } from '~/stores'

const route = useRoute()
const playerId = route.params.id as string
const { getPlayerById } = useStore()
const player = ref<Player | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    player.value = getPlayerById(playerId)
  } catch (error) {
    console.error('Failed to fetch player data:', error)
  } finally {
    loading.value = false
  }
})

// Format date of birth in a readable format.
const formattedDateOfBirth = computed(() => {
  if (!player.value?.dateOfBirth) return '-'

  try {
    const date = new Date(player.value.dateOfBirth)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch (e) {
    return player.value.dateOfBirth
  }
})

// Calculate age based on date of birth
const playerAge = computed(() => {
  if (!player.value?.dateOfBirth) return null

  try {
    const birthDate = new Date(player.value.dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  } catch (e) {
    return null
  }
})
</script>

<template>
  <div>
    <UButton icon="i-heroicons-arrow-left" variant="ghost" to="/players" class="mb-4">Back to Players</UButton>

    <div v-if="loading">
      <UCard class="mb-4">
        <div class="flex justify-center p-8">Loading ...</div>
      </UCard>
    </div>
    <UContainer class="p-2">
      <ComingSoon
          title="Player Profile Coming Soon"
          description="We're working on bringing you detailed player profiles with stats, career highlights, and more. Stay tuned!"
      />
    </UContainer>

<!--    <template v-else-if="player">
      <UCard class="mb-6">
        <div class="flex flex-col p-6 md:flex-row">
          <div class="mb-6 flex justify-center md:mb-0 md:w-1/3">
            <div class="flex h-56 w-56 items-center justify-center rounded-lg">
              <img
                v-if="player.imageUrl"
                :src="player.imageUrl"
                :alt="`Photo of ${player.firstName} ${player.lastName}`"
                class="max-h-full max-w-full rounded-lg object-cover"
              />
              <div v-else class="flex flex-col items-center justify-center text-muted">
                <UIcon name="i-heroicons-user" size="2xl" />
                <span class="mt-2 text-sm">No image available</span>
              </div>
            </div>
          </div>

          <div class="md:w-2/3 md:pl-6">
            <div class="mb-4 flex items-center">
              <h1 class="text-3xl font-bold">{{ player.firstName }} {{ player.lastName }}</h1>
              <UBadge color="primary" class="ml-3 text-lg">#{{ player.jerseyNumber }}</UBadge>
            </div>

            <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span class="text-gray-500 dark:text-gray-400">Position</span>
                <div class="font-medium">{{ player.position }}</div>
              </div>

              <div v-if="player.team">
                <span class="text-gray-500 dark:text-gray-400">Team</span>
                <div class="font-medium">
                  <NuxtLink :to="`/teams/${player.teamId}`" class="text-primary-500 hover:underline">
                    {{ player.team.location }} {{ player.team.name }}
                  </NuxtLink>
                </div>
              </div>

              <div v-if="player.height">
                <span class="text-gray-500 dark:text-gray-400">Height</span>
                <div class="font-medium">{{ player.height }}</div>
              </div>

              <div v-if="player.weight">
                <span class="text-gray-500 dark:text-gray-400">Weight</span>
                <div class="font-medium">{{ player.weight }} lbs</div>
              </div>

              <div v-if="player.dateOfBirth">
                <span class="text-gray-500 dark:text-gray-400">Date of Birth</span>
                <div class="font-medium">
                  {{ formattedDateOfBirth }}
                  <span v-if="playerAge" class="text-sm text-gray-500">({{ playerAge }} years)</span>
                </div>
              </div>

              <div v-if="player.college">
                <span class="text-gray-500 dark:text-gray-400">College</span>
                <div class="font-medium">{{ player.college }}</div>
              </div>

              <div v-if="player.rookieYear">
                <span class="text-gray-500 dark:text-gray-400">Rookie Year</span>
                <div class="font-medium">{{ player.rookieYear }}</div>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      &lt;!&ndash; This section could be extended to include player stats, career highlights, etc. &ndash;&gt;
    </template>

    <template v-else>
      <UAlert title="Player Not Found" color="red" icon="i-heroicons-exclamation-triangle">
        The requested player could not be found.
      </UAlert>
    </template>-->
  </div>
</template>
