
<script setup>
useSeoMeta({
  title: 'Lyrics Search',
  description: 'Lyrics Search',
  keywords: 'lyrics, search, vue, vite, nuxt,',
  twitterTitle: 'Lyrics Search',
  twitterDescription: 'Lyrics Search',
  twitterCard: 'summary',
  ogDescription: 'Lyrics Search',
  ogTitle: 'Lyrics Search',
  ogType: 'website',
})
const apiURL = 'https://api.lyrics.ovh';
const search = ref('');
const songData = ref('');
const lyrics = ref('');
const showMore = ref(false);
const showDetail = {
  artist: ref(),
  songTitle: ref('')
};

async function searchSongs(){
  if (!search.value) {
    alert('Please enter a search term');
    return;
  }
  const response = await $fetch(`${apiURL}/suggest/${search.value}`);
  showMore.value = false;
  songData.value = response.data;
}

async function getLyrics(artist, songTitle){
  const response = await $fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  showDetail.artist = artist;
  showDetail.songTitle = songTitle;
  const lyricsText = response.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  const startIndex = lyricsText.indexOf("Paroles de la chanson"); // Remove Paroles de la chanson from lyrics
  if (startIndex !== -1) lyrics.value = lyricsText.substring(startIndex + "Paroles de la chanson".length);
  else lyrics.value = lyricsText;
  showMore.value = true;
}
</script>

<template>
  <div class="lyrics-search">
    <header>
      <h1>LyricsSearch</h1>

      <form id="form" @submit.prevent="searchSongs">
        <input
          type="text"
          v-model.trim="search"
          placeholder="Enter artist or song name..."
        />
        <button>Search</button>
      </form>
    </header>

    <div class="container">
      <ul v-if="!showMore" v-for="song in songData" :key="song.id" class="songs">
        <li>
          <span>
            <strong> {{ song.artist.name }}</strong> - {{ song.title }}
          </span>
          <button class="btn" :data-artist="song.artist.name" :data-songtitle="song.title" @click="getLyrics(song.artist.name,song.title)">Get Lyrics</button>
        </li>
      </ul>
      <p v-if="!songData">Results will be displayed here</p>
      <div v-else>
        <h2>
          <strong> {{ showDetail.artist }} </strong> - {{ showDetail.songTitle }} <br>
        </h2>
        <span v-html="lyrics">
        </span>
      </div>
    </div>

    <div class="container centered">

    </div>
  </div>
</template>

<style scoped>

.lyrics-search {
  background-color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

button {
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

input:focus,
button:focus {
  outline: none;
}

header {
  background-image: url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  position: relative;
}

header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

header * {
  z-index: 1;
}

header h1 {
  margin: 0 0 30px;
}

form {
  position: relative;
  width: 500px;
  max-width: 100%;
}

form input {
  border: 0;
  border-radius: 50px;
  font-size: 16px;
  padding: 15px 30px;
  width: 100%;
}

form button {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #e056fd;
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 16px;
  padding: 13px 30px;
}

.btn {
  background-color: #8d56fd;
  border: 0;
  border-radius: 10px;
  color: #fff;
  padding: 4px 10px;
}

ul.songs {
  list-style-type: none;
  padding: 0;
}

ul.songs li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.container {
  margin: 30px auto;
  max-width: 100%;
  width: 500px;
}

.container h2 {
  font-weight: 300;
}

.container p {
  text-align: center;
}

.centered {
  display: flex;
  justify-content: center;
}

.centered button {
  transform: scale(1.3);
  margin: 15px;
}
</style>