<template>
  <div class="min-h-screen bg-[#0b0b0f] text-gray-200 p-8">
    <h1 class="text-3xl font-bold text-yellow-400 mb-8 drop-shadow">🎒 Выдача предметов</h1>

    <form @submit.prevent="submitForm" class="space-y-6 max-w-2xl bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg">
      <div>
        <label class="block mb-2 text-sm text-gray-300">🧍 ID пользователя</label>
        <input
          v-model="userId"
          type="number"
          class="w-full bg-gray-800 border border-gray-700 text-sm text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div>
        <label class="block mb-2 text-sm text-gray-300">🎯 Слот</label>
        <input
          v-model.number="slot"
          type="number"
          min="0"
          class="w-full bg-gray-800 border border-gray-700 text-sm text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div>
        <label class="block mb-2 text-sm text-gray-300">📦 Предмет</label>
        <select
          v-model="selectedItem"
          class="w-full bg-gray-800 border border-gray-700 text-sm text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        >
          <option value="" disabled>— Выберите предмет —</option>
          <option v-for="item in items" :key="item.name" :value="item.name">
            {{ item.label }}
          </option>
        </select>
      </div>

      <div>
        <label class="block mb-2 text-sm text-gray-300">🔢 Количество</label>
        <input
          v-model.number="count"
          type="number"
          min="1"
          class="w-full bg-gray-800 border border-gray-700 text-sm text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition"
      >
        💾 Выдать предмет
      </button>
    </form>

    <div v-if="message" class="mt-6 text-green-400 font-medium bg-gray-800 p-4 rounded-lg border border-green-600">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRuntimeConfig, useFetch } from '#app'

const auth = useAuthStore()
const config = useRuntimeConfig()

const userId = ref('')
const slot = ref(0)
const selectedItem = ref('')
const count = ref(1)
const message = ref('')

// Получение предметов
const { data: items, error } = await useFetch(config.public.apiUrl + '/admin/items', {
  headers: {
    Authorization: `Bearer ${auth.tokens.access_token}`,
  },
})

if (error.value) {
  console.error('❌ Ошибка загрузки предметов:', error.value)
}

// Выдача предмета
const submitForm = async () => {
  try {
    await $fetch(config.public.apiUrl + '/admin/inventory/give', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.tokens.access_token}`,
      },
      body: {
        userId: Number(userId.value),
        itemName: selectedItem.value,
        slot: slot.value,
        count: count.value,
      },
    })

    message.value = `✔️ Предмет выдан: ${selectedItem.value} x${count.value} → ID ${userId.value}`

    userId.value = ''
    selectedItem.value = ''
    slot.value = 0
    count.value = 1
  } catch (err) {
    console.error('❌ Ошибка при выдаче предмета:', err)
    message.value = '❌ Не удалось выдать предмет. Проверь лог.'
  }
}
</script>
