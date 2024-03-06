<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useServerSeoMeta({
  robots: 'index, follow'
})
</script>

<style>

* {
  box-sizing: border-box;
}

body{
  margin: 0;
  padding: 0;
}
</style>
