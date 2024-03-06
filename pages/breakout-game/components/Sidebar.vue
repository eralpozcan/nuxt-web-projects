<script setup>
const props = defineProps({
  showContent: Boolean
});

const emits = defineEmits(['toggleRules']);

const closeButton = () => {
  emits('toggleRules');
};
</script>

<template>
  <div class="rules" :class="{ 'show': props.showContent}" >
    <h2>How To Play:</h2>
    <p>
      Use your right and left keys to move the paddle to bounce the ball up
      and break the blocks.
    </p>
    <p>If you miss the ball, your score and the blocks will reset.</p>
    <button class="btn" @click="closeButton()">Close</button>
  </div>
</template>

<style scoped>
.rules {
  position: absolute;
  top: 0;
  left: 0;
  background: #333;
  color: #fff;
  min-height: 100vh;
  width: 400px;
  padding: 20px;
  line-height: 1.5;
  transform: translateX(-400px);
  transition: transform 1s ease-in-out;
}
.rules.show {
  transform: translateX(0);
}

</style>