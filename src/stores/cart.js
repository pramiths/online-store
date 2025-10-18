import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    cartCount: (state) => state.items.length,
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + item.price, 0);
    },
    cartItems: (state) => state.items,
  },

  actions: {
    addToCart(product) {
      this.items.push({ ...product });
      this.saveToLocalStorage();
    },
    removeFromCart(index) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem('buhler-cart', JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('buhler-cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    }
  }
})
