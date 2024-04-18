<script setup>
import currenciesData from './assets/currencies.json'
useSeoMeta({
	title: 'Exchange Rate Calculator',
  description: 'This is a simple exchange rate app that uses the ExchangeRate-API to get the latest exchange rates.',
  keywords: 'exchange rate, currency, exchange rate calculator',
  twitterTitle: 'Exchange Rate Calculator',
  twitterDescription: 'This is a simple exchange rate app that uses the ExchangeRate-API to get the latest exchange rates.',
  twitterCard: 'summary',
  ogDescription: 'Exchange Rate Calculator',
  ogTitle: 'Exchange Rate Calculator',
  ogType: 'website',
})

const selectedFromCurrency = ref('USD')
const selectedToCurrency = ref('EUR')
const fromCurrencyValue = ref(null)
const toCurrencyValue = ref(null)
const currencyRate = ref(0)
const currencies = currenciesData
const primaryColor = '#5fbaa7'

async function calculate() {
  const fromCurrencyCode = selectedFromCurrency.value;
  const toCurrencyCode = selectedToCurrency.value;
  let currenciesCurrencyData;

  const fetchAndUpdateData = async () => {
    const response = await useFetch('https://open.exchangerate-api.com/v6/latest');
    currenciesCurrencyData = response.data.value;
    localStorage.setItem('currenciesCurrencyData', JSON.stringify(currenciesCurrencyData));
  };

  const updateCurrencyValues = () => {
    currencyRate.value = currenciesCurrencyData.rates[toCurrencyCode] / currenciesCurrencyData.rates[fromCurrencyCode];
    toCurrencyValue.value = (fromCurrencyValue.value * currencyRate.value).toFixed(2);
  };

  const localData = JSON.parse(localStorage.getItem('currenciesCurrencyData'));

  if (localData) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < localData.time_next_update_unix) {
      currenciesCurrencyData = localData;
      updateCurrencyValues();
    } else {
      await fetchAndUpdateData();
      updateCurrencyValues();
    }
  } else {
    await fetchAndUpdateData();
    updateCurrencyValues();
  }
}
onMounted(() => {
	calculate()
})
</script>

<template>
  <div class="exchange-calculator">
		<h1>Exchange Rate Calculator</h1>
		<p>This is a simple exchange rate app that uses the ExchangeRate-API to get the latest exchange rates.</p>
		<img src="./assets/money.png" alt="ExchangeRate-API Logo" />

		<div class="container"> 
			<div class="currency">
				<select v-model="selectedFromCurrency">
					<option v-for="(value,key) in currencies" :value="key" :key="key">{{ value }}</option>
				</select>
				<input type="number" placeholder="0" v-model="fromCurrencyValue" />
			</div>

			<div class="swap-rate-container">
        <button class="btn" @click="calculate">
          Swap
        </button>
        <div class="rate">{{ currencyRate }}</div>
      </div>

			<div class="currency">
				<select v-model="selectedToCurrency">
					<option v-for="(value,key) in currencies" :value="key" :key="key">{{ value }}</option>
				</select>
				<input type="number" placeholder="0" v-model="toCurrencyValue" />
			</div>
		</div>
  </div>
</template>

<style scoped>
.exchange-calculator {
  background-color: #f4f4f4;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
}

h1 {
	color: v-bind(primaryColor);
}

p {
  text-align: center;
}

.btn {
  color: #fff;
	background: v-bind(primaryColor);
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px 12px;
}

.money-img {
  width: 150px;
}

.currency {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.currency select {
  padding: 10px 20px 10px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #dedede;
  font-size: 16px;
  /*  You may not need these following lines. The arrow did not show for me on MacOS/Chrome so I added it. Just remove it if you would like  */
  background: transparent;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-position: right 10px top 50%, 0, 0;
  background-size: 12px auto, 100%;
  background-repeat: no-repeat;
}

.currency input {
  border: 0;
  background: transparent;
  font-size: 30px;
  text-align: right;
}

.swap-rate-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rate {
	color: v-bind(primaryColor);
  font-size: 14px;
  padding: 0 10px;
}

select:focus,
input:focus,
button:focus {
  outline: 0;
}

@media (max-width: 600px) {
  .currency input {
    width: 200px;
  }
}
</style>