<template>
  <div class="speak-number-guess">
    <img src="./img/mic.png" alt="Speak" />
    <h1>Guess a Number Between 1 - 100</h1>
    <h3>Speak the number into your microphone</h3>
    <div class="msg">
      <div>You said:</div>
      <span class="box">{{ guessedMessage }}</span>
      <div v-if="goLower">GO LOWER</div>
      <div v-if="goHigher">GO HIGHER</div>
      <div v-if="isNotNumber">That is not a valid number</div>
      <div v-if="isBeetweenNumber">Number must be between 1 and 100</div>
    </div>
    <h2 v-if="isGuessed">{{ congratulationMessage }}</h2>
    <button v-if="isGuessed" class="play-again" @click="restartGame">Play Again</button>
  </div>
</template>

<script setup>
const guessedMessage = ref('Speak the number into your microphone');
const congratulationMessage = ref('');
const randomNumber = ref();
const goLower = ref(false);
const goHigher = ref(false);
const isNotNumber = ref(false);
const isBeetweenNumber = ref(false);
const isGuessed = ref(false);

function checkApi() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = function() {
    console.log('Voice is activated, you can speak now');
  }

  recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    guessedMessage.value = transcript;
    checkNumber(transcript);
  }

  recognition.start();
}

function checkNumber(msg) {
  const num = +msg;
  resetMessages();

  if (Number.isNaN(num)) {
    isNotNumber.value = true;
    return;
  }

  if (num > 100 || num < 1) {
    isBeetweenNumber.value = true;
    return;
  }

  if (num === randomNumber.value) {
    congratulationMessage.value = `Congrats! You have guessed the number! It was ${num}`;
    isGuessed.value = true;
  } else if (num > randomNumber.value) {
    goLower.value = true;
  } else {
    goHigher.value = true;
  }
}

function resetMessages() {
  goLower.value = false;
  goHigher.value = false;
  isNotNumber.value = false;
  isBeetweenNumber.value = false;
}

function getRandomNumber() {
  randomNumber.value = Math.floor(Math.random() * 100) + 1;
}

function restartGame() {
  resetMessages();
  isGuessed.value = false;
  congratulationMessage.value = '';
  guessedMessage.value = 'Speak the number into your microphone';
  getRandomNumber();
  checkApi();
}

onMounted(() => {
  getRandomNumber();
  checkApi();
});
</script>

<style scoped>
.speak-number-guess {
  background: #2f3542 url('img/bg.jpg') no-repeat left center/cover;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

h1,
h3 {
  margin-bottom: 0;
}

p {
  line-height: 1.5;
  margin: 0;
}

.play-again {
  padding: 8px 15px;
  border: 0;
  background: #f4f4f4;
  border-radius: 5px;
  margin-top: 10px;
}

.msg {
  font-size: 1.5em;
  margin-top: 40px;
}

.box {
  border: 1px solid #dedede;
  display: inline-block;
  font-size: 30px;
  margin: 20px;
  padding: 10px;
}
</style>
