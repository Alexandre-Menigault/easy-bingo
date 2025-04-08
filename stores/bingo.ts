import { defineStore } from 'pinia'

export interface BingoCard {
  id: string
  name: string
  size: number
  cells: string[][]
}

export const useBingoStore = defineStore('bingo', {
  state: () => ({
    cards: [] as BingoCard[]
  }),

  actions: {
    initializeStore() {
      try {
        const savedCards = localStorage.getItem('bingoCards')
        if (savedCards) {
          this.cards = JSON.parse(savedCards)
        }
      } catch {
        // Ignore localStorage errors during SSR
      }
    },

    addCard(card: BingoCard) {
      this.cards.push(card)
      try {
        localStorage.setItem('bingoCards', JSON.stringify(this.cards))
      } catch {
        // Ignore localStorage errors during SSR
      }
    },

    removeCard(id: string) {
      this.cards = this.cards.filter(card => card.id !== id)
      try {
        localStorage.setItem('bingoCards', JSON.stringify(this.cards))
      } catch {
        // Ignore localStorage errors during SSR
      }
    },

    getCard(id: string) {
      return this.cards.find(card => card.id === id)
    }
  },

  hydrate(state) {
    state.cards = state.cards || []
  }
}) 