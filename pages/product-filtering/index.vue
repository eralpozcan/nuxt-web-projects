<template>
  <div class="bg-gray-800 text-white">
    <nav class="bg-gray-900 p-4 mb-6">
      <div
        class="container max-w-6xl mx-auto flex flex-col sm:flex-row gap-8 items-center"
      >
        <!-- Search area -->
        <div class="relative w-full">
          <input
            type="text"
            id="search"
            class="bg-gray-700 rounded-full p-2 pl-10 transition focus:w-full"
            placeholder="Search products..."
            v-model="search"
            @input="searchProducts()"
          />
          <svg
            class="absolute left-2 top-1/2 -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>

        <!-- Cart button -->
        <button id="cartButton" class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"
            />
            <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
          </svg>
          <small
            id="cartCount"
            class="bg-red-500 text-xs text-white w-4 h-4 absolute -top-2 -right-2 rounded-full"
            >{{ cartCount }}</small
          >
        </button>
      </div>
    </nav>

    <main class="flex flex-col md:flex-row container mx-auto max-w-6xl">
      <div class="space-y-4 p-2 w-full md:max-w-[10rem]">
        <h2 class="text-2xl">Filters</h2>
        <h3 class="text-xl mb-2">Category</h3>
        <div class="text-xl space-y-2">
          <div>
            <input type="checkbox" class="check mr-1" id="cameras" v-model="selectedCategories" value="cameras" />
            <label for="cameras">Cameras</label>
          </div>
          <div>
            <input type="checkbox" class="check mr-1" id="smartphones" v-model="selectedCategories" value="smartphones" />
            <label for="smartphones">Smartphones</label>
          </div>
          <div>
            <input type="checkbox" class="check mr-1" id="games" v-model="selectedCategories" value="games" />
            <label for="games">Games</label>
          </div>
          <div>
            <input type="checkbox" class="check mr-1" id="televisions" v-model="selectedCategories" value="televisions" />
            <label for="televisions">Televisions</label>
          </div>
        </div>
      </div>

      <!-- Products wrapper -->
      <div class="w-full h-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center p-4" >
        <div class="item space-y-2" v-for="product in myProducts">
          <div class="bg-gray-200 rounded flex justify-center relative overflow-hidden group cursor-pointer border"> 
            <img :src="dynamicLocalPath($route.path,product.url)" :alt="product.name" class="w-full h-full object-cover" />
            <span class="status text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0" :class="[checkToCart(product.name) ? 'bg-red-600' : 'bg-black']" @click="addToCart(product)"> {{ checkToCart(product.name) ? 'Remove From Cart' : 'Add to Cart' }}</span>
          </div>
          <p class="text-xl">{{product.name}}</p>
          <strong>{{formattedPrice(product.price)}}</strong>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Product Filtering',
  description: 'Product filtering page',
  keywords: 'product, filtering, vue, vite, nuxt,',
  twitterTitle: 'Product Filtering',
  twitterDescription: 'Product filtering page',
  twitterCard: 'summary',
  ogDescription: 'Product filtering page',
  ogTitle: 'Product Filtering',
  ogType: 'website',
})
useHead({
	htmlAttrs: {
		lang: 'en'
	},
  script: [
    {
      src: 'https://cdn.tailwindcss.com',
      async: true,
      defer: true,
    },
  ],
})

const products = [
  {
    name: 'Sony Playstation 5',
    url: './images/playstation_5.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    type: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    type: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    type: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    type: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    type: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    type: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    type: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    type: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    type: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    type: 'smartphones',
    price: 999.99,
  },
];

const search = ref('');
const myProducts = ref(products);
const selectedCategories = ref([]);
const cartList = ref([]);


const cartCount = computed(() => cartList.value.length);

const formattedPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const checkToCart = (name) => {
  return cartList.value.some((product) => product.name === name);
}

const addToCart = (productData) => {
  const index = cartList.value.findIndex((product) => product.name === productData.name);
  if (index !== -1) cartList.value.splice(index, 1); 
  else cartList.value.push(productData);
}

const filterByCategory = () => {
  if (selectedCategories.value.length === 0) myProducts.value = products;
  else myProducts.value = products.filter((product) => selectedCategories.value.includes(product.type)); 
}

const searchProducts = () => {
  const searchValue = search.value.toLowerCase();
  myProducts.value = products.filter((product) => product.name.toLowerCase().includes(searchValue));
}

watch(search, (newValue) => {
  if (newValue === '') myProducts.value = products;
});

watch(selectedCategories, filterByCategory, { deep: true });

</script>

<style scoped>


</style>