<template>
  <div class="grid gap-1 w-full max-w-2xl mx-auto" :style="{ gridTemplateColumns: `repeat(${size}, 1fr)` }">
    <BingoCell
      v-for="(cell, index) in cells.flat()"
      :key="index"
      :content="cells[Math.floor(index / size)][index % size]"
      @update:content="updateCell(Math.floor(index / size), index % size, $event)"
      :is-center="isCenterCell(Math.floor(index / size), index % size)"
      :is-selected="isSelected(Math.floor(index / size), index % size)"
      :is-crossed="isCrossed(Math.floor(index / size), index % size)"
      :is-winning="isWinningCell(Math.floor(index / size), index % size)"
      :editable="editable"
      @click="onCellClick(Math.floor(index / size), index % size)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size: number
  cells: string[][]
  selectedCell?: [number, number] | null
  crossedCells?: Set<string>
  winningCells?: Set<string>
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectedCell: null,
  crossedCells: () => new Set(),
  winningCells: () => new Set(),
  editable: false
})

const emit = defineEmits<{
  (e: 'cell-click', row: number, col: number): void
  (e: 'update:cells', value: string[][]): void
}>()

const isCenterCell = (row: number, col: number) => {
  return row === Math.floor(props.size / 2) && col === Math.floor(props.size / 2)
}

const isSelected = (row: number, col: number) => {
  return props.selectedCell?.[0] === row && props.selectedCell?.[1] === col
}

const isCrossed = (row: number, col: number) => {
  return props.crossedCells.has(`${row},${col}`)
}

const isWinningCell = (row: number, col: number) => {
  return props.winningCells.has(`${row},${col}`)
}

const onCellClick = (row: number, col: number) => {
  if (props.editable || props.crossedCells) {
    emit('cell-click', row, col)
  }
}

const updateCell = (row: number, col: number, value: string) => {
  const newCells = [...props.cells]
  newCells[row][col] = value
  emit('update:cells', newCells)
}
</script> 