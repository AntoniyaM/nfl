<script setup lang="ts">
import type { Game } from '~~/types'

const { getSchedule } = useStore()
const { state, asyncStatus } = getSchedule()

// Everything below is formatted in the viewer's timezone, which the server only knows
// once the browser has recorded it in a cookie.
const timeZone = useViewerTimeZone()

// Computed.
const schedule = computed(() => state.value.data)
const loadingSchedule = computed(() => asyncStatus.value === 'loading')
const loading = computed(() => loadingSchedule.value || !timeZone.value)

// Games grouped by date, in the viewer's own timezone.
const eventsByDate = computed(() => {
  const zone = timeZone.value

  if (!schedule.value?.events || !zone) return {}

  const sortedEvents = [...schedule.value.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const grouped: Record<string, Game[]> = {}

  sortedEvents.forEach(event => {
    const date = new Date(event.date)
    const dateKey = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: zone,
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
    timeZoneName: 'short',
    timeZone: timeZone.value ?? undefined,
  })
}
</script>

<template>
  <div class="mb-12">
    <div class="mb-6 text-center">
      <h2 class="mb-2 text-3xl font-bold">
        <template v-if="!loadingSchedule && schedule">
          <span class="relative inline-block">
            Week {{ schedule.week }} Schedule
            <UBadge v-if="schedule.preSeason" color="warning" variant="soft" size="md" class="absolute -top-4 rotate-10">
              Preseason
            </UBadge>
          </span>
        </template>
        <template v-else>
          Schedule
        </template>
      </h2>
      <p v-if="!loadingSchedule && schedule" class="text-lg text-muted">
        Season {{ schedule.season }}
      </p>
    </div>

    <template v-if="loading">
      <div class="flex flex-col gap-4">
        <USkeleton class="h-8 w-64" />
        <div class="grid gap-4">
          <USkeleton v-for="i in 4" :key="i" class="h-24 w-full" />
        </div>
      </div>
    </template>

    <template v-else-if="schedule">
      <div class="grid gap-8">
        <div v-for="(events, date) in eventsByDate" :key="date">
          <h3 class="mb-4 text-xl font-semibold pb-2">
            {{ date }}
          </h3>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UCard
              v-for="event in events"
              :key="event.id"
            >
              <div>
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

                <div>
                  <!-- Teams. -->
                  <div
                    v-for="competitor in event.competitors"
                    :key="competitor.teamLogo.alt"
                    class="flex items-center justify-between p-2 rounded-md"
                  >
                    <div class="flex items-center gap-2">
                      <img
                        :src="competitor.teamLogo.url"
                        :alt="competitor.teamLogo.alt"
                        class="w-10 h-10 object-contain"
                      />
                      <span class="text-sm font-semibold truncate">
                        {{ competitor.teamLogo.alt }}
                      </span>
                    </div>
                    <span
                      class="text-lg font-bold min-w-[2rem] text-center"
                      :class="competitor.winner ? 'text-green-600 dark:text-green-400' : ''"
                    >
                      {{ competitor.score }}
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

