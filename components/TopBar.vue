<template>
  <div class="top-bar">
    <button class="leave-button">
      <img src="/icons/imageq.png" alt="Покинуть" class="leave-icon" />
      Покинуть сражение
    </button>

    <div class="location-label">
      <img src="/icons/imageq.png" class="location-icon" alt="Локация" />
      Остров Мертвецов
    </div>
  </div>
</template>

<script setup>
// нет props — всё статично
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  border-radius: 16px;
}

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
.location-label {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.30);
  padding: 8px 16px;
  color: #DD9300;
  font-weight: bold;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-image: url('/icons/bqlogo.png');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 50px 25px;
}
.location-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
