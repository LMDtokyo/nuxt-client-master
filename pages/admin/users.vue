<template>
  <div class="min-h-screen bg-[#0b0b0f] text-gray-200 p-8">
    <h1 class="text-3xl font-bold text-yellow-400 mb-8 drop-shadow">🧍 Пользователи</h1>

    <div class="overflow-x-auto border border-gray-700 rounded-lg shadow-lg">
      <table class="w-full table-auto text-sm bg-gray-900 rounded">
        <thead class="bg-gray-800 text-xs uppercase text-gray-300">
          <tr>
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Логин</th>
            <th class="p-3 text-left">Уровень</th>
            <th class="p-3 text-left">Последний вход</th>
            <th class="p-3 text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t border-gray-700 hover:bg-gray-800 transition"
          >
            <td class="p-3">{{ user.id }}</td>
            <td class="p-3 font-medium text-yellow-300">{{ user.login }}</td>
            <td class="p-3">{{ user.lvl }}</td>
            <td class="p-3 text-gray-400">{{ formatDate(user.last_active_at) }}</td>
            <td class="p-3 flex gap-2">
              <button @click="openPunishModal(user, 'ban')" class="btn-red">Бан</button>
              <button @click="openPunishModal(user, 'mute')" class="btn-yellow">Мут</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модалка наказания -->
    <div
      v-if="selectedUser"
      class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
    >
      <div class="bg-gray-900 border border-yellow-600 p-6 rounded-xl w-[400px] shadow-xl">
        <h2 class="text-xl font-semibold text-yellow-300 mb-4">
          {{ punishmentType === 'ban' ? 'Бан' : 'Мут' }}: {{ selectedUser.login }}
        </h2>

        <input
          v-model="reason"
          placeholder="Причина"
          class="input mb-3"
        />
        <input
          v-model.number="duration"
          type="number"
          placeholder="Длительность (мин)"
          class="input mb-4"
        />

        <div class="flex justify-end gap-3">
          <button class="btn" @click="selectedUser = null">Отмена</button>
          <button class="btn-green" @click="submitPunishment">Подтвердить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig()
const auth = useAuthStore()

interface AdminUser {
  id: number
  login: string
  lvl: number
  email?: string
  last_active_at: string
}

const users = ref<AdminUser[]>([])
const selectedUser = ref<AdminUser | null>(null)
const punishmentType = ref<'ban' | 'mute'>('ban')
const reason = ref('')
const duration = ref<number | null>(null)

const { data, error } = await useFetch<AdminUser[]>(config.public.apiUrl + '/admin/users', {
  headers: {
    Authorization: `Bearer ${auth.tokens.access_token}`
  }
})

if (data.value) {
  users.value = data.value
} else {
  console.error('Ошибка загрузки пользователей:', error.value)
}

function formatDate(date: string) {
  return new Date(date).toLocaleString()
}

function openPunishModal(user: AdminUser, type: 'ban' | 'mute') {
  selectedUser.value = user
  punishmentType.value = type
  reason.value = ''
  duration.value = null
}

async function submitPunishment() {
  if (!selectedUser.value || !reason.value) return

  const body = {
    userId: selectedUser.value.id,
    type: punishmentType.value,
    reason: reason.value,
    durationMinutes: duration.value || null
  }

  const res = await $fetch<{ success: boolean }>(config.public.apiUrl + '/admin/punish', {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${auth.tokens.access_token}`
    }
  })

  if (res.success) {
    selectedUser.value = null
    alert('Наказание применено')
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500;
}
.btn {
  @apply px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded;
}
.btn-red {
  @apply bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded;
}
.btn-yellow {
  @apply bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded;
}
.btn-green {
  @apply bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded;
}
</style>
