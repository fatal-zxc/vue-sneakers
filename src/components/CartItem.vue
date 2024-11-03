<script setup lang="ts">
defineProps<{
  imageUrl: string
  title: string
  price: number
}>()
const emit = defineEmits(['deleteItem'])
</script>

<template>
  <div class="flex items-center gap-4 w-full border border-slate-100 p-4 rounded-xl">
    <img :src="imageUrl" alt="sneaker" class="w-[70px] h-[70px]" />
    <div class="flex items-center">
      <div>
        <p>{{ title }}</p>
        <p class="mt-2 font-bold">{{ price }} руб.</p>
      </div>
      <div>
        <button
          @click="emit('deleteItem')"
          class="h-[32px] w-[32px] opacity-70 hover:scale-125 hover:opacity-100 transition"
        >
          <img src="/close.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
