<template>
  <div class="speech-text-reader">
    <div class="container">
      <h1>Speech Text Reader</h1>
      <button class="btn btn-toggle" @click="toogleTextBox">
        Toggle Text Box
      </button>
      <div class="text-box" :class="{'show': textBoxToggle}">
        <div class="close" @click="toogleTextBox">X</div>
        <h3>Choose Voice</h3>
        <select v-model="selectedVoice">
          <option v-for="(voice,index) in voices" :key="index" :value="voice.name"> {{ voice.name + voice.lang }}</option>
        </select>
        <textarea id="text" placeholder="Enter text to read..." v-model="textArea"></textarea>
        <button class="btn" @click="readText">Read Text</button>
      </div>
      <main>
        <div v-for="(data,index) in speechTextData" :key="index" class="box" @click="speakText(data.text)" >
          <img :src="dynamicLocalPath($route.path,data.image)" :alt="data.text"/>
          <p class="info"> {{  data.text }} </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
	title: 'Speech Text Reader',
})
useHead({
	htmlAttrs: {
		lang: 'en'
	}
})
const speechTextData = ref(
[
  {
    image: 'images/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: 'images/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: 'images/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: 'images/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: 'images/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: 'images/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: 'images/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: 'images/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: 'images/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: 'images/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: 'images/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: 'images/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
])

const voices = ref([]);
const textBoxToggle = ref(false);
const textArea = ref('');
const selectedVoice = ref('');

function getVoices() {
  voices.value = speechSynthesis.getVoices();
}

function toogleTextBox() {
  textBoxToggle.value = !textBoxToggle.value;
}

function speakText(text) {
  const message = new SpeechSynthesisUtterance();
  message.voice = voices.value.find(voice => voice.name === selectedVoice.value);
  message.text = text;
  message.volume = 1;
  message.rate = 1;
  message.pitch = 1;
  window.speechSynthesis.speak(message);
}

function readText() {
  speakText(textArea.value)
}

onMounted(() => {
  getVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
  }
});


</script>

<style scoped>
.speech-text-reader {
  background: #ffefea;
  font-family: 'Lato', sans-serif;
  min-height: 100vh;
  margin: 0;
}

h1 {
  text-align: center;
}

.container {
  margin: auto;
  padding: 20px;
}

.btn {
  cursor: pointer;
  background-color: darksalmon;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  padding: 8px;
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus,
select:focus {
  outline: 0;
}

.btn-toggle {
  display: block;
  margin: auto;
  margin-bottom: 20px;
}

.text-box {
  width: 70%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -800px);
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  transition: all 1s ease-in-out;
}

.text-box.show {
  transform: translate(-50%, 0);
}

.text-box select {
  background-color: darksalmon;
  border: 0;
  color: #fff;
  font-size: 12px;
  height: 30px;
  width: 100%;
}

.text-box textarea {
  border: 1px #dadada solid;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
  margin: 15px 0;
  width: 100%;
  height: 150px;
}

.text-box .btn {
  width: 100%;
}

.text-box .close {
  float: right;
  text-align: right;
  cursor: pointer;
}

main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.box {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.2s ease-out;
}

.box.active {
  box-shadow: 0 0 10px 5px darksalmon;
}

.box img {
  width: 100%;
  object-fit: cover;
  height: 200px;
}

.box .info {
  background-color: darksalmon;
  color: #fff;
  font-size: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
  padding: 10px;
  text-align: center;
  height: 100%;
}

@media (max-width: 1100px) {
  main {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 760px) {
  main {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  main {
    grid-template-columns: 1fr;
  }
}
</style>