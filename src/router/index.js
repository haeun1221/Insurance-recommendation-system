import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import AIGuideView from '../views/AIGuideView.vue'
import RecentView from '../views/RecentView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import CoverageView from "@/views/CoverageView.vue";
import ToxicView from "@/views/ToxicView.vue";
import PriceView from "@/views/PriceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/ai-guide',
      name: 'ai-guide',
      component: AIGuideView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/recent',
      name: 'recent',
      component: RecentView,
    },
    {
      path: '/coverage-details',
      name: 'coverage-details',
      component: CoverageView,
    },
    {
      path: '/toxic-details',
      name: 'toxic-details',
      component: ToxicView,
    },
    {
      path: '/price-compare',
      name: 'price-compare',
      component: PriceView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router