<template>
  <div class="main">
    <header class="showcase bg-primary">
      <div class="container">
        <h2>
          These projects and site examples are inspired by Vanilla Web Projects created by TraversyMedia. <br>
          The content here is an adaptation of the same projects for Nuxt 3. 
				</h2>
        <a href="https://github.com/bradtraversy/vanillawebprojects" class="main-btn" >Original Github Repository</a>
        <a href="https://vanillawebprojects.com/" class="main-btn" >Original Course Site</a>
        <a href="" class="main-btn" >Github Nuxt 3 Repository</a>
      </div>
    </header>

    <section class="projects">
      <div v-for="project in projects">
        <img :src="imageSrc(project.image)" alt="project" />
        <div class="content">
          <h4>{{ project.name }}</h4>
          <p> {{ project.description }}</p>
          <NuxtLink :to="`/${project.routeName}`" class="btn btn-primary">Live Demo</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

const projects = ref([
  {
    id: 1,
    name: 'Form Validation',
    description: 'Intro to DOM & events',
    routeName: 'form-validation',
    image: '1.png'
  },
  {
    id: 2,
    name: 'Movie Seat Booking',
    description: 'DOM & CSS, Local Storage',
    routeName: 'movie-seat-booking',
    image: '2.png'
  },
  {
    id: 3,
    name: 'Custom Video Player',
    description: 'HTML5 Video API',
    routeName: 'custom-video-player',
    image: '3.png'
  },
  {
    id: 4,
    name: 'Exchange Rate Calculator',
    description: 'Fetch API, JSON',
    routeName: 'exchange-rate-calculator',
    image: '4.png'
  },
  {
    id: 5,
    name: 'DOM Array Methods',
    description: 'DOM & forEach(), map(), filter(), etc',
    routeName: 'dom-array-methods',
    image: '5.png'
  },
  {
    id: 6,
    name: 'Menu Slider & Modal',
    description: 'UI/CSS/JS Animation',
    routeName: 'menu-slider-modal',
    image: '6.png'
  },
  {
    id: 7,
    name: 'Hangman Game',
    description: 'DOM, Events, SVG',
    routeName: 'hangman-game',
    image: '7.png'
  },
  {
    id: 8,
    name: 'Meal Finder',
    description: 'Fetch API, CSS Grid, Overlays',
    routeName: 'meal-finder',
    image: '8.png'
  },
  {
    id: 9,
    name: 'Expense Tracker',
    description: 'DOM, Array Methods, Local Storage',
    routeName: 'expense-tracker',
    image: '9.png'
  },
  {
    id: 10,
    name: 'Music Player',
    description: 'UI/Animation, Audio API',
    routeName: 'music-player',
    image: '10.png'
  },
  {
    id: 11,
    name: 'Infinite Scroll Posts',
    description: 'CSS Loader, setTimeout, Async/Await',
    routeName: 'infinite-scroll-blog',
    image: '11.png'
  },
  {
    id: 12,
    name: 'Typing Game',
    description: 'DOM, setInterval, Local Storage',
    routeName: 'typing-game',
    image: '12.png'
  },
  {
    id: 13,
    name: 'Speech Text Reader',
    description: 'HTML5 Speech API',
    routeName: 'speech-text-reader',
    image: '13.png'
  },
  {
    id: 14,
    name: 'Memory Cards',
    description: 'CSS Animations, Local Storage',
    routeName: 'memory-cards',
    image: '14.png'
  },
  {
    id: 15,
    name: 'Lyrics Search App',
    description: 'Fetch, Async/Await, Pagination',
    routeName: 'lyrics-search',
    image: '15.png'
  },
  {
    id: 16,
    name: 'Relaxer App',
    description: 'CSS Animation, JS Timers',
    routeName: 'relaxer-app',
    image: '16.png'
  },
  {
    id: 17,
    name: 'Breakout Game',
    description: 'HTML5 Canvas API',
    routeName: 'breakout-game',
    image: '17.png'
  },
  {
    id: 18,
    name: 'New Year Countdown',
    description: 'DOM, Intervals',
    routeName: 'new-year-countdown',
    image: '18.png'
  },
  {
    id: 19,
    name: 'Speak Number Guess',
    description: 'Speech Recognition API',
    routeName: 'speak-number-guess',
    image: '19.png'
  },
  {
    id: 20,
    name: 'Product Filtering',
    description: 'Tailwind CSS, Filtering, Searching',
    routeName: 'product-filtering',
    image: '20.png'
  },
])

function imageSrc(image) {
  return '/assets/' + image
}
</script>

<style scoped>
.main {
  font-family: 'Roboto', sans-serif;
}

.showcase {
  height: 600px;
  font-family: 'Alata', sans-serif;
  position: relative;
  background: url(../assets/brand.png) no-repeat center bottom;
  z-index: 2;
}

.showcase .container {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.showcase h2 {
  font-size: 30px;
  color: #00DC82;
  margin-bottom: 22px;
  font-family: Alata, sans-serif;
}

.showcase h1 {
  font-size: 40px;
  letter-spacing: 3px;
  line-height: 1.7;
  font-weight: 400;
}

.projects { 
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  background-color: #040e27;
}

.projects > div {
  position: relative;
  cursor: pointer;
  height: 100%;
}

.projects div:hover .content {
  opacity: 0.9;
}

.projects img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects .content {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0181f5;
  color: #fff;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  transition: opacity 0.3s ease-in;
}

.projects .content p {
  margin: 15px 5px;
}

.projects h4 {
  font-size: 20px;
}

.btn-primary {
  color: #fff;
  background: #040e27;
}

.btn {
  display: inline-block;
  font-family: Alata, sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  color: #fff;
  background: #040e27;
  padding: 12px 30px;
  border-radius: 0px;
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
}

.main-btn {
  display: inline-block;
  font-family: Alata, sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  color: #fff;
  padding: 12px 30px;
  border-radius: 0px;
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s
}

.btn:hover {
  -webkit-transform: scale(0.98);
  transform: scale(0.98);
  opacity: 0.9;
  color: #f4f4f4 !important;
}

</style>