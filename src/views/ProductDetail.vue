<template>
    <div class="product-detail">
    <button @click="goBack" class="back-btn">Back</button>
    
    <div v-if="loading" class="loading">Loading product...</div>
    
    <div v-else-if="!product" class="not-found">
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <router-link to="/products" class="continue-shopping">Back to Products</router-link>
    </div>
    
    <div v-else class="detail-container">
      <div class="image-container">
        <img 
          :src="product.imageUrl" 
          :alt="product.name"
          class="product-image"
        />
      </div>
      
      <div class="info-container">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-category">{{ getCategoryDisplayName(product.category) }}</p>
        <p class="product-price">x{{ product.price.toFixed(2) }}</p>
        
        <button @click="addToCart" class="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { getCategoryDisplayName } from '../utils/categoryMapping';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const product = ref(null);
const loading = ref(true);

const loadProduct = async () => {
    loading.value = true;
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const prodId = route.params.id;
        product.value = data.find(p => p.id === prodId) || null;
    } catch (error) {
        console.error('Error loading product:', error);
        product.value = null;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadProduct();
});

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
  }
}

const goBack = () => {
  router.back();
}

</script>

<style scoped>
.product-detail {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.back-btn {
    background: none;
    border: none;
    color: #00a89c;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 2rem;
    padding: 0;
    text-decoration: none;
}

.back-btn:hover {
    text-decoration: underline;
}

.detail-container {
    display: flex;
    gap: 3rem;
    background: #ffffff;
    padding: 2rem;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
}

.image-container {
    flex: 0 0 350px;
    height: 350px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info-container {
    flex: 1 0 60%;
    display: flex;
    flex-direction: column;
    max-width: 60vw;
}

.product-title {
    color: #00a89c;
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
}

.product-category {
    color: #00a89c;
    font-size: 1rem;
    font-weight: 400;
    font-style: italic;
    margin: 0 0 1rem 0;
}

.product-price {
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 2rem 0;
}

.add-to-cart-btn {
    padding: 1rem 2rem;
    background-color: transparent;
    border: 2px solid #00a89c;
    color: #00a89c;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.2s;
    align-self: flex-start;
    border-radius: 4px;
}

.add-to-cart-btn:hover {
    background-color: #00a89c;
    color: #ffffff;
}

.add-to-cart-btn svg {
    stroke: currentColor;
}

.loading {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.not-found {
    text-align: center;
    padding: 4rem 2rem;
    background: #ffffff;
    border-radius: 4px;
}

.not-found h2 {
    color: #00a89c;
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

.not-found p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.not-found .continue-shopping {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #00a89c;
    color: #ffffff;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    transition: opacity 0.2s;
}

.not-found .continue-shopping:hover {
    opacity: 0.9;
}

@media (max-width: 768px) {
    .detail-container {
      flex-direction: column;
    }

    .image-container {
      flex: 0 0 300px;
      height: 300px;
    }
}
</style>