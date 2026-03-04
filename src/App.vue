<template>
  <v-app class="app-shell">
    <v-app-bar color="surface" elevation="2">
      <v-toolbar-title>
        <router-link to="/" class="brand-link text-primary font-weight-bold">
          Vuetify Shop
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text" color="primary" class="mr-1">Products</v-btn>
      <v-btn to="/about" variant="text" color="primary" class="mr-4">About</v-btn>
      <v-btn icon variant="text" color="primary" class="mr-2" @click="cartDialog = true">
        <v-badge :content="cartCount" color="error" :model-value="cartCount > 0">
          <v-icon icon="mdi-cart" />
        </v-badge>
      </v-btn>
      <v-btn variant="outlined" color="primary" class="mr-2" @click="loginDialog = true">Login</v-btn>
      <v-btn variant="flat" color="primary" @click="registerDialog = true">Register</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer class="footer-section py-6">
        <v-container class="d-flex flex-column flex-md-row align-center justify-space-between ga-2">
        <div class="text-subtitle-2 text-primary">Vuetify Shop</div>
        <div class="text-caption text-primary">Discover products, filter by category, and sort by price.</div>
        <div class="text-caption text-primary">&copy; {{ currentYear }} Vuetify Shop. All rights reserved.</div>
      </v-container>
    </v-footer>

    <v-dialog v-model="loginDialog" max-width="460">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Login</v-card-title>
        <v-card-text>
          <v-form ref="loginFormRef" v-model="isLoginFormValid">
          <v-text-field
            v-model="loginForm.email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            class="mb-2"
            :rules="emailRules"
          />
          <v-text-field
            v-model="loginForm.password"
            label="Password"
            :type="showLoginPassword ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            :append-inner-icon="showLoginPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showLoginPassword = !showLoginPassword"
            :rules="passwordRules"
          />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeLogin">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="submitLogin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="registerDialog" max-width="520">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Register</v-card-title>
        <v-card-text>
          <v-form ref="registerFormRef" v-model="isRegisterFormValid">
          <v-text-field
            v-model="registerForm.fullName"
            label="Full Name"
            variant="outlined"
            density="comfortable"
            class="mb-2"
            :rules="nameRules"
          />
          <v-text-field
            v-model="registerForm.email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            class="mb-2"
            :rules="emailRules"
          />
          <v-text-field
            v-model="registerForm.password"
            label="Password"
            :type="showRegisterPassword ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            :append-inner-icon="showRegisterPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showRegisterPassword = !showRegisterPassword"
            :rules="passwordRules"
          />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeRegister">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="submitRegister">Create Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cartDialog" max-width="720">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Your Cart</v-card-title>
        <v-divider />
        <v-card-text>
          <v-alert v-if="!cartItems.length" type="info" variant="tonal">
            Your cart is empty.
          </v-alert>
          <v-list v-else lines="two">
            <v-list-item
              v-for="item in cartItems"
              :key="item.id"
              :title="item.title"
              :subtitle="`Qty: ${item.quantity} - $${item.price}`"
            >
              <template #prepend>
                <v-avatar rounded="0" size="48">
                  <v-img :src="item.image" />
                </v-avatar>
              </template>
              <template #append>
                <v-btn
                  icon="mdi-delete-outline"
                  variant="text"
                  color="error"
                  @click="removeCartItem(item.id)"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <div class="text-subtitle-2 font-weight-bold">Total: ${{ cartTotal.toFixed(2) }}</div>
          <v-spacer />
          <v-btn variant="text" @click="cartDialog = false">Close</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :disabled="!cartItems.length"
            @click="openCheckout"
          >
            Proceed to Checkout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="checkoutDialog" max-width="520">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Checkout Details</v-card-title>
        <v-card-text>
          <v-form ref="checkoutFormRef" v-model="isCheckoutFormValid">
            <v-text-field
              v-model="checkoutForm.fullName"
              label="Full Name"
              variant="outlined"
              density="comfortable"
              class="mb-2"
              :rules="nameRules"
            />
            <v-textarea
              v-model="checkoutForm.address"
              label="Address"
              variant="outlined"
              density="comfortable"
              rows="3"
              :rules="addressRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="checkoutDialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="submitOrder">Submit Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="orderSuccessDialog" max-width="440">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Order Processed</v-card-title>
        <v-card-text>
          Thank you {{ checkoutForm.fullName }}. Your order has been processed successfully.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="closeOrderSuccess">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { cartCount as cartCountRef, cartState, cartTotal as cartTotalRef, clearCart, removeFromCart } from './store/cart'

export default {
  name: 'App',
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
      cartDialog: false,
      checkoutDialog: false,
      orderSuccessDialog: false,
      isLoginFormValid: false,
      isRegisterFormValid: false,
      isCheckoutFormValid: false,
      showLoginPassword: false,
      showRegisterPassword: false,
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        fullName: '',
        email: '',
        password: '',
      },
      checkoutForm: {
        fullName: '',
        address: '',
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Enter a valid email',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Minimum 6 characters',
      ],
      nameRules: [
        v => !!v || 'Full name is required',
        v => (v && v.trim().length >= 3) || 'Minimum 3 characters',
      ],
      addressRules: [
        v => !!v || 'Address is required',
        v => (v && v.trim().length >= 10) || 'Address should be at least 10 characters',
      ],
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    cartItems() {
      return cartState.items
    },
    cartCount() {
      return cartCountRef.value
    },
    cartTotal() {
      return cartTotalRef.value
    },
  },
  methods: {
    closeLogin() {
      this.loginDialog = false
      this.showLoginPassword = false
    },
    closeRegister() {
      this.registerDialog = false
      this.showRegisterPassword = false
    },
    async submitLogin() {
      const result = await this.$refs.loginFormRef.validate()
      if (!result.valid) {
        return
      }
      this.closeLogin()
    },
    async submitRegister() {
      const result = await this.$refs.registerFormRef.validate()
      if (!result.valid) {
        return
      }
      this.closeRegister()
    },
    removeCartItem(productId) {
      removeFromCart(productId)
    },
    openCheckout() {
      this.cartDialog = false
      this.checkoutDialog = true
    },
    async submitOrder() {
      const result = await this.$refs.checkoutFormRef.validate()
      if (!result.valid) {
        return
      }

      this.checkoutDialog = false
      clearCart()
      this.orderSuccessDialog = true
    },
    closeOrderSuccess() {
      this.orderSuccessDialog = false
      this.checkoutForm.fullName = ''
      this.checkoutForm.address = ''
    },
  },
}
</script>

<style scoped>
.app-shell {
  background: linear-gradient(
    180deg,
    rgb(var(--v-theme-background)) 0%,
    rgb(var(--v-theme-surface)) 38%,
    rgb(var(--v-theme-background)) 100%
  );
}

.footer-section {
  border-top: 1px solid rgba(var(--v-theme-primary), 0.2);
  background: rgb(var(--v-theme-surface));
}

.brand-link {
  color: inherit;
  text-decoration: none;
}
</style>
