<template>
  <div class="expense-tracker">
    <h2>Expense Tracker</h2>
    <div class="container">
      <h4>Your Balance</h4>
      <h1 id="balance">$ {{ balanceTotal }}</h1>
      <div class="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p class="money plus">+${{incomeTotal}}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p class="money minus">-${{expensesTotal }}</p>
        </div>
      </div>
      <h3>History</h3>
      <ul id="list" class="list">
        <li v-for="(transact,index) in transactions" :key="index" :class="[transact.amount > 0 ? 'plus' : 'minus']">
          <span>{{ transact.text }}</span>
          <span>{{ transact.amount < 0 ? '-' : '+'}} $ {{ Math.abs(transact.amount) }}</span>
          <button class="delete-btn" @click="removeTransaction(transact.id)">x</button>
        </li>
      </ul>

      <h3>Add new transaction</h3>
      <form id="form" @submit.prevent="addTransaction">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" v-model.trim="textInput" placeholder="Enter text..." />
        </div>
        <div class="form-control">
          <label for="amount">Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" v-model.trim="amountInput" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const textInput = ref('')
const amountInput = ref('')
const transactions = ref([])
const amounts = ref([])

const state = useStorage('expense-tracker', transactions, localStorage)

watchEffect(()=> {
  amounts.value = transactions.value.map(transaction => transaction.amount);
})

const balanceTotal = computed(() => {
  return amounts.value.reduce((acc, item) => (acc += item), 0).toFixed(2);
})

const incomeTotal = computed(() => {
  return amounts.value.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
})

const expensesTotal = computed(() => {
  return (amounts.value.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
})

function addTransaction(){
  if (textInput.value == '' || amountInput.value == ''){
    alert('Please add a text and amount');
  } else {
    let transaction = {
      id: crypto.randomUUID(),
      text: textInput.value,
      amount: + amountInput.value
    }
    transactions.value.push(transaction)
    textInput.value = ''
    amountInput.value = ''
  }
  state.value = transactions.value
}

function removeTransaction(transactionId){
  transactions.value = transactions.value.filter(transaction => transaction.id !== transactionId);
}

onMounted(() => {
  if (transactions.value == null) {
    transactions.value = state.value
  }
})

</script>

<style scoped>
.expense-tracker {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
}

.container {
  margin: 30px auto;
  width: 400px;
}

h1 {
  letter-spacing: 1px;
  margin: 0;
}

h3 {
  border-bottom: 1px solid #bbb;
  padding-bottom: 10px;
  margin: 40px 0 10px;
}

h4 {
  margin: 0;
  text-transform: uppercase;
}

.inc-exp-container {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.inc-exp-container > div {
  flex: 1;
  text-align: center;
}

.inc-exp-container > div:first-of-type {
  border-right: 1px solid #dedede;
}

.money {
  font-size: 20px;
  letter-spacing: 1px;
  margin: 5px 0;
}

.money.plus {
  color: #2ecc71;
}

.money.minus {
  color: #c0392b;
}

label {
  display: inline-block;
  margin: 10px 0;
}

input[type='text'],
input[type='number'] {
  border: 1px solid #dedede;
  border-radius: 2px;
  display: block;
  font-size: 16px;
  padding: 10px;
  width: 100%;
}

.btn {
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 100%;
}

.btn:focus,
.delete-btn:focus {
  outline: 0;
}

.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}

.list li {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
}

.list li.plus {
  border-right: 5px solid #2ecc71;
}

.list li.minus {
  border-right: 5px solid #c0392b;
}

.delete-btn {
  cursor: pointer;
  background-color: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.list li:hover .delete-btn {
  opacity: 1;
}



</style>