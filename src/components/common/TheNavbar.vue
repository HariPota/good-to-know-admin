<script setup lang="ts">
  import { ref, unref, defineEmits } from 'vue'
  import { ClickOutside as vClickOutside } from 'element-plus'
  import { ArrowDown, Fold } from '@element-plus/icons-vue'
  import { useI18n } from 'vue-i18n'

  defineProps<{ userName: string }>()

  const userPopoverRef = ref()
  const topBarUserRef = ref()

  const emit = defineEmits(['toggle-sidebar'])

  const { t } = useI18n()

  const onClickOutside = () => {
    unref(userPopoverRef).popperRef?.delayHide?.()
  }

  function handleToggleClick(): void {
    emit('toggle-sidebar')
  }
</script>

<template>
  <div class="topbar">
    <div class="topbar__brand">
      <router-link class="topbar__brand__link" :to="{ name: 'home' }">
        {{ t('brand') }}
      </router-link>
    </div>
    <span class="topbar__toggle" @click="handleToggleClick">
      <el-icon type="folder" />
      <el-icon size="30"><Fold /></el-icon>
    </span>
    <el-popover
      ref="userPopoverRef"
      :virtual-ref="topBarUserRef"
      virtual-triggering
      class="topbar__user-popover"
      trigger="click"
      placement="bottom"
    >
      <slot name="user-popover" />
    </el-popover>
    <div class="topbar__left">
      <div
        v-if="userName"
        ref="topBarUserRef"
        v-click-outside="onClickOutside"
        class="topbar__user"
      >
        <span v-if="userName" class="topbar__user__name">
          {{ userName }}
        </span>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .topbar {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: $navbarBackground;
    display: flex;
    flex-direction: row;
    height: $navbarHeight;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: $navbarZIndex;

    &__brand {
      display: none;
      width: $sidebarWidth;
      padding: 0 15px;

      &__link {
        color: $navbarBrandLinkColor;
        text-decoration: none;
        font-weight: 500;
        font-size: 18px;

        &:hover,
        &:focus {
          color: mix(#fff, $navbarBrandLinkColor, 10%);
        }
      }
    }

    &__toggle {
      color: #777;
      font-size: 14px;
      cursor: pointer;
      margin-left: 15px;
      user-select: none;
    }

    &__left {
      display: inline-flex;
      align-items: center;
      margin-left: auto;
      padding: 0 15px;
    }

    &__user {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 5px;
      height: $navbarHeight;
      outline: none;

      &__avatar {
        display: inline-block;

        > img {
          width: 25px;
          height: 25px;
          border-radius: 5px;
          margin-right: 10px;
        }
      }

      &__name {
        display: block;
        font-weight: 400;
      }
    }

    &__user-popover {
      padding: 5px 0;

      &__menu {
        margin: 0;
        padding: 0;
        list-style: none;

        > li > a {
          color: $defaultLinkColor;
          display: block;
          width: 100%;
          font-size: 14px;
          text-decoration: none;
          padding: 7px 10px;

          &:hover,
          &:focus {
            background-color: #f8f8f8;
            color: mix(#fff, $defaultLinkColor, 10%);
          }
        }
      }
    }

    @media screen and (min-width: 1200px) {
      &__brand {
        display: block;
      }

      &__toggle {
        margin-left: 5px;
      }
    }
  }
</style>
