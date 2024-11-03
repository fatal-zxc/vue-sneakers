export interface liteSneaker {
  id: number,
  title: string,
  price: number,
  imageUrl: string
}

export interface sneaker extends liteSneaker {
  isFavorite: boolean,
  isAdded: boolean
}
