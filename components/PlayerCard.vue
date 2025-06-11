<template>
  <div class="player-card">
    <img class="character-img" :src="data.characterImg" alt="character" />

    <div class="left-panel">
      <div class="bar hp-bar">
        <div class="fill" :style="{ width: hpPercent + '%' }"></div>
        <div class="bar-text">{{ data.health }} / {{ data.maxHealth }}</div>
        <div class="bar-bonus">+{{ data.hpBonus }}</div>
      </div>

      <div class="slot-grid">
        <div v-for="n in 6" :key="'left-slot-' + n" class="slot"></div>
      </div>

      <div class="caption">Противник применил:</div>
    </div>

    <div class="center-info">
      <div class="skull-icon"></div>
      <img class="avatar" :src="data.avatar" alt="avatar" />
      <div class="name">{{ data.name }} <span class="lvl">{{ data.level }} lvl</span></div>
      <div class="exp">{{ data.exp }}% <span class="xp">XP</span></div>
    </div>

    <div class="right-panel">
      <div class="bar mana-bar">
        <div class="fill" :style="{ width: manaPercent + '%' }"></div>
        <div class="bar-text">{{ data.mana }} / {{ data.maxMana }}</div>
        <div class="bar-bonus">+{{ data.manaBonus }}</div>
      </div>

      <div class="slot-grid">
        <div
          v-for="(debuff, index) in data.debuffs"
          :key="'right-slot-' + index"
          class="slot"
        >
          <img :src="debuff" class="slot-icon" />
        </div>
        <div
          v-for="n in (6 - data.debuffs.length)"
          :key="'empty-right-slot-' + n"
          class="slot"
        />
      </div>

      <div class="caption">Дебафы:</div>
    </div>

    <img class="ship-img" :src="data.shipImg" alt="ship" />
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const hpPercent = (props.data.health / props.data.maxHealth) * 100;
const manaPercent = (props.data.mana / props.data.maxMana) * 100;
</script>

<style scoped>
.player-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1180px; /* Установим ширину */
  height: 180px; /* Установим высоту */
  background-color: rgba(0, 0, 0, 0.50);
  padding: 10px; /* Можно уменьшить отступы, чтобы соответствовать размеру */
  border-radius: 12px;
  gap: 20px;
  margin: 0 auto;

}

.character-img, .ship-img {
  height: 140px; /* Немного уменьшаем изображение, чтобы оно вписалось */
  width: auto;
}

.bar {
  position: relative;
  width: 250px; /* Изменим ширину полосок */
  height: 12px; /* Уменьшаем высоту полосок */
  background: #222;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
}

.hp-bar .fill {
  background: linear-gradient(to right, #008857, #6f9);
  height: 100%;
}

.mana-bar .fill {
  background: linear-gradient(to right, #007E7E, #09CDF8);
  height: 100%;
}

.bar-text {
  position: absolute;
  left: 10px;
  top: -22px;
  font-size: 12px; /* Меньший шрифт */
  color: #fff;
}

.bar-bonus {
  position: absolute;
  right: -50px;
  top: -6px;
  color: #0f0;
  font-size: 12px; /* Меньший шрифт */
}

.slot-grid {
  display: grid;
  grid-template-columns: repeat(3, 40px); /* Меньше пространства между слотами */
  grid-template-rows: repeat(2, 40px);
  gap: 4px; /* Уменьшаем отступы */
}



.slot {
  width: 40px;
  height: 40px;
  background: #111;
  border: 1px solid #444;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-icon {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.center-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  color: #fff;
}

.center-info .avatar {
  width: 120px; /* Уменьшаем размер аватара */
  height: 120px; /* Уменьшаем размер аватара */
  border-radius: 50%;
  margin-bottom: 6px;
}

.skull-icon {
  width: 25px; /* Уменьшаем иконку черепа */
  height: 25px;
  background: url('/icons/skull.png') no-repeat center;
  background-size: contain;
  margin-bottom: 5px;
}

.name {
  font-weight: bold;
  margin-bottom: 2px;
}

.exp {
  font-size: 13px;
  color: #ccc;
}

.caption {
  margin-top: 6px;
  color: #ccc;
  font-size: 12px;
  text-align: center;
}
</style>
