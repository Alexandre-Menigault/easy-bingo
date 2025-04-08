<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Your Bingo Cards</h2>
      <NuxtLink to="/editor" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create New Card
      </NuxtLink>
    </div>

    <div v-if="bingoStore.cards.length === 0" class="text-center py-8">
      <p class="text-gray-500">No bingo cards yet. Create your first one!</p>
    </div>

    <div v-else >
      <div class="saved-cards-container flex flex-wrap gap-4">
        <div v-for="card in bingoStore.cards" :key="card.id" class="card flex-1 lg:min-w-[30%] lg:max-w-[30%] md:min-w-[48%] md:max-w-[48%] sm:min-w-[100%] sm:max-w-[100%] bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">{{ card.name }}</h3>
          <p class="text-sm text-gray-500 mb-4">{{ card.size }}x{{ card.size }} grid</p>
          <div class="flex gap-2">
            <NuxtLink :to="`/solve/${card.id}`" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Solve
            </NuxtLink>
            <button @click="deleteCard(card.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </div>

      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBingoStore } from '~/stores/bingo'
import { useSeo } from '~/composables/useSeo'

const bingoStore = useBingoStore()

// Add SEO meta tags
useSeo({
  title: 'Create Custom Bingo Cards Online',
  description: 'Create and customize bingo cards for your classroom, party, or event. Easy to use, free, and no registration required. Start making your bingo cards now!'
})

const deleteCard = (id: string) => {
  if (confirm('Are you sure you want to delete this bingo card?')) {
    bingoStore.removeCard(id)
  }
}
</script> 
