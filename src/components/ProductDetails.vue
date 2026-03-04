<template>
  <v-container class="py-8">
    <v-btn variant="text" color="primary" class="mb-4" @click="$router.back()">
      Back to Products
    </v-btn>

    <v-row justify="center" v-if="loading" class="py-10">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>

    <v-alert v-else-if="error" type="error" prominent>
      {{ error }}
    </v-alert>

    <v-card v-else rounded="lg" elevation="3">
      <v-row no-gutters>
        <v-col cols="12" md="5" class="pa-6 d-flex align-center">
          <v-img :src="product.image" height="320" contain />
        </v-col>
        <v-col cols="12" md="7">
          <v-card-text class="pa-6">
            <v-chip size="small" color="primary" variant="tonal" class="mb-3">
              {{ product.category }}
            </v-chip>
            <h1 class="text-h5 mb-3">{{ product.title }}</h1>
            <div class="text-h6 text-primary mb-4">${{ product.price }}</div>
            <p class="text-body-1 mb-4">{{ product.description }}</p>
            <v-chip
              v-if="product.rating && product.rating.rate"
              size="small"
              variant="outlined"
              class="mb-6"
            >
              Rating: {{ product.rating.rate }} / 5 ({{ product.rating.count }} reviews)
            </v-chip>
            <div>
              <v-btn color="primary" size="large" @click="handleAddToCart">
                Add to Cart
              </v-btn>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <v-snackbar v-model="snackbar" color="success" timeout="1800">
      Added to cart
    </v-snackbar>
  </v-container>
</template>

<script>
import { addToCart } from '../store/cart'

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      snackbar: false,
    }
  },
  methods: {
    async fetchProduct() {
      try {
        this.loading = true
        this.error = null
        const response = await fetch(`https://fakestoreapi.com/products/${this.$route.params.id}`)
        if (!response.ok) {
          throw new Error('Unable to fetch product details')
        }
        this.product = await response.json()
      } catch (err) {
        this.error = 'Failed to load product details. Please try again later.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    handleAddToCart() {
      if (!this.product) {
        return
      }
      addToCart(this.product)
      this.snackbar = true
    },
  },
  mounted() {
    this.fetchProduct()
  },
}
</script>
