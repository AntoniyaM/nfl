<script setup lang="ts">
const colorMode = useColorMode()

// Computed.
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(darkMode) {
    colorMode.preference = darkMode ? 'dark' : 'light'
  },
})
</script>

<template>
  <div class="bg-slate-50 dark:bg-slate-900">
    <UContainer class="flex min-h-screen flex-col">
      <header class="grid grid-cols-3 gap-4 border-b border-gray-200 py-6 dark:border-gray-800">
        <NuxtLink to="/" class="flex items-center gap-2 font-mono text-2xl font-bold text-gray-800 dark:text-white">
          <UIcon name="i-circum-football" class="size-10 text-amber-800" />
          NFL Season Stats
        </NuxtLink>
        <nav class="flex items-center gap-4 justify-self-center">
          <NuxtLink to="/" class="hover:text-primary-500 text-gray-700 dark:text-gray-300">Home</NuxtLink>
          <NuxtLink to="/teams" class="hover:text-primary-500 text-gray-700 dark:text-gray-300">Teams</NuxtLink>
          <NuxtLink to="/players" class="hover:text-primary-500 text-gray-700 dark:text-gray-300">Players</NuxtLink>
        </nav>
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            class="cursor-pointer justify-self-end p-2"
            @click="isDark = !isDark"
          />
        </ClientOnly>
      </header>

      <main class="py-8">
        <slot />
      </main>

      <footer
        class="mt-auto border-t border-gray-200 py-6 text-center text-gray-500 dark:border-gray-800 dark:text-gray-400"
      >
        <p>© {{ new Date().getFullYear() }} NFL Season Stats</p>
      </footer>
    </UContainer>
  </div>
</template>
