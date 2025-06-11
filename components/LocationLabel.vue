<template>
  <div class="location-label">
    <img src="/icons/imageq.png" class="location-icon" alt="Локация" />
    {{ location }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ location: string }>()
</script>

<style scoped>
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
