<template>
  <div class="container p-4">
    <BattleScreen v-if="isValidLocation" :location="location" />
    <div v-else class="text-white text-center text-lg mt-10">
      ⚠️ Локация "{{ route.params.slug }}" не найдена. Вернитесь на <NuxtLink to="/sea" class="text-blue-400 underline">карту</NuxtLink>.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BattleScreen from '~/components/BattleScreen.vue'

definePageMeta({
  middleware: 'auth',
  backgroundImage: 'qwerty.png'
})

const route = useRoute()
const router = useRouter()

const locationMap = {
  BloodReef: {
    slug: 'BloodReef',
    name: 'Кровавый Риф',
    faction: 'Охотники',
    boss: 'Капитан Ржавый Клык',
    image: '/img/location1.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    skills: [4, 5]
  },
  CursedPassage: {
    slug: 'CursedPassage',
    name: 'Пролив Проклятых',
    faction: 'Моряки',
    boss: 'Навигатор Без Глаз',
    image: '/img/location2.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    skills: [4, 5]
  },
  LeviathanTrench: {
    slug: 'LeviathanTrench',
    name: 'Глубины Левиафана',
    faction: 'Пираты',
    boss: 'Гидра',
    image: '/img/location3.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    skills: [4, 5]
  },
  IslandNoDawn: {
    slug: 'IslandNoDawn',
    name: 'Остров Без Зари',
    faction: 'Исследователи',
    boss: 'Смотритель Времени',
    image: '/img/location4.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    skills: [4, 5]
  }
}

// Получаем slug
const slug = computed(() => route.params.slug)

// Проверяем, существует ли локация
const isValidLocation = computed(() =>
  typeof slug.value === 'string' && Object.keys(locationMap).includes(slug.value)
)

// Получаем локацию
const location = computed(() =>
  isValidLocation.value ? locationMap[slug.value as keyof typeof locationMap] : null
)

// (опционально) Редиректим на 404, если нужно
/*
watchEffect(() => {
  if (!isValidLocation.value) {
    router.replace('/404')
  }
})
*/
</script>
