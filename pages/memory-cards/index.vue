<template>
  <div class="memory-cards">
    <button class="clear btn" @click="clearCards">
      <i class="fas fa-trash"></i> Clear Cards
    </button>
    <h1>
      Memory Cards
      <button class="btn btn-small" @click="addCardContainerToggle">
        <i class="fas fa-plus"></i> Add New Card
      </button>
    </h1>
    <div class="cards" >
      <div 
      v-for="(data,index) in cardsData" 
      class="card" 
      :class="{'active': index === currentCardActive, 
        'show-answer': showAnswer,
        'left': index < currentCardActive,
        'right': index > currentCardActive
      }" 
      @click="cardFlip">
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              {{ index }}
              {{ data.question }}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              {{ data.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="navigation">
      <button class="nav-button" @click="prevNav">
        <i class="fas fa-arrow-left"></i>
      </button>

      <p v-if="cardsData.length"> {{ currentCardActive + 1 }} / {{ cardsData.length }}</p>

      <button class="nav-button" @click="nextNav">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <div class="add-container" :class="{'show' : addCardContainer}">
      <h1>
        Add New Card
        <button class="btn btn-small btn-ghost" @click="addCardContainerToggle">
          <i class="fas fa-times"></i>
        </button>
      </h1>

      <div class="form-group">
        <label for="question">Question</label>
        <textarea id="question" placeholder="Enter question..." v-model.trim="questionInput"></textarea>
      </div>

      <div class="form-group">
        <label for="answer">Answer</label>
        <textarea id="answer" placeholder="Enter Answer..." v-model.trim="answerInput"></textarea>
      </div>

      <button class="btn" @click="addNewCard">
        <i class="fas fa-plus"></i> Add Card
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

useSeoMeta({
	title: 'Memory Cards',
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


const questionInput = ref('');
const answerInput = ref('');
const currentCardActive = ref(0);
const cardsData = ref([]);
const cardsDataStorage = useStorage('cards', cardsData, localStorage)
const addCardContainer = ref(false);
const showAnswer = ref(false);

function cardFlip() {
  showAnswer.value = !showAnswer.value;
}

function prevNav() {
  if (currentCardActive.value > 0) {
    currentCardActive.value--;
  }
}
function nextNav() {
  if (currentCardActive.value < cardsData.value.length - 1) {
    currentCardActive.value++;
  }
}

function addNewCard() {
  if (questionInput.value && answerInput.value) {
    const newCard = {
      question: questionInput.value,
      answer: answerInput.value
    };
    cardsData.value.push(newCard);
    addCardContainer.value = false;
  }
}

function clearCards() {
  cardsData.value = [];
}
function addCardContainerToggle() {
  addCardContainer.value = !addCardContainer.value;
}

</script>
<style scoped>
.memory-cards {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  font-family: 'Lato', sans-serif;
}

h1 {
  position: relative;
}

h1 button {
  position: absolute;
  right: 0;
  transform: translate(120%, -50%);
  z-index: 2;
}

.btn {
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px 15px;
}

.btn-small {
  font-size: 12px;
  padding: 5px 10px;
}

.btn-ghost {
  border: 0;
  background-color: transparent;
}

.clear {
  position: absolute;
  bottom: 30px;
  left: 30px;
}

.cards {
  perspective: 1000px;
  position: relative;
  height: 300px;
  width: 500px;
  max-width: 100%;
}

.card {
  position: absolute;
  opacity: 0;
  font-size: 1.5em;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: translateX(50%) rotateY(-10deg);
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.card.active {
  cursor: pointer;
  opacity: 1;
  z-index: 10;
  transform: translateX(0) rotateY(0deg);
}

.card.left {
  transform: translateX(-50%) rotateY(10deg);
}

.inner-card {
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}

.card.show-answer .inner-card {
  transform: rotateX(180deg);
}

.inner-card-front,
.inner-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #fff;
}

.inner-card-front {
  transform: rotateX(0deg);
  z-index: 2;
}

.inner-card-back {
  transform: rotateX(180deg);
}

.inner-card-front::after,
.inner-card-back::after {
  content: '\f021  Flip';
  font-family: 'Font Awesome 5 Free', Lato, sans-serif;
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
}

.navigation {
  display: flex;
  margin: 20px 0;
}

.navigation .nav-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
}

.navigation p {
  margin: 0 25px;
}

.add-container {
  opacity: 0;
  z-index: -1;
  background-color: #f0f0f0;
  border-top: 2px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  transition: 0.3s ease;
}

.add-container.show {
  opacity: 1;
  z-index: 2;
}

.add-container h3 {
  margin: 10px 0;
}

.form-group label {
  display: block;
  margin: 20px 0 10px;
}

.form-group textarea {
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 16px;
  padding: 12px;
  min-width: 500px;
  max-width: 100%;
}
</style>