<template>
  <v-container class="py-8">
    <v-card class="hero-banner mb-6" rounded="lg" elevation="0">
      <v-card-text class="py-8 px-6">
        <div class="text-overline mb-1">Fake Store Collection</div>
        <div class="text-h4 font-weight-bold mb-2">Browse Products Effortlessly</div>
        <div class="text-body-1">Use category filters and price sorting to find what you want faster.</div>
      </v-card-text>
    </v-card>

    <!-- Loading and Error States -->
    <v-row justify="center" v-if="loading" class="py-10">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <v-alert v-else-if="error" type="error" prominent class="mb-4">
      {{ error }}
    </v-alert>
    <div v-else>
      <!-- Filters and Sorting -->
      <v-card rounded="lg" elevation="1" class="mb-6">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="5">
              <v-select
                v-model="selectedCategory"
                :items="categoryOptions"
                label="Filter by Category"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="5">
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Sort by Price"
                variant="outlined"
                clearable
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="2" class="d-flex align-center">
              <v-chip color="primary" variant="tonal" class="ml-md-auto">
                {{ filteredAndSortedProducts.length }} items
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Product List -->
      <v-row v-if="filteredAndSortedProducts.length">
        <v-col
          v-for="product in filteredAndSortedProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="product-card mx-auto h-100" rounded="lg" elevation="3" hover>
            <v-img height="200" :src="product.image" contain></v-img>
            <v-card-title class="text-body-1 font-weight-bold product-title">{{ product.title }}</v-card-title>
            <v-card-subtitle class="pb-2 d-flex align-center justify-space-between">
              <span class="font-weight-bold text-primary">${{ product.price }}</span>
              <v-chip v-if="product.rating && product.rating.rate" size="small" variant="outlined">
                {{ product.rating.rate }} / 5
              </v-chip>
            </v-card-subtitle>
            <v-card-text>
              <div class="product-description">{{ product.description }}</div>
            </v-card-text>
            <v-card-actions class="px-4 pb-4 d-flex flex-column flex-sm-row ga-2">
              <v-btn
                variant="outlined"
                color="primary"
                class="w-100 w-sm-auto"
                @click="viewProduct(product.id)"
              >
                View Details
              </v-btn>
              <v-btn
                color="primary"
                class="w-100 w-sm-auto ml-sm-auto"
                @click="handleAddToCart(product)"
              >
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-alert v-else type="info" variant="tonal">
        No products found for the selected filter.
      </v-alert>
    </div>

    <v-snackbar v-model="snackbar" color="success" timeout="1800">
      Added to cart
    </v-snackbar>
  </v-container>
</template>

<script>
import { addToCart } from '../store/cart'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: 'All Categories',
      sortBy: null,
      sortOptions: ['Price: Low to High', 'Price: High to Low'],
      loading: true,
      error: null,
      snackbar: false,
    };
  },
  computed: {
    categoryOptions() {
      return ['All Categories', ...this.categories]
    },
    filteredAndSortedProducts() {
      let products = [...this.products];

      // Filter by category
      if (this.selectedCategory && this.selectedCategory !== 'All Categories') {
        products = products.filter(p => p.category === this.selectedCategory);
      }

      // Sort by price
      if (this.sortBy === 'Price: Low to High') {
        products.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'Price: High to Low') {
        products.sort((a, b) => b.price - a.price);
      }

      return products;
    },
  },
  methods: {
    viewProduct(productId) {
      this.$router.push({ name: 'ProductDetails', params: { id: productId } })
    },
    handleAddToCart(product) {
      addToCart(product)
      this.snackbar = true
    },
  },
  async mounted() {
    try {
      this.error = null;
      this.loading = true;
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch('https://fakestoreapi.com/products'),
        fetch('https://fakestoreapi.com/products/categories'),
      ]);

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error('Failed to fetch product data');
      }

      const [products, categories] = await Promise.all([
        productsResponse.json(),
        categoriesResponse.json(),
      ]);

      this.products = products;
      this.categories = categories;
    } catch (err) {
      this.error = 'Failed to load products. Please try again later.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero-banner {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.12) 0%,
    rgba(var(--v-theme-info), 0.08) 52%,
    rgba(var(--v-theme-secondary), 0.12) 100%
  );
}

.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-title {
  min-height: 60px;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
