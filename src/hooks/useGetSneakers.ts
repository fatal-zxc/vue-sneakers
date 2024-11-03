import { onMounted, ref, Ref } from 'vue'

import { getAllSneakers, getFavorites } from '@/services/sneakers-service'
import { createSneakers } from '@/utils'
import { useSneakersStore } from '@/store/sneakers'

interface ReturnProps {
  isLoading: Ref<boolean>
}

const useGetSneakers = (): ReturnProps => {
  const isLoading = ref(false)
  const { sneakers, setSneakers, favorites, setFavorites } = useSneakersStore()

  onMounted( async () => {
    if (sneakers.value.length) return
    isLoading.value = true
    try {
      const data = await getAllSneakers()
      const favoritesData = await getFavorites()
      setFavorites.value(favoritesData)
      setSneakers.value(createSneakers(favorites.value, data))
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  })

  return { isLoading }
}

export default useGetSneakers