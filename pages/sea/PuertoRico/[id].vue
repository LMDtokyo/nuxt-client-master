<template>
  <div class="location-container">
    <h1 class="location-title">Пуэрто-Рико</h1>
    <p class="location-description">Описания и особенности Пуэрто-Рико.</p>
    <button @click="startTrade" class="start-trade-btn">Начать торговлю</button>
  </div>
</template>

<script setup>
const startTrade = () => {
  console.log("Торговля в Пуэрто-Рико началась!");
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

.start-trade-btn {
  background-color: #00ff00;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
</style>
