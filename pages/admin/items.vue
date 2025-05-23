<template>
  <div class="min-h-screen bg-[#0b0b0f] text-gray-200 p-8">
    <h1 class="text-3xl font-bold text-yellow-400 mb-6 drop-shadow">📦 Предметы</h1>

    <div class="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
      <table class="w-full table-auto text-sm bg-gray-900 rounded-lg">
        <thead class="bg-gray-800 text-gray-300 uppercase text-xs">
          <tr>
            <th class="p-3 text-left">Иконка</th>
            <th class="p-3 text-left">Название</th>
            <th class="p-3 text-left">ID (name)</th>
            <th class="p-3 text-left">Вес</th>
            <th class="p-3 text-left">Цена</th>
            <th class="p-3 text-left">Макс. стак</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
            class="border-t border-gray-700 hover:bg-gray-800 transition-colors"
          >
            <td class="p-3">
              <img
                :src="`${config.public.apiUrl}/items/${item.image}`"
                alt="icon"
                class="h-10 w-10 object-contain"
                @error="e => e.target.src = '/placeholder.png'"
              />
            </td>
            <td class="p-3 font-medium text-yellow-300">{{ item.label }}</td>
            <td class="p-3 text-gray-500 text-xs">{{ item.name }}</td>
            <td class="p-3">{{ item.weight }}</td>
            <td class="p-3 text-green-400">{{ item.sell_price }}</td>
            <td class="p-3">{{ item.max_stack_size }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig()
const auth = useAuthStore()

const { data: items, error } = await useFetch(config.public.apiUrl + '/admin/items', {
  headers: {
    Authorization: `Bearer ${auth.tokens.access_token}`,
  }
})

if (error.value) {
  console.error('Ошибка загрузки предметов:', error.value)
}
</script>

<style>
/* Можешь добавить кастомные курсоры, иконки или шрифты под стилистику */
</style>
