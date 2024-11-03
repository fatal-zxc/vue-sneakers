import { liteSneaker, sneaker } from './types'

export const createSneakers = (favorites: number[], data: liteSneaker[] | sneaker[]): sneaker[] => {
  return data.map((item) => {
    const isFavorite = !!favorites.find((fav) => fav === item.id)
    return { ...item, isFavorite, isAdded: false }
  })
}
