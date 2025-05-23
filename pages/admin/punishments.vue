<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Текущие наказания</h1>

    <table class="w-full text-left border border-gray-700">
      <thead>
      <tr class="bg-gray-800 text-sm uppercase">
        <th class="p-2">ID</th>
        <th class="p-2">Пользователь</th>
        <th class="p-2">Тип</th>
        <th class="p-2">Причина</th>
        <th class="p-2">Истекает</th>
        <th class="p-2">Выдано</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="punishment in punishments" :key="punishment.id" class="border-t border-gray-700">
        <td class="p-2">{{ punishment.id }}</td>
        <td class="p-2">{{ punishment.user.login }} (ID: {{ punishment.user.id }})</td>
        <td class="p-2 font-semibold" :class="punishment.type === 'ban' ? 'text-red-400' : 'text-yellow-400'">
          {{ punishment.type.toUpperCase() }}
        </td>
        <td class="p-2">{{ punishment.reason }}</td>
        <td class="p-2">{{ punishment.expiresAt ? formatDate(punishment.expiresAt) : '∞' }}</td>
        <td class="p-2">{{ formatDate(punishment.createdAt) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const punishments = ref([])

// ❗ Путь исправлен: /admin/punishments вместо /api/admin/punishments
const { data } = await useFetch('/admin/punishments')

punishments.value = data.value || []

function formatDate(date: string) {
  return new Date(date).toLocaleString()
}
</script>
