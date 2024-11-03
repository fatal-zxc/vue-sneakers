<script setup lang="ts">
import { ref } from 'vue'

import CartList from './CartList.vue'
import InfoBlock from './InfoBlock.vue'
import { useCartStore } from '@/store/cart'
import { createOrder } from '@/services/sneakers-service'

const { totalAmount, toggle, cart } = useCartStore()
const isLoading = ref(false)
const orderId = ref<number>()

const HandleCreateOrder = async () => {
  isLoading.value = true
  try {
    const id = await createOrder([...cart.value.values()], totalAmount.value)
    orderId.value = id
    cart.value.clear()
    totalAmount.value = 0
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div :onclick="toggle" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="flex flex-col justify-between bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <div class="">
      <h2 class="text-2xl font-bold mb-4">Корзина</h2>
      <CartList v-if="totalAmount !== 0" />
    </div>
    <InfoBlock
      v-if="orderId"
      class="h-full justify-center"
      @back="toggle"
      title="Корзина пустая"
      img-url="/order-success-icon.png"
      :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
    />
    <InfoBlock
      v-else-if="totalAmount === 0"
      class="h-full justify-center"
      @back="toggle"
      title="Корзина пустая"
      img-url="/package-icon.png"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
    />
    <div v-else class="flex flex-col gap-4">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed mb-1"></div>
        <b>{{ totalAmount }} руб.</b>
      </div>
      <button
        :disabled="totalAmount === 0 || isLoading"
        @click="HandleCreateOrder"
        class="bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 transition"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
