<template>
  <div class="location-details">
    <h2 class="location-title">{{ locationName }}</h2>
    <div class="location-image-wrapper">
      <img :src="locationImage" alt="Location Image" class="location-image" />
    </div>
    <p class="location-description">{{ locationDescription }}</p>
  </div>
</template>

<script setup>
const locationName = 'Логово Ледяного Гиганта';
const locationImage = '/img/location1.png';
const locationDescription = 'Описание локации. Здесь вы найдете...';
</script>

<style scoped>
.location-details {
  padding: 20px;
  border: 2px solid #333;
  border-radius: 12px;
  background-color: #222;
}

.location-title {
  color: #f0f0f0;
  font-size: 1.75rem;
  margin-bottom: 15px;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
}

.location-image-wrapper {
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
}

.location-image {
  width: 100%;
  height: auto;
  display: block;
}

.location-description {
  color: #bbb;
  font-size: 1rem;
  line-height: 1.6;
}
</style>
