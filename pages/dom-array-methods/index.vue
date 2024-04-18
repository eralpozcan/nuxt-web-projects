
<script setup>
useSeoMeta({
	title: 'DOM Array Methods',
  description: 'DOM Array Methods',
  keywords: 'dom, array, methods, nuxt',
  twitterTitle: 'DOM Array Methods',
  twitterDescription: 'DOM Array Methods',
  twitterCard: 'summary',
  ogDescription: 'DOM Array Methods',
  ogTitle: 'DOM Array Methods',
  ogType: 'website',
})
const data = ref([]);
const totalWealthStatus = ref(false);
const totalWealth = ref(0);
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
}

function doubleMoney() {
  data.value = data.value.map(user => {
    return { ...user, money: user.money * 2 }
  })
}
function showMillionaires() {
  data.value = data.value.filter(user => user.money > 1000000)
}

function sortByRichest() {
  data.value.sort((a, b) => b.money - a.money)
}

function calculateWealth() {
  totalWealth.value = data.value.reduce((acc, user) => (acc += user.money), 0)
  totalWealthStatus.value = !totalWealthStatus.value
}
function addData(obj) {
  data.value.push(obj)
}
const formatMoney = computed(() => (number) => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
})
</script>

<template>
  <div class="dom-array-methods">
    <h1>DOM Array Methods</h1>
    <div class="container">
      <aside>
        <button @click.stop="getRandomUser">Add User 👱‍♂️</button>
        <button @click.stop="doubleMoney">Double Money 💰</button>
        <button @click.stop="showMillionaires">Show Only Millionaires 💵</button>
        <button @click.stop="sortByRichest">Sort by Richest ↓</button>
        <button @click.stop="calculateWealth">Calculate entire Wealth 🧮</button>
      </aside>
      <main id="main">
        <h2><strong>Person</strong> Wealth</h2>
        <h2 v-for="(person) in data" :key="person"><strong>{{ person.name }}</strong> {{ formatMoney(person.money) }}</h2>
        <h3 v-if="totalWealthStatus">Total Wealth: <strong>{{formatMoney(totalWealth)}}</strong></h3>
      </main>
    </div>
  </div>
</template>

<style scoped>

.dom-array-methods {
  background: #f4f4f4;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  display: flex;
  padding: 20px;
  margin: 0 auto;
  max-width: 100%;
  width: 800px;
}

aside {
  padding: 10px 20px;
  width: 250px;
  border-right: 1px solid #111;
}

button {
  cursor: pointer;
  background-color: #fff;
  border: solid 1px #111;
  border-radius: 5px;
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
}

main {
  flex: 1;
  padding: 10px 20px;
}

h2 {
  border-bottom: 1px solid #111;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  margin: 0 0 20px;
}

h3 {
  background-color: #fff;
  border-bottom: 1px solid #111;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  margin: 20px 0 0;
}

.person {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>