<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { ITEMS as SIDEBAR_ITEMS } from '@/constants/sidebar'
  import TheSidebar from '@/components/common/TheSidebar.vue'
  import TheNavbar from '@/components/common/TheNavbar.vue'
  import { useRouter } from 'vue-router'
  import type {
    MenuItemInterface,
    SubMenuItemInterface,
  } from '@/interfaces/sidebar'
  import { useUiStore } from '@/stores/useUiStore'

  const { sidebar, toggleSidebar } = useUiStore()
  const router = useRouter()
  // const isGranted = store.getters['auth/isGranted']

  const sidebarItems: MenuItemInterface[] = SIDEBAR_ITEMS.map(
    (x: MenuItemInterface) => {
      return {
        ...x,
        children: x.children.filter((item: SubMenuItemInterface) => {
          return item.perm === undefined //|| (item.perm && isGranted(item.perm))
        }),
      }
    }
  )

  const mainClass = computed(() => {
    return {
      'app-main--sidebar-collapsed': sidebar.collapsed,
    }
  })

  function handleSidebarClose(): void {
    if (sidebar.fixed) {
      toggleSidebar()
    }
  }

  // async function handleLogout(): Promise<void> {
  //   try {
  //     await store.dispatch('auth/logout')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async function doLayout(): Promise<void> {
    const mq: MediaQueryList = window.matchMedia('(min-width: 1200px)')
    if (mq.matches) {
      sidebar.fixed = false
      sidebar.collapsed = false
    } else {
      sidebar.fixed = false //TODO: true
      sidebar.collapsed = false //TODO: true
    }
  }

  function init(): void {
    doLayout()
    router.afterEach(() => {
      if (sidebar.fixed && !sidebar.collapsed) {
        handleSidebarClose()
      }
    })
  }

  onMounted(() => {
    init()
  })
</script>

<template>
  <div class="app-main" :class="mainClass">
    <TheNavbar
      ref="topbar"
      user-name="store.state.auth.globalData.user_name"
      @toggle-sidebar="toggleSidebar"
    >
      <template #user-popover>
        <ul class="topbar__user-popover__menu">
          <li>
            <a href="#" @click.prevent="toggleSidebar"> logout </a>
          </li>
        </ul>
      </template>
    </TheNavbar>
    <div class="app-main__container">
      <TheSidebar
        :items="sidebarItems"
        v-bind="sidebar"
        class="app-sidebar"
        @close-sidebar="handleSidebarClose"
      />
      <div class="app-main__content">
        <router-view :key="$route.fullPath" v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .app-main {
    &__container {
      display: flex;
      min-height: calc(100vh - #{$navbarHeight});
      margin-top: 50px;
    }

    &__content {
      flex: 1;
      overflow: hidden;
      margin-left: $sidebarWidth;
      transition: all 0.3s ease-out;
    }

    &--sidebar-collapsed &__content {
      margin-left: 0;
    }
  }
</style>
