<template>
  <div class="typing-game">
    <button class="settings-btn" @click="settingsBtn">
      <i class="fas fa-cog"></i>
    </button>

    <div v-if="settings" class="settings">
      <form id="settings-form">
        <div>
          <label for="difficulty">Difficulty</label>
          <select id="difficulty" v-model="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </form>
    </div>

    <div class="container">
      <div v-if="isGameOver">
        <h2>👩‍💻 Speed Typer 👨‍💻</h2>
        <small>Type the following:</small>

        <h1> {{ randWord }}</h1>

        <input
          type="text"
          id="text"
          autocomplete="off"
          placeholder="Type the word here..."
          autofocus
          v-model="insertText"
          @input="inputCheck"
        />

        <p class="time-container">Time left: <span>{{ time }}s</span></p>

        <p class="score-container">Score: <span>{{ score }}</span></p>
      </div>
      <div v-else class="end-game-container">
        <h1>Time ran out</h1>
        <p>Your final score is {{score}}</p>
        <button @click="reload">Reload</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

useSeoMeta({
	title: 'Typing Game',
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

const words = ref([  
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
])
const randWord = ref('')
const score = ref(0)
const time = ref(10)
const settings = ref(true)
const insertText = ref('')
const isGameOver = ref(true)
const difficulty = ref('easy')
const difficultState = useStorage('difficulty', difficulty, localStorage)
const timeInterval = setInterval(updateTime, 1000);


function getRandomWord() {
  randWord.value = words.value[Math.floor(Math.random() * words.value.length)]
  return randWord.value
}

function inputCheck() {
  if (insertText.value === randWord.value) {
    score.value++
    addTime()
    randWord.value = getRandomWord()
    insertText.value = ''
  }
}
function addTime() {
  const timeToAdd = {
    'hard': 2,
    'medium': 3,
    'easy': 5
  };
  time.value += timeToAdd[difficulty.value];
}
function updateTime() {
  time.value--;
  if (time.value === 0) {
    clearInterval(timeInterval);
    // end game
    isGameOver.value = false
  }
}
function settingsBtn() {
  settings.value = !settings.value
}
function reload() {
  location.reload()
}
onMounted(() => {
  getRandomWord()
})

onBeforeUnmount(() => {
  clearInterval(timeInterval);
})
</script>

<style scoped>

.typing-game {
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

button {
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  padding: 5px 15px;
}

select {
  width: 200px;
  padding: 5px;
  margin: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 0;
  background-color: #a7c5e3;
}

select:focus,
button:focus {
  outline: 0;
}

.settings-btn {
  position: absolute;
  bottom: 30px;
  left: 30px;
}

.settings {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: 70px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}

.settings.hide {
  transform: translateY(-100%);
}

.container {
  background-color: #34495e;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  color: #fff;
  position: relative;
  text-align: center;
  width: 500px;
}

h2 {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 4px;
  margin: 0 0 40px;
}

h1 {
  margin: 0;
}

input {
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
  padding: 12px 20px;
  margin-top: 10px;
}

.score-container {
  position: absolute;
  top: 60px;
  right: 20px;
}

.time-container {
  position: absolute;
  top: 60px;
  left: 20px;
}

.end-game-container {
  background-color: inherit;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: inherit;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>