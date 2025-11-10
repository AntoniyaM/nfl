<script setup lang="ts">
import type { Game } from '~~/types'

const { getSchedule } = useStore()
const { state, asyncStatus } = getSchedule()

// Computed.
const schedule = computed(() => state.value.data)
const loadingSchedule = computed(() => asyncStatus.value === 'loading')

// Games grouped by date.
const eventsByDate = computed(() => {
  if (!schedule.value?.events) return {}

  const sortedEvents = [...schedule.value.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const grouped: Record<string, Game[]> = {}

  sortedEvents.forEach(event => {
    const date = new Date(event.date)
    const dateKey = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })

    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(event)
  })

  return grouped
})

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  })
}
</script>

<template>
  <div class="mb-12">
    <div class="mb-6 text-center">
      <h2 class="mb-2 text-3xl font-bold">
        <template v-if="!loadingSchedule && schedule">
          Week {{ schedule.week }} Schedule
        </template>
        <template v-else>
          Schedule
        </template>
      </h2>
      <p v-if="!loadingSchedule && schedule" class="text-lg text-muted">
        Season {{ schedule.season }}
      </p>
    </div>

    <template v-if="loadingSchedule">
      <div class="flex flex-col gap-4">
        <USkeleton class="h-8 w-64" />
        <div class="grid gap-4">
          <USkeleton v-for="i in 4" :key="i" class="h-24 w-full" />
        </div>
      </div>
    </template>

    <template v-else-if="schedule">
      <div class="space-y-8">
        <div v-for="(events, date) in eventsByDate" :key="date">
          <h3 class="mb-4 text-xl font-semibold pb-2">
            {{ date }}
          </h3>

          <!-- Todo: add hover:shadow-xl hover:-translate-y-1 or similar when you've added game details to the API. -->
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UCard
              v-for="event in events"
              :key="event.id"
              class="transition-all duration-300"
            >
              <div class="space-y-3">
                <div class="text-center">
                  <p class="text-sm font-medium text-muted">
                    {{ formatTime(event.date) }}
                  </p>
                  <p v-if="event.completed" class="text-xs font-semibold text-green-600 dark:text-green-400">
                    FINAL
                  </p>
                  <p v-else class="text-xs font-semibold text-sky-500">
                    UPCOMING
                  </p>
                </div>

                <div class="space-y-3">
                  <!-- Team 1. -->
                  <div v-if="event.competitors[1]" class="flex items-center justify-between p-2 rounded-md">
                    <div class="flex items-center space-x-3">
                      <img
                        :src="event.competitors[1].teamLogo.url"
                        :alt="event.competitors[1].teamLogo.alt"
                        class="w-10 h-10 object-contain"
                      />
                      <span class="text-sm font-semibold truncate">
                        {{ event.competitors[1].teamLogo.alt }}
                      </span>
                    </div>
                    <span
                      class="text-lg font-bold min-w-[2rem] text-center"
                      :class="event.competitors[1].winner ? 'text-green-600 dark:text-green-400' : ''"
                    >
                      {{ event.competitors[1].score }}
                    </span>
                  </div>

                  <!-- Team 2. -->
                  <div v-if="event.competitors[0]" class="flex items-center justify-between p-2 rounded-md">
                    <div class="flex items-center space-x-3">
                      <img
                        :src="event.competitors[0].teamLogo.url"
                        :alt="event.competitors[0].teamLogo.alt"
                        class="w-10 h-10 object-contain"
                      />
                      <span class="text-sm font-semibold truncate">
                        {{ event.competitors[0].teamLogo.alt }}
                      </span>
                    </div>
                    <span
                      class="text-lg font-bold min-w-[2rem] text-center"
                      :class="event.competitors[0].winner ? 'text-green-600 dark:text-green-400' : ''"
                    >
                      {{ event.competitors[0].score }}
                    </span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

