<script setup lang="ts">
  import { computed, useCssModule } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import type { MenuItemInterface } from '@/interfaces/sidebar'

  const props = defineProps<{
    items: MenuItemInterface[]
    fixed: boolean
    collapsed: boolean
  }>()
  const route = useRoute()
  const style: Record<string, string> = useCssModule()

  const routeName = route.name as string
  const sidebarClass = computed(() => {
    return {
      [style.sidebar]: true,
      [style.sidebarFixed]: props.fixed,
      [style.sidebarCollapsed]: props.collapsed,
    }
  })
  const { t } = useI18n()
</script>

<template>
  <div :class="sidebarClass">
    <el-scrollbar :class="$style.scrollbar">
      <el-menu
        mode="vertical"
        :class="$style.menu"
        :show-timeout="200"
        :default-active="routeName"
        :unique-opened="true"
        :default-openeds="items.map((item) => item.title)"
      >
        <template v-for="item in items" :key="item.title">
          <el-sub-menu :class="$style.submenu" :index="item.title">
            <template #title>
              <span :class="$style.title">{{ t(item.title) }}</span>
            </template>
            <router-link
              v-for="childItem in item.children"
              :key="childItem.routeName"
              :to="{ name: childItem.routeName }"
            >
              <el-menu-item
                :class="$style.submenuItem"
                :index="childItem.routeName"
              >
                <el-icon :class="$style.itemIcon" class="material-icons">
                  <component :is="childItem.icon" />
                </el-icon>
                <span>{{ $t(childItem.title) }}</span>
              </el-menu-item>
            </router-link>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" module>
  .sidebar {
    background: $sidebarBackground;
    border-right: $sidebarBorder;
    bottom: 0;
    width: $sidebarWidth;
    height: calc(100vh - 52px);
    flex-shrink: 0;
    transition: all 0.3s ease-out;
    overflow: hidden;
    position: fixed;
    top: $navbarHeight;
    z-index: $sidebarZIndex;
  }

  .scrollbar {
    height: 100%;

    :global(.el-scrollbar__wrap) {
      overflow-x: hidden;
    }
  }

  .sidebarFixed {
    box-shadow: 5px 0 20px 0 rgba(0, 0, 0, 0.1);
  }

  .sidebarCollapsed {
    margin-left: -$sidebarWidth;
    box-shadow: none;
  }

  .sidebar .menu {
    border-right: none;
    background-color: $sidebarBackground;
  }

  li.menuItem {
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    height: auto;
    line-height: normal;
    padding: 10px 0;

    &:hover,
    &:focus {
      background-color: #f2f2f2;
    }
  }

  .submenu:global(.el-submenu) .submenuItem {
    height: auto;
    line-height: normal;
    padding: 10px 0;

    &:hover,
    &:focus {
      background-color: #f2f2f2;
    }
  }

  .submenu {
    .title {
      font-weight: bold;
    }
    :global(.el-submenu__title) {
      color: #333;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      padding: 10px 0;
      height: auto;
      line-height: normal;

      &:hover,
      &:focus {
        background-color: #f2f2f2;
      }
    }
  }

  .itemIcon {
    margin-right: 5px;
    font-size: 22px;
  }
</style>
