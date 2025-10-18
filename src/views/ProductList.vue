<template>
  <div class="product-list">
    <div v-for="(products, category) in productsByCategory" :key="category" class="category-section">
      <h2 class="category-title">{{ getCategoryDisplayName(category) }}</h2>
      
      <div class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <router-link :to="`/products/${product.id}`" class="product-link">
            <div class="product-image-container">
              <img 
                :src="product.imageUrl"
                :alt="product.name"
                class="product-image"
              />
            </div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">x{{ product.price.toFixed(2) }}</p>
          </router-link>
          <button @click="addToCart(product)" class="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

// pinia cart store
const cartStore = useCartStore();

const productsByCategory = ref({});

// category mapping
const categoryMapping = {
  machine_roller: 'Roller Machines',
  machine_sorter: 'Sorter Machines',
  machine_dryer: 'Dryer Machines',
  machine_die_casting: 'Die Casting Machines'
}

const getCategoryDisplayName = (category) => {
  return categoryMapping[category] || category
}

// load products from products.json
const loadProducts = async () => {
  try {
    const response = await fetch('/products.json');
    const data = await response.json();
    const categorized = groupProductsByCategory(data);
    productsByCategory.value = categorized;
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

const groupProductsByCategory = (products) => {
    const grouped = {};
    products.forEach((product) => {
        if (!grouped[product.category]) {
            grouped[product.category] = [];
        }
        grouped[product.category].push(product);
    });
    return grouped;
};

//load products on mounted
onMounted(() => {
    loadProducts();
});

//add product to cart
const addToCart = (product) => {
    cartStore.addToCart(product);
};

</script>

<!-- used css styles - can be converted to sass later -->
<style scoped>
.product-list {
    max-width: 100vw;
    margin: 0 auto;
    padding: 2rem 4rem;
}

.category-section {
    margin-bottom: 3rem;
}

.category-title {
    color: #00a89c;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #00a89c;
}

.products-grid {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.product-card {
    flex: 0 0 calc(20% - 1.2rem);
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.product-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
}

.product-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.product-image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 180px;
    background-color: #f5f5f5;
    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-name {
    color: #00a89c;
    font-size: 0.95rem;
    font-weight: 500;
    margin: 0.75rem;
    min-height: 2.4rem;
}

.product-price {
    color: #333;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0 0.75rem 0.75rem;
}

.add-to-cart-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: transparent;
    border: none;
    border-top: 1px solid #e0e0e0;
    color: #00a89c;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
    background-color: #f5f5f5;
}

@media (max-width: 1200px) {
    .product-card {
      flex: 0 0 calc(25% - 1.125rem);
    }
}

@media (max-width: 900px) {
    .product-card {
      flex: 0 0 calc(33.333% - 1rem);
    }
}

@media (max-width: 600px) {
    .product-card {
      flex: 0 0 calc(50% - 0.75rem);
    }
}
</style>