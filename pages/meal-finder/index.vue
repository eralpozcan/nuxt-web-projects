<script setup>
useSeoMeta({
  title: 'Meal Finder App',
  description: 'Meal Finder App',
  keywords: 'meal, finder, vue, vite, nuxt,',
  twitterTitle: 'Meal Finder App',
  twitterDescription: 'Meal Finder App',
  twitterCard: 'summary',
  ogDescription: 'Meal Finder App',
  ogTitle: 'Meal Finder App',
  ogType: 'website',
})
useHead({
	htmlAttrs: {
		lang: 'en'
	},
	link: [
    {
			rel: 'stylesheet',
			href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css',
			integrity: 'sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=',
			crossorigin: 'anonymous'
		}
	]
})
const search = ref('')
const result = ref('')
const meals = ref(null)
const isRandom = ref(false)
const ingredients = ref([])

function initDetailPage(data){
  meals.value = data.meals[0]
  setIngredients(data.meals[0])
  result.value = false
  isRandom.value = true
}

function setIngredients(meal){
  ingredients.value = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.value.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }
}

async function searchMealByName(){
  isRandom.value = false
  meals.value = null
  if (search.value != '') {
    const data = await $fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`);
    result.value = data.meals ? search.value : ''
    meals.value = data.meals
  }
  search.value = ''
}

async function getMealById(mealID) {
  const data = await $fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  initDetailPage(data)
}

async function getRandomMeal() {
  const data = await $fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  initDetailPage(data)
}
</script>

<template>
  <div class="meal-finder">
    <div class="container">
      <h1>Meal Finder</h1>
      <div class="flex">
        <form class="flex" @submit.prevent="searchMealByName">
          <input
            id="search"
            type="text"
            v-model.trim="search"
            placeholder="Search for meals or keywords"
          />
          <button class="search-btn" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>

        <button class="random-btn" @click="getRandomMeal">
          <i class="fas fa-random"></i>
        </button>
      </div>

      <div id="result-heading">
        <h2 v-if="result"> Search results for {{result}}:</h2>
      </div>
      <div v-if="!isRandom" class="meals">
        <div class="meal" v-for="(meal,index) in meals" :key="index">
          <NuxtImg :src="meal.strMealThumb" :alt="meal.strMeal" loading="lazy" />
          <div class="meal-info" @click="getMealById(meal.idMeal)">
            <h3> {{ meal.strMeal }}</h3>
          </div>
        </div>
      </div>
      <div v-if="isRandom" class="single-meal">
        <h1> {{ meals.strMeal }}</h1>
        <NuxtImg :src="meals.strMealThumb" :alt="meals.strMeal" loading="lazy"/>
        <div class="single-meal-info">
          <p v-if="meals.strCategory"> {{ meals.strCategory }}</p>
          <p v-if="meals.strArea"> {{ meals.strArea }}</p>
        </div>
        <div class="main">
          <p>{{ meals.strInstructions }}</p>
          <h2>Ingredients</h2>
          <ul>
            <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.meal-finder {
  background: #2d2013;
  color: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0;
  min-height: 100vh;
  height: 100%;
}

.container {
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.flex {
  display: flex;
}

input,
button {
  border: 1px solid #dedede;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  padding: 8px 10px;
  margin: 0;
}

input[type='text'] {
  width: 300px;
}

.search-btn {
  cursor: pointer;
  border-left: 0;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.random-btn {
  cursor: pointer;
  margin-left: 10px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.meals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}

.meal {
  cursor: pointer;
  position: relative;
  height: 180px;
  width: 180px;
  text-align: center;
}

.meal img {
  width: 100%;
  height: 100%;
  border: 4px #fff solid;
  border-radius: 2px;
}

.meal-info {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in;
  opacity: 0;
}

.meal:hover .meal-info {
  opacity: 1;
}

.single-meal {
  margin: 30px auto;
  width: 70%;
}

.single-meal img {
  width: 300px;
  margin: 15px;
  border: 4px #fff solid;
  border-radius: 2px;
}

.single-meal-info {
  margin: 20px;
  padding: 10px;
  border: 2px #e09850 dashed;
  border-radius: 5px;
}

.single-meal p {
  margin: 0;
  letter-spacing: 0.5px;
  line-height: 1.5;
}

.single-meal ul {
  padding-left: 0;
  list-style-type: none;
}

.single-meal ul li {
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: #fff;
  display: inline-block;
  color: #2d2013;
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  margin: 0 5px 5px 0;
}

@media (max-width: 800px) {
  .meals {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .meals {
    grid-template-columns: repeat(2, 1fr);
  }

  .meal {
    height: 200px;
    width: 200px;
  }
}
@media (max-width: 500px) {
  input[type='text'] {
    width: 100%;
  }

  .meals {
    grid-template-columns: 1fr;
  }

  .meal {
    height: 300px;
    width: 300px;
  }
}
</style>