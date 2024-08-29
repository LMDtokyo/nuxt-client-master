<template>
  <div class="container">
    <LocationDetails />
    <LocationSkills />
    <LocationEnemies />
    <DamageLog />
    <AdditionalInfo />
  </div>
</template>

<script setup>
import LocationDetails from './ui/LocationDetails.vue';
import LocationSkills from './ui/LocationSkills.vue';
import LocationEnemies from './ui/LocationEnemies.vue';
import DamageLog from './ui/DamageLog.vue';
import AdditionalInfo from './ui/AdditionalInfo.vue';
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 10px;
  color: #fff;
}
</style>
