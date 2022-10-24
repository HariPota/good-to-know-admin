import {
  Document,
  Connection,
  List,
  Files,
  PieChart,
  Platform,
  Setting,
  Delete,
  DataAnalysis,
  UserFilled,
} from '@element-plus/icons-vue'
import type { MenuItemInterface } from '@/interfaces/sidebar'

export const ITEMS: MenuItemInterface[] = [
  {
    title: 'sidebar.general.title',
    children: [
      {
        title: 'sidebar.general.categories',
        routeName: 'home',
        icon: Connection,
      },
      {
        title: 'sidebar.general.content',
        routeName: 'home',
        icon: List,
      },
      {
        title: 'sidebar.general.news',
        routeName: 'home',
        icon: UserFilled,
      },
      // {
      //   title: 'sidebar.general.legal',
      //   routeName: 'home',
      //   icon: Document,
      //   perm: 'ROLE_SUPER_ADMIN',
      // },
      // {
      //   title: 'sidebar.general.orders',
      //   routeName: 'home',
      //   icon: Files,
      // },
    ],
  },
  // {
  //   title: 'sidebar.analytics.title',
  //   children: [
  //     {
  //       title: 'sidebar.analytics.metrics',
  //       routeName: 'metrics',
  //       icon: PieChart,
  //     },
  //     {
  //       title: 'sidebar.analytics.pageVisits',
  //       routeName: 'page-visits',
  //       icon: Platform,
  //     },
  //   ],
  // },
  // {
  //   title: 'sidebar.systemActions.title',
  //   children: [
  //     {
  //       title: 'sidebar.systemActions.features',
  //       routeName: 'features',
  //       icon: Setting,
  //     },
  //     {
  //       title: 'sidebar.systemActions.deleteFakeData',
  //       routeName: 'fake-data',
  //       icon: Delete,
  //     },
  //     {
  //       title: 'sidebar.systemActions.versions',
  //       routeName: 'versions',
  //       icon: DataAnalysis,
  //     },
  //   ],
  // },
]
