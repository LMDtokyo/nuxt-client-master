<template>
  <div class="min-h-screen bg-[#0b0b0f] text-gray-200 font-sans">
    <div class="max-w-6xl mx-auto py-12 px-4">
      <h1 class="text-4xl font-bold mb-10 text-center text-yellow-400 drop-shadow">⚓ Панель администратора</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          to="/admin/items"
          class="bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500 rounded-xl p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <span class="text-4xl">📦</span>
          <div>
            <p class="text-xl font-semibold text-yellow-300">Предметы</p>
            <p class="text-sm text-gray-400">Управление игровыми объектами</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/inventories"
          class="bg-gradient-to-b from-gray-800 to-gray-900 border border-green-600 rounded-xl p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <span class="text-4xl">🎒</span>
          <div>
            <p class="text-xl font-semibold text-green-400">Выдать предмет</p>
            <p class="text-sm text-gray-400">Назначить инвентарь игроку</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/users"
          class="bg-gradient-to-b from-gray-800 to-gray-900 border border-purple-600 rounded-xl p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <span class="text-4xl">🧍‍♂️</span>
          <div>
            <p class="text-xl font-semibold text-purple-400">Пользователи</p>
            <p class="text-sm text-gray-400">Список и управление</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/settings"
          class="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600 rounded-xl p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <span class="text-4xl">⚙️</span>
          <div>
            <p class="text-xl font-semibold text-gray-300">Настройки</p>
            <p class="text-sm text-gray-400">Параметры системы</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// no logic needed
</script>

<style>
/* Можно добавить кастомные фоны, шрифты, иконки здесь */
</style>
