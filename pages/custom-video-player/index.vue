<template>
  <div class="custom-video-player">
    <h1>Custom Video Player</h1>
    <video ref="video" poster="./assets/poster.webp" preload="metadata">
      <source src="./assets/gone.mp4" type="video/mp4" />
    </video>
    <div class="controls">
      <button class="btn" ref="play" @click="toggleVideoStatus()" aria-label="play">
        <i class="fa fa-2x" :class="{ 'fa-play': !isPaused, 'fa-pause': isPaused }"></i>
      </button>
      <button class="btn" ref="stop" @click="stopVideo()" aria-label="stop">
        <i class="fa fa-stop fa-2x"></i>
      </button>
      <input type="range" ref="progress" class="progress" min="0" max="100" step="0.1" value="0" aria-label="progress" />
      <span class="timestamp" ref="timestamp">00:00</span>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Custom Video Player',
})
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css',
    }
  ]
})

const video = ref(null)
const play = ref(null)
const stop = ref(null)
const progress = ref(null)
const timestamp = ref(null)
const isPaused = ref(false)

function toggleVideoStatus() {
  if (video.value.paused) video.value.play()
  else video.value.pause()
}

function updatePlayIcon() {
  if (video.value.paused) isPaused.value = false
  else isPaused.value = true
}

function updateProgress() {
  progress.value.value = (video.value.currentTime / video.value.duration) * 100

  let mins = Math.floor(video.value.currentTime / 60)
  if (mins < 10) mins = '0' + String(mins)

  let secs = Math.floor(video.value.currentTime % 60)
  if (secs < 10) secs = '0' + String(secs)

  timestamp.value.innerHTML = `${mins}:${secs}`
}

function setVideoProgress() {
  video.value.currentTime = (+progress.value.value * video.value.duration) / 100
}

function stopVideo() {
  video.value.currentTime = 0
  toggleVideoStatus()
}

watch(video, () => {
  video.value.addEventListener('pause', updatePlayIcon)
  video.value.addEventListener('play', updatePlayIcon)
  video.value.addEventListener('timeupdate', updateProgress)
  video.value.addEventListener('stop', stopVideo)
})
useEventListener('change', setVideoProgress, progress)
</script>

<style scoped>
.custom-video-player {
  font-family: 'Questrial', sans-serif;
  background-color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
}


h1 {
  color: #fff;
}

.screen {
  cursor: pointer;
  width: 100%;
  background-color: #000 !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.controls {
  background: #333;
  width: 60%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
}

.controls .btn {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.controls .fa-play {
  color: #28a745;
}

.controls .fa-stop {
  color: #dc3545;
}

.controls .fa-pause {
  color: #fff;
}

.controls .timestamp {
  color: #fff;
  font-weight: bold;
  margin-left: 10px;
}

.btn:focus {
  outline: 0;
}

@media (max-width: 800px) {

  .screen,
  .controls {
    width: 90%;
  }
}

input[type='range'] {
  -webkit-appearance: none;
  /* Hides the slider so that custom slider can be made */
  width: 100%;
  /* Specific width is required for Firefox. */
  background: transparent;
  /* Otherwise white in Chrome */
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type='range']:focus {
  outline: none;
  /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type='range']::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

/* Special styling for WebKit/Blink */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin-top: -14px;
  /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  /* Add cool effects to your sliders! */
}

/* All the same stuff for Firefox */
input[type='range']::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

/* All the same stuff for IE */
input[type='range']::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type='range']:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}

input[type='range']::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type='range']::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type='range']::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type='range']:focus::-ms-fill-lower {
  background: #3071a9;
}

input[type='range']::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type='range']:focus::-ms-fill-upper {
  background: #367ebd;
}
</style>