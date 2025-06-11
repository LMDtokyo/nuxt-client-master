<template>
  <button class="leave-button">
    <img src="/icons/imageq.png" alt="Покинуть" class="leave-icon" />
    Покинуть сражение
  </button>
</template>

<script setup>
// Здесь можно будет добавить событие @click
</script>

<style scoped>
.leave-button {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.30);
  padding: 8px 16px;
  color: #ED2B00;
  font-weight: bold;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-image: url('/icons/bqlogo.png');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 50px 25px;
  cursor: pointer;
  transition: background 0.2s;
}

.leave-button:hover {
  background-color: rgba(198, 40, 40, 0.7);
}

.leave-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  z-index: 1;
}
</style>
