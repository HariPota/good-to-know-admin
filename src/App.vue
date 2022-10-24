<script setup lang="ts"></script>

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    &__fatal-error {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
    }

    &__error-alert {
      border: 1px solid #f56c6c;
      width: 380px;
    }
  }
</style>
