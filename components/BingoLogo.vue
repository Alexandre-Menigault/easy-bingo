<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <!-- Background square -->
    <rect width="32" height="32" rx="6" :fill="bgColor" />
    
    <!-- Grid lines -->
    <line x1="11" y1="6" x2="11" y2="26" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" />
    <line x1="21" y1="6" x2="21" y2="26" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" />
    <line x1="6" y1="11" x2="26" y2="11" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" />
    <line x1="6" y1="21" x2="26" y2="21" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" />
    
    <!-- Letter B -->
    <path
      d="M12 8h6c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-6v4h6c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-6V8z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  bgColor?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 32,
  bgColor: '#2563eb', // blue-600
  className: ''
})
</script> 