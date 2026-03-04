import { computed, reactive } from 'vue'

const state = reactive({
  items: [],
})

function addToCart(product) {
  const existingItem = state.items.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += 1
    return
  }

  state.items.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  })
}

function removeFromCart(productId) {
  state.items = state.items.filter(item => item.id !== productId)
}

function clearCart() {
  state.items = []
}

const cartCount = computed(() => state.items.reduce((sum, item) => sum + item.quantity, 0))
const cartTotal = computed(() => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))

export {
  addToCart,
  cartCount,
  cartTotal,
  clearCart,
  removeFromCart,
  state as cartState,
}
