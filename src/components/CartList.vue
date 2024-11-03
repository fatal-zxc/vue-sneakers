<script setup lang="ts">
import { sneaker as Isneaker } from '@/types'
import CartItem from './CartItem.vue'
import { useCartStore } from '@/store/cart'

const { cart, setTotalAmount } = useCartStore()

const deleteItem = (sneaker: Isneaker) => {
  cart.value.delete(sneaker.id)
  setTotalAmount.value(-sneaker.price)
}
</script>

<template>
  <div v-auto-animate class="flex scrollbar overflow-y-auto max-h-[600px] flex-col flex-1 gap-4">
    <CartItem
      v-for="sneaker in cart.values()"
      v-bind:key="sneaker.id"
      @delete-item="() => deleteItem(sneaker)"
      :image-url="sneaker.imageUrl"
      :title="sneaker.title"
      :price="sneaker.price"
    />
  </div>
</template>
