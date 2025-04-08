import { useBingoStore } from '~/stores/bingo'
 
export default defineNuxtPlugin(() => {
  const store = useBingoStore()
  store.initializeStore()
}) 