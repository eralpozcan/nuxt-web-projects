<script setup>
useSeoMeta({
  title: 'Movie Seat Booking',
  description: 'Movie Seat Booking',
  keywords: 'movie, seat, booking, vue, vite, nuxt,',
  twitterTitle: 'Movie Seat Booking',
  twitterDescription: 'Movie Seat Booking',
  twitterCard: 'summary',
  ogDescription: 'Movie Seat Booking',
  ogTitle: 'Movie Seat Booking',
  ogType: 'website',
})

const movies = ref([
  { name: 'Avengers: Endgame', price: 10 },
  { name: 'Joker', price: 12 },
  { name: 'Toy Story 4', price: 8 },
  { name: 'The Lion King', price: 9 }
]);
const selectedMovie = ref(10); // Default selected movie price
const seats = ref([]); // Array to hold seat status
const selectedSeats = ref(0); // Number of selected seats
const totalPrice = ref(0); // Total price of selected seats

onMounted(() => {
  initializeSeats();
});

watch(selectedMovie, () => {
  initializeSeats();
});

function initializeSeats() {
  seats.value = [];
  for (let i = 0; i < 5; i++) {
    const row = []  
    for (let j = 0; j < 10; j++) {
      row.push({ occupied: Math.random() < 0.5, selected: false });    }
    seats.value.push(row)
  }
}

function toggleSeat(rowIndex, seatIndex) {
  if (!seats.value[rowIndex][seatIndex].occupied) {
    seats.value[rowIndex][seatIndex].selected = !seats.value[rowIndex][seatIndex].selected
    calculateTotal();
  }
}

function calculateTotal() {
  let selectedSeatsCount = 0
  let totalPriceValue = 0
  seats.value.forEach(row => {
    row.forEach(seat => {
      if (seat.selected) {
        selectedSeatsCount++
        totalPriceValue += selectedMovie.value
      }
    })
  })
  selectedSeats.value = selectedSeatsCount
  totalPrice.value = totalPriceValue
}
</script>

<template>
  <div class="movie-seat-booking">
    <div class="movie-container">
      <label>Pick a movie:</label>
      <select id="movie" v-model="selectedMovie">
        <option v-for="(movie, index) in movies" :key="index" :value="movie.price">{{ movie.name }} (${{ movie.price }})</option>
      </select>
    </div>
    <ul class="showcase">
      <li>
        <div class="seat"></div>
        <small>N/A</small>
      </li>
      <li>
        <div class="seat selected"></div>
        <small>Selected</small>
      </li>
      <li>
        <div class="seat occupied"></div>
        <small>Occupied</small>
      </li>
    </ul>

    <div class="container">
      <div class="screen"></div>
      <div class="row" v-for="(row, rowIndex) in seats" :key="rowIndex">
        <div class="seat" v-for="(seat, seatIndex) in row" :key="seatIndex" :class="{ 'occupied': seat.occupied, 'selected': seat.selected }" @click="toggleSeat(rowIndex, seatIndex)"></div>
      </div>
    </div>

    <p class="text">
      You have selected <span id="count">{{ selectedSeats }}</span> seats for a price of $<span id="total">{{ totalPrice }}</span>
    </p>
  </div>
</template>

<style scoped>
.movie-seat-booking {
  background-color: #242333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Lato', sans-serif;
  margin: 0;
}
.movie-container {
  margin: 20px 0;
}

.movie-container select {
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
  padding: 5px 15px 5px 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
.container {
  perspective: 1000px;
  margin-bottom: 30px;
}

.seat {
  background-color: #444451;
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.seat.selected {
  background-color: #6feaf6;
}

.seat.occupied {
  background-color: #fff;
}

.seat:nth-of-type(2) {
  margin-right: 18px;
}

.seat:nth-last-of-type(2) {
  margin-left: 18px;
}

.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.showcase .seat:not(.occupied):hover {
  cursor: default;
  transform: scale(1);
}

.showcase {
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}

.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

.showcase li small {
  margin-left: 2px;
}

.row {
  display: flex;
}

.screen {
  background-color: #fff;
  height: 70px;
  width: 100%;
  margin: 15px 0;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}

p.text {
  margin: 5px 0;
}

p.text span {
  color: #6feaf6;
}

</style>