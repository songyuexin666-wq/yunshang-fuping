import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RedResources from '../views/RedResources.vue'
import GreenResources from '../views/GreenResources.vue'
import GeologicalResources from '../views/GeologicalResources.vue'
import SpotDetail from '../views/SpotDetail.vue'
import { incrementGlobalView } from '../utils/globalCounter'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/red-resources',
    name: 'RedResources',
    component: RedResources
  },
  {
    path: '/green-resources',
    name: 'GreenResources',
    component: GreenResources
  },
  {
    path: '/geological-resources',
    name: 'GeologicalResources',
    component: GeologicalResources
  },
  {
    path: '/red-resources/:id',
    name: 'RedSpotDetail',
    component: SpotDetail
  },
  {
    path: '/green-resources/:id',
    name: 'GreenSpotDetail',
    component: SpotDetail
  },
  {
    path: '/geological-resources/:id',
    name: 'GeologicalSpotDetail',
    component: SpotDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 记录浏览量（本地 + 全网）
router.afterEach((to) => {
  // 本地浏览量
  const viewCount = localStorage.getItem(`view_${to.name}`) || '0'
  localStorage.setItem(`view_${to.name}`, String(parseInt(viewCount) + 1))

  // 全网浏览量（异步，不阻塞导航）
  void incrementGlobalView(to.name)
})

export default router



