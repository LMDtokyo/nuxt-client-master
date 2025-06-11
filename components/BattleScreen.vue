<template>
  <div class="battle-screen">
    <!-- Кнопки по краям -->
    <div class="fixed-actions">
      <LogoutButton />
      <LocationLabel :location="props.location?.name || 'Неизвестная локация'" />
    </div>

    <div class="battle-body">
      <div class="combat-wrapper">
        <div class="combat-row">
          <EnemyCard :data="enemyData" />
        </div>

        <InfoBar :inventory="inventory" />
        <PlayerCard :data="playerData" />
      </div>

      <LogBox :logs="logs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import EnemyCard from '~/components/EnemyCard.vue'
import PlayerCard from '~/components/PlayerCard.vue'
import InfoBar from '~/components/InfoBar.vue'
import LogBox from '~/components/BattleLog.vue'
import LogoutButton from '~/components/LogoutButton.vue'
import LocationLabel from '~/components/LocationLabel.vue'

interface LocationData {
  name?: string
  faction?: string
  boss?: string
  image?: string
  icon?: string
  emblem?: string
  skills?: number[]
}

const props = defineProps<{
  location?: LocationData
}>()

const inventory = {
  current: 5,
  max: 20
}

const enemyData = computed(() => ({
  name: props.location?.boss || 'Неизвестный',
  level: 10,
  health: 85,
  maxHealth: 100,
  guild: props.location?.faction || 'Без фракции',
  mana: 30,
  maxMana: 50,
  ship: 'Месть королевы Анны',
  avatar: '/avatar/1.png',
  debuffs: ['/icons/pngegg.png', '/icons/pngegg.png']
}))

const playerData = {
  name: 'Player',
  level: 1,
  health: 50,
  maxHealth: 100,
  mana: 20,
  maxMana: 50,
  avatar: '/icons/playeravatar.png',
  debuffs: ['/path/to/debuff1.png', '/path/to/debuff2.png'],
  characterImg: ['/icons/playericon.png'],
  shipImg: ['/icons/ship.png'],
  exp: 60
}

const logs = computed(() => [
  {
    id: 1,
    type: 'ATTACK',
    message: `Противник ${enemyData.value.name} атаковал вас`,
    name: enemyData.value.name
  },
  {
    id: 2,
    type: 'DAMAGE',
    message: `Противник ${enemyData.value.name} нанес 245 урона`,
    name: enemyData.value.name,
    value: 245
  },
  {
    id: 3,
    type: 'DROP',
    message: 'Вы нашли предмет'
  },
  {
    id: 4,
    type: 'MISS',
    message: `Противник ${enemyData.value.name} промахнулся`,
    name: enemyData.value.name
  }
])
</script>

<style scoped>
.battle-screen {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  font-family: 'Arial', sans-serif;
}

/* Фиксированная панель кнопок */
.fixed-actions {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 1000;
}

.fixed-actions > * {
  pointer-events: auto;
}

.battle-body {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.combat-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 2px solid #4B4D5A;
  border-radius: 16px;
  box-sizing: border-box;
  min-height: 600px;
}

.combat-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 768px) {
  .combat-row {
    flex-direction: column;
    align-items: center;
  }

  .combat-wrapper {
    padding: 15px;
  }

  .fixed-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
