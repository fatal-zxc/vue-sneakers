import axios from 'axios'

import { liteSneaker, sneaker } from '@/types'

const sneakersInstance = axios.create({
  baseURL: 'https://a901b666fee6fcd5.mokky.dev'
})

export const getAllSneakers = async () => {
  const { data } = await sneakersInstance.get<liteSneaker[]>('/items')
  return data
}

export const getFavorites = async () => {
  const { data } = await sneakersInstance.get<number[]>('/favorites')
  return data
}

export const updateFavorites = async (newFavorites: number[]) => {
  const { data } = await sneakersInstance.patch<number[]>('/favorites', newFavorites)
  return data
}

export const createOrder = async (items: sneaker[], totalAmount: number) => {
  const { data } = await sneakersInstance.post<{
    items: sneaker[]
    totalAmount: number
    id: number
  }>('/orders', { items, totalAmount })
  return data.id
}
