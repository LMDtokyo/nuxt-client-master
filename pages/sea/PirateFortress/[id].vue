<template>
  <div class="location-container">
    <h1 class="location-title">Пиратская Крепость</h1>
    <p class="location-description">Описания и особенности Пиратской Крепости.</p>
    <button @click="startRaid" class="start-raid-btn">Начать рейд</button>
  </div>
</template>

<script setup>
const startRaid = () => {
  console.log("Рейд на Пиратскую Крепость начался!");
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

.start-raid-btn {
  background-color: #ff7700;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
</style>
