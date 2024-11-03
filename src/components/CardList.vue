<script setup lang="ts">
const props = defineProps<{
  favorited?: boolean
}>()

import { onMounted, ref, watch } from 'vue'

import CardItem from './CardItem.vue'
import { sneaker } from '@/types'
import { createSneakers } from '@/utils'
import { useCartStore } from '@/store/cart'
import { updateFavorites } from '@/services/sneakers-service'
import useGetSneakers from '@/hooks/useGetSneakers'
import { useSneakersStore } from '@/store/sneakers'

const {
  sneakers: sneakersStore,
  favorites,
  setFavorites,
  setSneakers,
  sortBy,
  changeSort
} = useSneakersStore()

const items = ref<sneaker[]>(
  props.favorited
    ? sneakersStore.value.filter((sneaker) => sneaker.isFavorite)
    : sneakersStore.value
)
const searchQuery = ref('')

const { cart, setTotalAmount } = useCartStore()
const { isLoading } = useGetSneakers()

watch(isLoading, () => {
  items.value = sneakersStore.value
})

onMounted(() => {
  if (sortBy.value === 'Дешевые') {
    items.value.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'Дорогие') {
    items.value.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'По популярности') {
    items.value.sort((a, b) => a.id - b.id)
  }
})

watch(sortBy, (sort) => {
  if (sort === 'Дешевые') {
    items.value.sort((a, b) => a.price - b.price)
  } else if (sort === 'Дорогие') {
    items.value.sort((a, b) => b.price - a.price)
  } else if (sort === 'По популярности') {
    items.value.sort((a, b) => a.id - b.id)
  }
})

watch(searchQuery, (searchQuery) => {
  items.value = props.favorited
    ? sneakersStore.value.filter((sneaker) => sneaker.isFavorite)
    : sneakersStore.value
  if (searchQuery !== '') {
    items.value = items.value?.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    })
  }
})

const sortHandler = (e: any) => {
  changeSort.value(e.target.value)
}

const searchHandler = (e: any) => {
  searchQuery.value = e.target.value
}

const addHandler = (item: sneaker) => {
  if (cart.value.has(item.id)) {
    cart.value.delete(item.id)
    setTotalAmount.value(-item.price)
  } else {
    cart.value.set(item.id, item)
    setTotalAmount.value(item.price)
  }
}

const favoriteHandler = async (id: number) => {
  try {
    const includes = favorites.value.includes(id)
    const newFavorites = await updateFavorites(
      includes ? favorites.value.filter((num) => num !== id) : [...favorites.value, id]
    )
    setFavorites.value(newFavorites)

    const newStoreItems = createSneakers(newFavorites, sneakersStore.value)
    const newItems = createSneakers(newFavorites, items.value)

    setSneakers.value(newStoreItems)
    items.value = props.favorited ? newItems.filter((sneaker) => sneaker.isFavorite) : newItems
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <section class="p-10">
    <div class="flex justify-between">
      <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
      <div class="flex gap-4">
        <select
          @change="sortHandler"
          :value="sortBy"
          class="py-2 px-3 border rounded-md outline-none h-[45px]"
        >
          <option>По популярности</option>
          <option>Дешевые</option>
          <option>Дорогие</option>
        </select>
        <div class="relative">
          <img class="absolute left-[18px] top-[15px]" src="/search.svg" />
          <input
            @input="searchHandler"
            class="border border-gray-200 rounded-md py-2 pl-[46px] pr-1 h-[45px] outline-none focus:border-gray-400"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <div v-auto-animate class="grid grid-cols-4 gap-5">
      <CardItem
        v-for="item in items"
        v-bind:key="item.id"
        :id="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-favorite="item.isFavorite"
        :is-added="cart.has(item.id)"
        @onClickAdd="() => addHandler(item)"
        @onClickFavorite="favoriteHandler"
      />
    </div>
  </section>
</template>

<style lang="scss"></style>
