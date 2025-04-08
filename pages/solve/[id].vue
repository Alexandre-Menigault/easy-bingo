<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-800">
          <span class="text-2xl">←</span>
        </NuxtLink>
        <h2 class="text-xl font-semibold">{{ card?.name }}</h2>
      </div>
      <button @click="downloadCard" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Download
      </button>
    </div>

    <div ref="gridRef">
      <BingoGrid
        v-if="card"
        :size="card.size"
        :cells="card.cells"
        :crossed-cells="crossedCells"
        :winning-cells="winningCells"
        @cell-click="onCellClick"
      />
    </div>

    <div v-if="hasWon" class="mt-4 p-4 bg-green-100 text-green-800 rounded">
      Bingo! You've won!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'nuxt/app'
import { useBingoStore } from '@/stores/bingo'
import { useScreenshot } from '@/composables/useScreenshot'
import { useSeo } from '~/composables/useSeo'

const route = useRoute()
const bingoStore = useBingoStore()
const { downloadImage } = useScreenshot()
const gridRef = ref<HTMLElement | null>(null)

const card = computed(() => bingoStore.getCard(route.params.id as string))
const crossedCells = ref(new Set<string>())
const winningCells = ref(new Set<string>())

// Add SEO meta tags with dynamic card name
useSeo({
  title: card.value ? `Play ${card.value.name}` : 'Play Bingo Card',
  description: card.value 
    ? `Play the "${card.value.name}" bingo card - a ${card.value.size}x${card.value.size} grid custom bingo game.` 
    : 'Play your custom bingo card online. Mark cells, track progress, and celebrate when you win!'
})

const hasWon = computed(() => {
  if (!card.value) return false

  const size = card.value.size
  const cells = crossedCells.value

  // Check rows
  for (let row = 0; row < size; row++) {
    let rowComplete = true
    for (let col = 0; col < size; col++) {
      if (!cells.has(`${row},${col}`)) {
        rowComplete = false
        break
      }
    }
    if (rowComplete) {
      // Add winning cells
      for (let col = 0; col < size; col++) {
        winningCells.value.add(`${row},${col}`)
      }
      return true
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    let colComplete = true
    for (let row = 0; row < size; row++) {
      if (!cells.has(`${row},${col}`)) {
        colComplete = false
        break
      }
    }
    if (colComplete) {
      // Add winning cells
      for (let row = 0; row < size; row++) {
        winningCells.value.add(`${row},${col}`)
      }
      return true
    }
  }

  // Check diagonals
  let diag1Complete = true
  let diag2Complete = true
  for (let i = 0; i < size; i++) {
    if (!cells.has(`${i},${i}`)) diag1Complete = false
    if (!cells.has(`${i},${size - 1 - i}`)) diag2Complete = false
  }

  if (diag1Complete) {
    // Add winning cells
    for (let i = 0; i < size; i++) {
      winningCells.value.add(`${i},${i}`)
    }
    return true
  }

  if (diag2Complete) {
    // Add winning cells
    for (let i = 0; i < size; i++) {
      winningCells.value.add(`${i},${size - 1 - i}`)
    }
    return true
  }

  return false
})

const onCellClick = (row: number, col: number) => {
  const cellKey = `${row},${col}`
  if (crossedCells.value.has(cellKey)) {
    crossedCells.value.delete(cellKey)
  } else {
    crossedCells.value.add(cellKey)
  }
}

const downloadCard = async () => {
  if (!gridRef.value || !card.value) {
    return
  }

  try {
    await downloadImage(gridRef.value, `${card.value.name}-bingo`)
  } catch (error) {
    console.error('Failed to download bingo card:', error)
    // You might want to show a user-friendly error message here
  }
}
</script> 