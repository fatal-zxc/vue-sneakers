import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import FavoritesSneakers from './pages/FavoritesSneakers.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/favorites', name: 'FavoritesSneakers', component: FavoritesSneakers }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).use(autoAnimatePlugin).mount('#app')
