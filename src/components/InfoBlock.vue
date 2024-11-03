<script setup lang="ts">
defineProps<{
  title: string
  imgUrl: string
  description: string
}>()
const emit = defineEmits(['back'])
</script>

<template>
  <div class="flex flex-col items-center w-72 mx-auto">
    <img height="100" width="100" :src="imgUrl" alt="info image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="mt-2 text-center">{{ description }}</p>
    <button
      @click="emit('back')"
      class="mt-10 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 transition"
    >
      Вернуться назад
    </button>
  </div>
</template>
