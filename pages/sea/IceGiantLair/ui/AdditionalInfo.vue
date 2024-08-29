<template>
  <div class="additional-info">
    <h3 class="cursor-pointer">Информация о Локации</h3>
    <div class="weather">
      <h4>Погода: {{ weather }}</h4>
      <img :src="weatherIcon" alt="weather icon" class="weather-icon" />
    </div>
    <div class="events">
      <h4>Текущие события:</h4>
      <ul>
        <li v-for="event in events" :key="event.id">{{ event.name }}</li>
      </ul>
    </div>
    <div class="experience">
      <h4>Процент получения опыта: {{ experienceBoost }}%</h4>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const weather = ref('Солнечно');
const weatherIcon = ref('/icons/sun.png');
const experienceBoost = ref(10);
const events = ref([
  { id: 1, name: 'Охота на монстров' },
  { id: 2, name: 'Исследование руин' },
]);

const updateInfo = () => {
  // Здесь можно добавить логику для обновления погоды, событий и опыта
};

onMounted(() => {
  // Обновляем данные при монтировании компонента
  updateInfo();
  // Обновляем информацию каждые 5 минут
  setInterval(updateInfo, 300000);
});
</script>

<style scoped>
.additional-info {
  padding: 15px;
  border: 1px solid #444;
  border-radius: 10px;
  background-color: #2c2c2c;
  margin-top: 20px;
  transition: all 0.3s ease;
}
.additional-info:hover {
  background-color: #3a3a3a;
}
.weather, .events, .experience {
  margin-top: 10px;
  color: #d3d3d3;
}
.weather-icon {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}
</style>
