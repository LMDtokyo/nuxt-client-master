<template>
  <div class="skills">
    <h3>Навыки</h3>
    <ul>
      <li v-for="skill in skills" :key="skill.name" @click="useSkill(skill)">
        {{ skill.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const skills = [
  {name: 'Огненный шар', damage: 100},
  {name: 'Ледяная стрела', damage: 80},
  {name: 'Молниеносный удар', damage: 120},
];

const useSkill = (skill) => {
  const event = new CustomEvent('logDamage', {detail: `Вы использовали ${skill.name} и нанесли ${skill.damage} урона`});
  window.dispatchEvent(event);
};
</script>

<style scoped>
.skills {
  margin-top: 20px;
}

.skills ul {
  list-style-type: none;
  padding: 0;
}

.skills li {
  cursor: pointer;
  color: #00f;
  margin: 5px 0;
  transition: color 0.2s;
}

.skills li:hover {
  color: #0f0;
}
</style>
