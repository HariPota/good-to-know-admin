import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const sidebar = reactive({
    fixed: true,
    collapsed: false,
  })

  function toggleSidebar() {
    sidebar.collapsed = !sidebar.collapsed
  }

  return { sidebar, toggleSidebar }
})
