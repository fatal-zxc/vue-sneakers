<script setup lang="ts">
import { useCartStore } from '@/store/cart'

const { totalAmount, toggle } = useCartStore()
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center">
        <img src="/logo.png" alt="logo" class="w-10 mr-5" />
        <div>
          <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
          <p class="text-gray-400 text-sm">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <nav class="flex items-center gap-10">
      <li
        :onclick="() => toggle()"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-gray-800"
      >
        <img src="/cart.svg" alt="cart" />
        <p>{{ totalAmount }} руб.</p>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-gray-800">
          <img src="/heart.svg" alt="favorite" />
          <p>Закладки</p>
        </li>
      </router-link>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-gray-800">
        <img src="/profile.svg" alt="cart" />
        <p>Профиль</p>
      </li>
    </nav>
  </header>
</template>
