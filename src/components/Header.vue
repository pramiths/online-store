<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/products" class="logo-link">
        <img src="../assets/logos/buhler-logo.svg" alt="Bühler" class="logo" />
      </router-link>
      
      <div class="current-time">{{ currentTime }}</div>
      
      <router-link to="/checkout" class="cart-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 2L7 6H3v14h18V6h-4l-2-4H9z"/>
          <path d="M9 8v4M15 8v4"/>
        </svg>
        <span>Cart ({{ cartCount }})</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { cartCount } = storeToRefs(cartStore);
const currentTime = ref('');
let timeInterval = null;

const updateTime = () => {
  const now = new Date()
  const options = {
    month: 'short',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }
  currentTime.value = now.toLocaleString('en-US', options).replace(',', ', ')
}

onMounted(() => {
  cartStore.loadFromLocalStorage();
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 0;
}

.header-container {
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 32px;
  width: auto;
}

.current-time {
  color: #00a89c;
  font-size: 0.95rem;
  font-weight: 500;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00a89c;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.cart-link svg {
  color: #00a89c;
}
</style>

