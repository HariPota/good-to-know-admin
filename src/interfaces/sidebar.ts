import type { Component } from 'vue'

export interface MenuItemInterface {
  title: string
  children: SubMenuItemInterface[]
}

export interface SubMenuItemInterface {
  title: string
  routeName: string
  icon: Component
  perm?: string
}
