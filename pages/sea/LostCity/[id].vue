<template>
  <div class="location-container">
    <h1 class="location-title">Затерянный Город</h1>
    <p class="location-description">Описания и особенности Затерянного Города.</p>
    <button @click="startExploration" class="start-exploration-btn">Начать исследование</button>
  </div>
</template>

<script setup>
const startExploration = () => {
  console.log("Исследование Затерянного Города началось!");
};
</script>

<style scoped>
.location-container {
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 10px;
}

.location-title {
  font-size: 24px;
  color: #ffffff;
}

.start-exploration-btn {
  background-color: #0077ff;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
</style>
