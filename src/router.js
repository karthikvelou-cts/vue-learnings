import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ProductDetails from './components/ProductDetails.vue'

const AboutView = {
  template: `
    <v-container class="py-8">
      <h2>About</h2>
      <p>Product data is loaded from Fake Store API.</p>
    </v-container>
  `,
}

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
