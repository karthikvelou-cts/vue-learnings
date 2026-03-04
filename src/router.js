import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ProductDetails from './components/ProductDetails.vue'
import AboutView from './components/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'Products',
    component: HelloWorld,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
