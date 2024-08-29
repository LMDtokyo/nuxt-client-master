<template>
  <div class="container">
    <section class="bg-black/30 border border-black rounded-[10px] p-5">
      <div class="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        <NuxtLink v-for="location in locations" :key="location.slug" :to="`/sea/${location.slug}`">
          <locationEntityWrapper :image="location.image" :skills="location.skills">
            <locationEntityHeader class="mb-2 max-h-[45px]" :name="location.name" :icon="location.icon">
              <div class="flex items-center gap-2 font-bold font-messiri">
                <span>
                  <span class="text-[#780000]">62</span>
                  <span class="text-white">\</span>
                  <span class="text-[#159600]">2</span>
                </span>
                <img :src="location.emblem" class="h-[35px]" alt="" />
                <h3 class="text-[#247917]">{{ location.faction }}</h3>
              </div>
            </locationEntityHeader>
          </locationEntityWrapper>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const locations = [
  {
    slug: 'IceGiantLair',
    name: 'Логово Ледяного Гиганта',
    image: '/img/location1.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    faction: 'Охотники',
    skills: [4, 5],
  },
  {
    slug: 'LostCity',
    name: 'Затерянный Город',
    image: '/img/location2.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    faction: 'Моряки',
    skills: [4, 5],
  },
  {
    slug: 'PirateFortress',
    name: 'Пиратская Крепость',
    image: '/img/location3.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    faction: 'Пираты',
    skills: [4, 5],
  },
  {
    slug: 'PuertoRico',
    name: 'Пуэрто-Рико',
    image: '/img/location4.png',
    icon: '/icons/inventory-icon.png',
    emblem: '/icons/image76.png',
    faction: 'Исследователи',
    skills: [4, 5],
  },
];
</script>
