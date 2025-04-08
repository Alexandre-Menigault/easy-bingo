<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:text-blue-100">
          <BingoLogo :size="40" className="text-white" />
          <div>
            <h1 class="text-2xl font-bold">Easy Bingo</h1>
            <p class="text-sm">Create and play custom bingo cards</p>
          </div>
        </NuxtLink>
      </div>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import BingoLogo from '~/components/BingoLogo.vue'
</script> 