import create from 'vue-zustand'

import { sneaker } from '@/types'

interface State {
  totalAmount: number
  open: boolean
  cart: Map<number, sneaker>
  toggle: () => void
  setTotalAmount: (num: number) => void
}

export const useCartStore = create<State>((set) => ({
  totalAmount: 0,
  open: false,
  cart: new Map<number, sneaker>(),
  toggle: () => set((state) => ({ open: !state.open })),
  setTotalAmount: (num) => set((state) => ({ totalAmount: state.totalAmount + num }))
}))
