<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    title?: string
    loading?: boolean
    transparent?: boolean
  }>()

  const mainClass = computed(() => {
    return [
      props.loading ? 'v-page--loading' : null,
      props.transparent ? 'v-page--transparent' : null,
    ]
  })
</script>

<template>
  <div v-loading.lock="loading" class="v-page" :class="mainClass">
    <template v-if="!loading">
      <slot name="header">
        <div v-if="title || $slots.toolbar" class="v-page__header">
          <h1 v-if="title" class="v-page__title">
            {{ title }}
          </h1>
          <div v-if="$slots.toolbar" class="v-page__toolbar">
            <slot name="toolbar" />
          </div>
        </div>
      </slot>
      <div v-if="$slots.default || $slots.footer" class="v-page__wrapper">
        <div v-if="$slots.default" class="v-page__content">
          <slot />
        </div>
        <div v-if="$slots.footer" class="v-page__footer">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
  .v-page {
    padding: 15px;

    &--loading {
      min-height: 100%;
    }

    &--transparent {
    }

    &--transparent &__wrapper {
      box-shadow: none;
    }

    &--transparent &__content {
      background-color: transparent;
      padding: 0;
    }

    &__header {
      padding: 5px 0 15px;
      display: flex;
      align-items: center;
    }

    &__title {
      color: #333;
      font-size: 22px;
      font-weight: 400;
      margin: 0;
      padding: 0;
    }

    &__toolbar {
      margin-left: auto;
    }

    &__wrapper {
      box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    }

    &__content {
      background-color: #fff;
      padding: 15px;
    }

    &__footer {
      padding: 15px;
      background-color: #fff;
      border-top: 1px solid hsla(0, 0%, 4%, 0.1);
    }
  }
</style>
