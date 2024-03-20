import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBreadStore = defineStore('Bread', () => {
  const list = ref([])
  const breadsList = computed(() => list.value)
  function changeBread (item) {
    const home = { path: '/', name: 'Home' }
    const prev = { path: item.prevPath, name: item.prevTitle }
    const current = { path: item.to, name: item.name }
    const lists = [home, prev, current]
    list.value = lists
  }

  return { changeBread, breadsList }
})
