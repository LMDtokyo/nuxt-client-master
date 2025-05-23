<template>
  <div class="character-card" :class="side">
    <div class="avatar-section">
      <img :src="data.avatar" class="avatar" alt="character avatar" />
    </div>
    <div class="status-section">
      <div class="bar hp">
        <div class="fill" :style="{ width: `${(data.health / data.maxHealth) * 100}%` }"></div>
        <span>{{ data.health }} / {{ data.maxHealth }}</span>
      </div>
      <div class="bar mp">
        <div class="fill" :style="{ width: `${(data.mana / data.maxMana) * 100}%` }"></div>
        <span>{{ data.mana }} / {{ data.maxMana }}</span>
      </div>
      <div class="info">
        {{ data.name }} {{ data.level }} ур. ({{ data.exp.toFixed(2) }}% XP)
      </div>
      <div class="debuffs">
        <img
          v-for="(d, i) in data.debuffs"
          :key="i"
          :src="d"
          class="debuff-icon"
          alt="debuff"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
  side: String
});
</script>

<style scoped>
.character-card {
  background: rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
  width: 320px;
  display: flex;
  gap: 10px;
  color: white;
  font-family: 'Arial';
}

.avatar-section .avatar {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
}

.status-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bar {
  height: 18px;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
  font-size: 12px;
  position: relative;
  background-color: #222;
  text-align: center;
}

.bar .fill {
  height: 100%;
}

.bar.hp .fill {
  background-color: #33ff33;
}

.bar.mp .fill {
  background-color: #3399ff;
}

.info {
  font-size: 14px;
  font-weight: bold;
  margin-top: 6px;
}

.debuffs {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.debuff-icon {
  width: 24px;
  height: 24px;
}
</style>
