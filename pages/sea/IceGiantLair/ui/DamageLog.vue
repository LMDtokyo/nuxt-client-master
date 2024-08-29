<template>
  <div class="damage-log">
    <h3>Лог урона</h3>
    <ul>
      <li v-for="log in damageLogs" :key="log">{{ log }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const damageLogs = ref([]);

const addLog = (message) => {
  damageLogs.value.push(message);
};

// Подписка на событие
onMounted(() => {
  window.addEventListener('logDamage', (event) => {
    addLog(event.detail);
  });
});
</script>

<style scoped>
.damage-log {
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
  color: #ff1f1f;
  margin: 5px 0;
}
</style>
