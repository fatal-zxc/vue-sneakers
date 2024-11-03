<script setup lang="ts">
import CartDrawer from './components/CartDrawer.vue'
import AppHeader from './components/AppHeader.vue'
import { useCartStore } from './store/cart'

const { open } = useCartStore()
</script>

<template>
  <CartDrawer v-if="open" />
  <main class="w-4/5 mx-auto bg-white rounded-xl shadow-xl mt-10">
    <AppHeader />
    <router-view />
  </main>
</template>

<style></style>
