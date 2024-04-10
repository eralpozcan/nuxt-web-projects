<template>
  <div class="infinite-blog">
    <h1>My Blog</h1>
    <div class="filter-container">
      <input
        type="text"
        id="filter"
        class="filter"
        placeholder="Filter posts..."
        v-model="filterInput"
      />
    </div>

    <div id="posts-container">
      <div
        class="post"
        v-for="(item, index) in filteredPosts"
        :key="index"
      >
        <div class="number">{{ item.id }}</div>
        <div class="post-info">
          <h2 class="post-title
          ">{{ item.title }}</h2>
          <p class="post-body">{{ item.body }}</p>
        </div>
      </div>

    </div>

    <div class="loader" v-if="loading">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
	title: 'Infinite Blog',
})
useHead({
	htmlAttrs: {
		lang: 'en'
	}
})

const limit = ref(5);
const page = ref(1);
const post = ref([]);
const loading = ref(false);
const filterInput = ref(''); 

const filteredPosts = computed(() => {
  return post.value.filter(item => {
    const title = item.title.toUpperCase();
    const body = item.body.toUpperCase();
    const term = filterInput.value.toUpperCase();

    return title.includes(term) || body.includes(term);
  });
});

async function getPost() {
  loading.value = true;
  const response = await $fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit.value}&_page=${page.value}`);
  post.value = post.value.concat(response);
  loading.value = false;
}

function showLoading() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    setTimeout(() => {
      page.value++;
      getPost();
    }, 300);
  }, 1000);
}

useEventListener(document,'scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - scrollTop === clientHeight) showLoading();
});

onMounted(() => {
  getPost();
});

</script>

<style scoped>
.infinite-blog {
  background-color: #296ca8;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding-bottom: 100px;
}

h1 {
  margin-bottom: 0;
  text-align: center;
}

.filter-container {
  margin-top: 20px;
  width: 80vw;
  max-width: 800px;
}

.filter {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

.post {
  position: relative;
  background-color: #4992d3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 20px;
  margin: 40px 0;
  display: flex;
  width: 80vw;
  max-width: 800px;
}

.post .post-title {
  margin: 0;
}

.post .post-body {
  margin: 15px 0 0;
  line-height: 1.3;
}

.post .post-info {
  margin-left: 20px;
}

.post .number {
  position: absolute;
  top: -15px;
  left: -15px;
  font-size: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #296ca8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
}

.loader {
  display: flex;
  position: fixed;
  bottom: 50px;
  transition: opacity 0.3s ease-in;
}

.circle {
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px;
  animation: bounce 0.5s ease-in infinite;
}

.circle:nth-of-type(2) {
  animation-delay: 0.1s;
}

.circle:nth-of-type(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

</style>