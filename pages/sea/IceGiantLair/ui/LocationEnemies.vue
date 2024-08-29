<template>
  <div class="location-enemies">
    <h3>Враги</h3>
    <ul>
      <li v-for="enemy in enemies" :key="enemy">{{ enemy }}</li>
    </ul>
  </div>
</template>

<script setup>
const enemies = ['Враг 1', 'Враг 2', 'Враг 3'];
</script>

<style scoped>
.location-enemies {
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #2c2c2c;
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  color: #b51f1f;
  margin: 5px 0;
}
</style>
