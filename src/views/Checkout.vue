<template>
  <div class="checkout">
    <h1 class="checkout-title">Checkout</h1>
    
    <div v-if="cartItems.length > 0" class="checkout-content">
      <div class="cart-items">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <div class="item-image-container">
            <img 
              :src="item.imageUrl" 
              :alt="item.name"
              @error="handleImageError"
              class="item-image"
            />
          </div>
          
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-category">{{ getCategoryDisplayName(item.category) }}</p>
          </div>
          
          <div class="item-price">x{{ item.price.toFixed(2) }}</div>
          
          <button @click="removeItem(index)" class="remove-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="total-section">
        <span class="total-label">Total:</span>
        <span class="total-amount">x{{ cartTotal.toFixed(2) }}</span>
      </div>
    </div>
    
    <div v-else class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/products" class="continue-shopping">Continue Shopping</router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { getCategoryDisplayName } from '../utils/categoryMapping'

const cartStore = useCartStore()
const { cartItems, cartTotal } = storeToRefs(cartStore);

const removeItem = (index) => cartStore.removeFromCart(index);

</script>

<style scoped>
.checkout {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.checkout-title {
    color: #00a89c;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
}

.checkout-content {
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
}

.cart-items {
    display: flex;
    flex-direction: column;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
}

.cart-item:last-child {
    border-bottom: none;
}

.item-image-container {
    flex: 0 0 100px;
    height: 100px;
    background-color: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.item-info {
    flex: 1;
}

.item-name {
    color: #00a89c;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
}

.item-category {
    color: #00a89c;
    font-size: 0.9rem;
    font-style: italic;
    margin: 0;
}

.item-price {
    color: #333;
    font-size: 1.1rem;
    font-weight: 600;
    margin-right: 1rem;
}

.remove-btn {
    background: none;
    border: none;
    color: #00a89c;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
}

.remove-btn:hover {
    opacity: 0.7;
}

.total-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-top: 2px solid #00a89c;
}

.total-label {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.total-amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: #00a89c;
}

.empty-cart {
    text-align: center;
    padding: 4rem 2rem;
    background: #ffffff;
    border-radius: 4px;
}

.empty-cart p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.continue-shopping {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #00a89c;
    color: #ffffff;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    transition: opacity 0.2s;
}

.continue-shopping:hover {
    opacity: 0.9;
}

@media (max-width: 600px) {
    .cart-item {
        flex-wrap: wrap;
    }

    .item-image-container {
        flex: 0 0 80px;
        height: 80px;
    }

    .item-price {
        flex: 0 0 100%;
        margin-right: 0;
        margin-top: 0.5rem;
    }
}
</style>