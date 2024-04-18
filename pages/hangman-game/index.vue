<script setup>
useSeoMeta({
	title: 'Hangman',
  description: 'This is a simple Hangman-Game',
  keywords: 'hangman, game, nuxt, vue',
  twitterTitle: 'Hangman',
  twitterDescription: 'This is a simple Hangman-Game',
  ogTitle: 'Hangman',
  ogDescription: 'This is a simple Hangman-Game',
})

const words = ref(['application','programming','interface','wizard'])
const selectedWord = ref(words.value[Math.floor(Math.random() * words.value.length)].split(''))
const playable = ref(true)
const correctLetters = ref([])
const wrongLetters = ref([])
const isShowNotification = ref(false)
const figureParts = ref(null)
const isWon = ref(false)

const isFailed = computed(()=> {
  if (wrongLetters.value?.length === figureParts.value?.length) {
    playable.value = false
    return true
  } else return false
})

function showNotification() {
	isShowNotification.value = true
	setTimeout(() => {
		isShowNotification.value = false
	},2000);
}

function updateWrongLetters() {
	figureParts.value.forEach((part, index) => {
		const errors = wrongLetters.value.length;
		if (index < errors) part.style.display = 'block';
		else part.style.display = 'none';
	});
}

function selectWord() {
  selectedWord.value = words.value[Math.floor(Math.random() * words.value.length)].split('');
}

function playAgain() {
  playable.value = true
  correctLetters.value = []
  wrongLetters.value = []
  isWon.value = false
  updateWrongLetters()
  selectWord()
}

function isValidKey(key) {
  return /[a-z']/.test(key);
}

function isWordGuessed() {
  return selectedWord.value.every(letter => correctLetters.value.includes(letter));
}

onMounted(()=> {
  figureParts.value = document.querySelectorAll(".figure-part")
})

useEventListener(document, 'keydown', (e) => {
  if (!playable.value || isWon.value || isFailed.value) return;
  const keyPressed = e.key.toLowerCase();
  if (!isValidKey(keyPressed)) {
    showNotification();
    return;
  }
  if (selectedWord.value.includes(keyPressed)) {
    if (!correctLetters.value.includes(keyPressed)) {
      correctLetters.value.push(keyPressed);
    } else {
      showNotification();
    }
  } else if (!wrongLetters.value.includes(keyPressed)) {
    wrongLetters.value.push(keyPressed);
    updateWrongLetters();
  } else {
    showNotification();
  }
  if (isWordGuessed()) {
    isWon.value = true;
  }
});

</script>

<template>
	<div class="hangman-game">
		<h1>Hangman</h1>
		<p>Find the hidden word - Enter a letter</p>
		<div class="game-container">
			<svg height="250" width="200" class="figure-container">
				<!-- Rod -->
				<line x1="60" y1="20" x2="140" y2="20" />
				<line x1="140" y1="20" x2="140" y2="50" />
				<line x1="60" y1="20" x2="60" y2="230" />
				<line x1="20" y1="230" x2="100" y2="230" />

				<!-- Head -->
				<circle cx="140" cy="70" r="20" class="figure-part" />
				<!-- Body -->
				<line x1="140" y1="90" x2="140" y2="150" class="figure-part" />
				<!-- Arms -->
				<line x1="140" y1="120" x2="120" y2="100" class="figure-part" />
				<line x1="140" y1="120" x2="160" y2="100" class="figure-part" />
				<!-- Legs -->
				<line x1="140" y1="150" x2="120" y2="180" class="figure-part" />
				<line x1="140" y1="150" x2="160" y2="180" class="figure-part" />
			</svg>

			<div class="wrong-letters-container" v-if="wrongLetters.length > 0">
        <p>Wrong</p>
				<div id="wrong-letters"> {{ wrongLetters }}</div>
			</div>

			<div class="word">
        <span v-for="(letter, index) in selectedWord" :key="index" class="letter">
          {{ correctLetters.includes(letter) ? letter : '' }}

        </span>
      </div>
		</div>

		<!-- Container for final message -->
		<div class="popup-container" :style="{ display: [ isFailed || isWon ? 'flex' : 'none'] }">
			<div class="popup">
				<h2 class="final-message">
          {{ isWon ? `Congratulations! You won! 😃`: `Unfortunately you lost. 😕` }}
        </h2>
				<h3 class="final-message-reveal-word" v-if="isFailed">
          {{ `...the word was: ${selectedWord}` }}
        </h3>
				<button @click="playAgain">Play Again</button>
			</div>
		</div>

		<!-- Notification -->
		<div class="notification-container" :class="{'show': isShowNotification}" :style="{'display': isShowNotification ? 'block':'none'}">
			<p>You have already entered this letter</p>
		</div>
	</div>
</template>

<style scoped>
.hangman-game {
  background-color: #34495e;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

h1 {
  margin: 20px 0 0;
}

.game-container {
  padding: 20px 30px;
  position: relative;
  margin: auto;
  height: 350px;
  width: 450px;
}

.figure-container {
  fill: transparent;
  stroke: #fff;
  stroke-width: 4px;
  stroke-linecap: round;
}

.figure-part {
  display: none;
}

.wrong-letters-container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  text-align: right;
}

.wrong-letters-container p {
  margin: 0 0 5px;
}

.wrong-letters-container span {
  font-size: 24px;
}

.word {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.letter {
  border-bottom: 3px solid #2980b9;
  display: inline-flex;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
  height: 50px;
  width: 20px;
}

.popup-container {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
}

.popup {
  background: #2980b9;
  border-radius: 5px;
  box-shadow: 0 15px 10px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.popup button {
  cursor: pointer;
  background-color: #fff;
  color: #2980b9;
  border: 0;
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
}

.popup button:active {
  transform: scale(0.98);
}

.popup button:focus {
  outline: 0;
}

.notification-container {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px 10px 0 0;
  padding: 15px 20px;
  position: absolute;
  bottom: -50px;
  transition: transform 0.3s ease-in-out;
}

.notification-container p {
  margin: 0;
}

.notification-container.show {
  transform: translateY(-50px);
}



</style>