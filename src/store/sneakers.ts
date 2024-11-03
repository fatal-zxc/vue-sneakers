import create from 'vue-zustand'

import { sneaker } from '@/types'

interface State {
  sneakers: sneaker[]
  favorites: number[]
  sortBy: 'По популярности' | 'Дешевые' | 'Дорогие'
  changeSort: (sort: 'По популярности' | 'Дешевые' | 'Дорогие') => void
  setFavorites: (favorites: number[]) => void
  setSneakers: (sneakers: sneaker[]) => void
}

export const useSneakersStore = create<State>((set) => ({
  sneakers: [],
  favorites: [],
  sortBy: 'По популярности',
  changeSort: (sortBy) => set({ sortBy }),
  setFavorites: (favorites) => set({ favorites }),
  setSneakers: (sneakers) => set({ sneakers })
}))
