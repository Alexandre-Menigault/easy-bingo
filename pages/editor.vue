<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-800">
          <span class="text-2xl">←</span>
        </NuxtLink>
        <h2 class="text-xl font-semibold">Bingo Card Editor</h2>
      </div>
      <div class="flex gap-4">
        <button @click="shuffleCells" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Shuffle
        </button>
        <button @click="previewCard" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Preview
        </button>
        <button @click="saveCard" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save
        </button>
      </div>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Grid Size</label>
      <select v-model="size" class="border rounded p-2">
        <option v-for="n in 6" :key="n" :value="n * 2 + 1">{{ n * 2 + 1 }}x{{ n * 2 + 1 }}</option>
      </select>
    </div>

    <div ref="gridRef">
      <BingoGrid
        :size="size"
        v-model:cells="cells"
        :selected-cell="selectedCell"
        :editable="true"
        @cell-click="onCellClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBingoStore } from '~/stores/bingo'
import { useScreenshot } from '~/composables/useScreenshot'
import { useSeo } from '~/composables/useSeo'
import { v4 as uuidv4 } from 'uuid'
import { navigateTo } from 'nuxt/app'

// Add SEO meta tags
useSeo({
  title: 'Bingo Card Editor',
  description: 'Create your custom bingo card. Choose grid size, add your content, and customize each cell. Easy to use editor with preview and save options.'
})

const bingoStore = useBingoStore()
const { openPreview } = useScreenshot()
const gridRef = ref<HTMLElement | null>(null)
const size = ref(3)
const cells = ref<string[][]>([])
const selectedCell = ref<[number, number] | null>(null)

const initializeCells = () => {
  cells.value = Array(size.value).fill(null).map(() => 
    Array(size.value).fill('')
  )
}

watch(size, () => {
  initializeCells()
}, { immediate: true })

const onCellClick = (row: number, col: number) => {
  selectedCell.value = selectedCell.value?.[0] === row && selectedCell.value?.[1] === col
    ? null
    : [row, col]
}

const shuffleCells = () => {
  const flatCells = cells.value.flat()
  const centerIndex = Math.floor(size.value * size.value / 2)
  const centerValue = flatCells[centerIndex]
  
  // Shuffle all cells except the center
  for (let i = flatCells.length - 1; i > 0; i--) {
    if (i === centerIndex) continue
    const j = Math.floor(Math.random() * (i + 1))
    if (j === centerIndex) continue
    ;[flatCells[i], flatCells[j]] = [flatCells[j], flatCells[i]]
  }
  
  // Reconstruct the 2D array
  cells.value = []
  for (let i = 0; i < size.value; i++) {
    cells.value.push(flatCells.slice(i * size.value, (i + 1) * size.value))
  }
  
  // Restore center value
  const centerRow = Math.floor(size.value / 2)
  const centerCol = Math.floor(size.value / 2)
  cells.value[centerRow][centerCol] = centerValue
}

const previewCard = async () => {
  if (gridRef.value) {
    await openPreview(gridRef.value)
  }
}

const saveCard = () => {
  const name = prompt('Enter a name for your bingo card:')
  if (name) {
    bingoStore.addCard({
      id: uuidv4(),
      name,
      size: size.value,
      cells: cells.value
    })
    navigateTo('/')
  }
}
</script> 