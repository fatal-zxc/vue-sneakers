<script setup lang="ts">
defineProps<{
  id: number
  imageUrl: string
  title: string
  price: number
  isFavorite: boolean
  isAdded: boolean
}>()

const emit = defineEmits(['onClickAdd', 'onClickFavorite'])
</script>

<template>
  <article
    class="flex flex-col justify-between relative bg-white border border-slate-200 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <button
      @click="emit('onClickFavorite', id)"
      class="absolute top-5 left-5 hover:scale-125 transition"
    >
      <img
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        :alt="isFavorite ? 'no-like' : 'like'"
      />
    </button>
    <img :src="imageUrl" alt="sneaker" />
    <p>{{ title }}</p>
    <div class="flex justify-between items-center mt-5">
      <div class="flex flex-col">
        <span class="text-slate-300">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <button class="h-8 w-8 hover:scale-125 transition" @click="emit('onClickAdd')">
        <img :src="isAdded ? '/checked.svg' : '/plus.svg'" :alt="isAdded ? 'checked' : 'plus'" />
      </button>
    </div>
  </article>
</template>

<style lang="scss"></style>
