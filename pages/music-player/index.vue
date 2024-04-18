<template>
  <div class="music-player">
    <h1>Music Player</h1>
    <div class="music-container" id="music-container" :class="{'play': isPlay}">
      <div class="music-info">
        <h4 v-if="isPlay"> {{ currentSong.name }}</h4>
        <div class="progress-container" @click="setProgress">
          <div class="progress" ref="progress"></div>
        </div>
      </div>
      <audio ref="audio">
        <source :src="musicPath" >
      </audio>
      <div class="img-container">
        <img :src="imagePath" alt="music-cover" loading="lazy" />
      </div>
      <div class="navigation">
        <button @click="previewSong" class="action-btn">
          <i class="fas fa-backward"></i>
        </button>
        <button class="action-btn action-btn-big" @click="playSong">
          <i class="fas" :class="[isPlay ? 'fa-pause' : 'fa-play']"></i>
        </button>
        <button @click="nextSong" class="action-btn">
          <i class="fas fa-forward"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
	title: 'Music Player',
  description: 'Music Player',
  keywords: 'music, player, vue, vite, nuxt,',
  twitterTitle: 'Music Player',
  twitterDescription: 'Music Player',
  twitterCard: 'summary',
  ogDescription: 'Music Player',
  ogTitle: 'Music Player',
  ogType: 'website',
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

const songList = ref([
  {
    id: 1,
    name: 'hey',
    audioPath: './assets/music/hey.mp3',
    imagePath: './assets/hey.jpg'
  },
  {
    id: 2,
    name: 'summer',
    audioPath: './assets/music/summer.mp3',
    imagePath: './assets/summer.jpg'
  },
  {
    id: 3,
    name: 'ukulele',
    audioPath: './assets/music/ukulele.mp3',
    imagePath: './assets/ukulele.jpg'
  }
]);

const currentSong = ref(null)
const audio = ref()
const isPlay = ref(false)
const progress = ref(null)

const imagePath = computed(()=> {
  return currentSong.value.imagePath
})

const musicPath = computed(()=> {
  return currentSong.value.audioPath
})

function playSong(){
  if (isPlay.value) audio.value.pause()
  else audio.value.play()
  isPlay.value = !isPlay.value
}

function loadSong(songIndex,changed) {
  if (songIndex) currentSong.value = songList.value.find(song => song.id == songIndex)
  else currentSong.value = songList.value[Math.floor(Math.random() * songList.value.length)]
  
  if (currentSong.value && changed) {
    setTimeout(()=> {
      playSong()
    },100)
  }
}

function previewSong() {
  let prevSong = currentSong.value.id - 1
  if (prevSong <= 0) prevSong = songList.value.length - 1
  loadSong(prevSong, true)
}

function nextSong() {
  let nextSongIndex = currentSong.value.id + 1
  if (nextSongIndex > songList.value.length) nextSongIndex = 0
  loadSong(nextSongIndex,true)
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.value.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = progress.value.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.value.duration;
  audio.value.currentTime = ((clickX / width) * duration);
}

// function duringTime(e){
//   const { duration, currentTime } = e.srcElement
//   let sec
//   let sec_d

//   let min = (currentTime==null) ? 0 : Math.floor(currentTime/60)
//   min = min < 10 ? '0'+min : min;

//   function get_sec(x){
//     if(Math.floor(x) >=60){
//       for(let i =1; i<=60; i++){
//         if(Math.floor(x)>=(60*i) && Math.floor(x)){
// 					sec = Math.floor(x) - (60*i);
// 					sec = sec <10 ? '0'+sec:sec;
//         }
//       }
//     } else {
//       sec = Math.floor(x);
// 		 	sec = sec <10 ? '0'+sec:sec;
//     }
//   }

//   get_sec(currentTime,sec) 

//   let min_d = (isNaN(duration) === true)? '0' : Math.floor(duration/60)
//   min_d = min_d < 10 ? '0'+ min_d : min_d

//   function get_sec_d (x) {
// 		if(Math.floor(x) >= 60){
			
// 			for (var i = 1; i<=60; i++){
// 				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
// 					sec_d = Math.floor(x) - (60*i);
// 					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
// 				}
// 			}
// 		}else{
// 		 	sec_d = (isNaN(duration) === true)? '0':
// 		 	Math.floor(x);
// 		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
// 		 }
// 	} 
//   get_sec_d(duration);
// }



watch(audio, () => {
  audio.value.addEventListener('timeupdate', updateProgress)
  //audio.value.addEventListener('timeupdate', duringTime)
})
onBeforeMount(() => {
  loadSong()
})

</script>

<style scoped>
.music-player {
  background-image: linear-gradient(
    0deg,
    rgba(247, 247, 247, 1) 23.8%,
    rgba(252, 221, 221, 1) 92%
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  margin: 0;
}

.music-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(252, 169, 169, 0.6);
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 100px 0;
  z-index: 10;
}

.img-container {
  position: relative;
  width: 110px;
}

.img-container::after {
  content: '';
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 50%);
}

.img-container img {
  border-radius: 50%;
  object-fit: cover;
  height: 110px;
  width: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: rotate 3s linear infinite;

  animation-play-state: paused;
}

.music-container.play .img-container img {
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.action-btn {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}

.action-btn.action-btn-big {
  color: #cdc2d0;
  font-size: 30px;
}

.action-btn:focus {
  outline: 0;
}

.music-info {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}

.music-container.play .music-info {
  opacity: 1;
  transform: translateY(-100%);
}

.music-info h4 {
  margin: 0;
}

.progress-container {
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}

.progress {
  background-color: #fe8daa;
  border-radius: 5px;
  height: 100%;
  width: 0%;
  transition: width 0.1s linear;
}
</style>