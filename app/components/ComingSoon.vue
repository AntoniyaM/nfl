<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex items-center justify-center min-h-[500px]">
    <UCard class="max-w-2xl w-full">
      <div class="text-center py-12 px-6">
        <div class="mb-6">
          <UIcon
            name="i-heroicons-wrench-screwdriver"
            class="w-24 h-24 mx-auto text-primary-500"
          />
        </div>

        <h2 class="text-3xl font-bold mb-4">
          {{ title || 'Coming Soon' }}
        </h2>

        <p class="text-lg text-muted mb-8">
          {{ description || 'This feature is currently under development and will be available soon.' }}
        </p>

        <div class="flex items-center justify-center gap-3 text-sm text-muted mb-8">
          <UIcon name="i-lucide-clock" class="w-5 h-5" />
          <span>Check back later for updates.</span>
        </div>

        <div class="mt-8">
          <NuxtLink to="/">
            <UButton
              size="lg"
              icon="i-lucide-arrow-left"
              label="Back to Home"
            />
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>

