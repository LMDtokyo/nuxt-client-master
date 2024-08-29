<template>
  <div class="location-container">
    <h1 class="location-title">Логово Ледяного Гиганта</h1>
    <p class="location-description">Описания и особенности Логова Ледяного Гиганта.</p>
    <button @click="startBattle" class="start-battle-btn">Начать сражение</button>
  </div>
</template>

<script setup>
const startBattle = () => {
  console.log("Сражение началось в Логове Ледяного Гиганта!");
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

.start-battle-btn {
  background-color: #ff0000;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
</style>
