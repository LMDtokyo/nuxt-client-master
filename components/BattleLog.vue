<template>
  <div class="log-box">
    <div
      v-for="log in logs"
      :key="log.id"
      :class="['log', log.type.toLowerCase()]"
    >
      <span class="label">
        {{ log.type?.toString().toUpperCase() }}
      </span>
      <span class="log-message" v-html="formatMessage(log)"></span>
    </div>
  </div>
</template>

<script setup>
defineProps(['logs'])

function formatMessage(log) {
  let msg = log.message
  if (log.name) {
    msg = msg.replace('{name}', `<span class="highlight-name">${log.name}</span>`)
  }
  if (log.value !== undefined) {
    msg = msg.replace('{value}', `<span class="highlight-value">${log.value}</span>`)
  }
  return msg
}
</script>

<style scoped>
.log-box {
  background-color: rgba(0, 0, 0, 0.30);
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
}
.log {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.label {
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
  width: 88px;
  font-size: 0.8rem;
  font-family: 'El Messiri', serif;
  color: #fff;
  min-width: 60px;
  text-align: center;
}
.log-message {
  color: #949494;
}

/* Цвет для имени */
.highlight-name {
  color: #DBDBDB;
  font-weight: bold;
}

/* Цвет для значения */
.highlight-value {
  color: #5F0000;
  font-weight: bold;
}

/* Цвета по типу */
.damage .label {
  background-color: #5F0C0C;
}
.attack .label {
  background-color: #1C5F0C;
}
.drop .label {
  background-color: #AD770B;
}
.miss .label {
  background-color: #A5A5A5;
}
</style>

<style>
/* Глобальные стили для имени и значений */
.highlight-name {
  color: #DBDBDB;
  font-weight: bold;
}

.highlight-value {
  color: #5F0000;
  font-weight: bold;
}
</style>
