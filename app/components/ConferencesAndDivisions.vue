<script setup lang="ts">
const { getConferences } = useStore()
const { state, asyncStatus } = getConferences()

// Computed.
const conferences = computed(() => state.value.data)
const loadingConferences = computed(() => asyncStatus.value === 'loading')
</script>

<template>
  <div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
    <template v-if="loadingConferences">
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

        <div class="text-center grid grid-cols-1 gap-8 md:grid-cols-2">
          <NuxtLink
              :to="{ name: 'teams-division-id', params: { id: division.id } }"
              v-for="division in item.divisions"
              :key="division.id"
              class="p-4 rounded-md text-xl border border-[var(--ui-border-accented)] transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              :class="[item.id === 'afc' ? 'hover:text-afc hover:border-afc/50' : 'hover:text-nfc hover:border-nfc/50']"
          >
            {{ division.name }}
          </NuxtLink>
        </div>
      </UCard>
    </template>
  </div>
</template>
