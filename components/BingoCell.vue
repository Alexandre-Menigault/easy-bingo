<template>
  <div
    class="relative aspect-square border border-gray-300 p-2"
    :class="{
      'bg-gray-100': isCenter,
      'border-blue-500': isSelected,
      'bg-red-100': isCrossed,
      'bg-green-100': isWinning
    }"
    @click="onClick"
  >
    <div v-if="!isEditing" class="absolute inset-0 flex items-center justify-center z-10">
      <span class="text-center text-sm md:text-base">{{ content }}</span>
    </div>
    <input
      v-else
      v-model="editableContent"
      type="text"
      class="absolute inset-0 w-full h-full text-center bg-transparent focus:outline-none text-sm md:text-base z-10"
      @blur="finishEditing"
      @keyup.enter="finishEditing"
      ref="inputRef"
    >
    <div v-if="isCrossed" class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="10" y1="10" x2="90" y2="90" stroke="rgb(239 68 68)" stroke-width="8" />
        <line x1="90" y1="10" x2="10" y2="90" stroke="rgb(239 68 68)" stroke-width="8" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  content: string
  isCenter?: boolean
  isSelected?: boolean
  isCrossed?: boolean
  isWinning?: boolean
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCenter: false,
  isSelected: false,
  isCrossed: false,
  isWinning: false,
  editable: false
})

const emit = defineEmits<{
  (e: 'update:content', value: string): void
  (e: 'click'): void
}>()

const isEditing = ref(false)
const editableContent = ref(props.content)
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.content, (newValue) => {
  editableContent.value = newValue
})

const onClick = () => {
  emit('click')
  if (props.editable && !isEditing.value) {
    isEditing.value = true
    // Wait for input to be rendered
    setTimeout(() => {
      inputRef.value?.focus()
    })
  }
}

const finishEditing = () => {
  isEditing.value = false
  if (editableContent.value !== props.content) {
    emit('update:content', editableContent.value)
  }
}
</script> 