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
        <div id="filters-container" class="text-xl space-y-2">
            <input type="checkbox" class="check mr-1"/>
            <label for="cameras">Cameras</label>
          <div>
            <input type="checkbox" class="check mr-1"/>
            <label for="smartphones">Smartphones</label>
          </div>
          <div>
            <input type="checkbox" class="check mr-1"/>
            <label for="games">Games</label>
          </div>
          <div>
            <input type="checkbox" class="check mr-1"/>
            <label for="televisions">Televisions</label>
          </div>
        </div>
      </div>

      <!-- Products wrapper -->
      <div class="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center p-4" >
        <div class="item space-y-2" v-for="product in products">
          <div class="bg-gray-200 rounded flex justify-center relative overflow-hidden group cursor-pointer border"> 
            <img :src="dynamicLocalPath($route.path,product.url)" :alt="product.name" class="w-full h-full object-cover" />
            <span class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0" @click="addToCart()"> Add To Cart</span>
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
})
useHead({
	htmlAttrs: {
		lang: 'en'
	},
  script: [
    {
      src: 'https://cdn.tailwindcss.com',
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

const cartCount = ref(0);

const formattedPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const addToCart = () => {
  cartCount.value++;
}

const filterProducts = (type) => {
  return products.filter((product) => product.type === type);
}


</script>

<style scoped>


</style>