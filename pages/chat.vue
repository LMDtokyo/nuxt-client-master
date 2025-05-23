<template>
  <div v-if="isLoading" class="text-white text-center py-10">Загрузка чата...</div>

  <div v-else class="container my-auto flex flex-col bg-black/30 md:px-8 py-2 rounded-[10px] border border-black">
    <!-- Chat Header -->
    <div
        class="sticky top-0 left-1/2 transform -translate-x-1/2 flex gap-[10px] items-center p-[10px] rounded-md w-fit bg-gradient-to-tr from-[#080808]/40 from-[40%] to-[#401F00] border-[#FF9900]/20"
    >
      <img src="/icons/chat.png" class="h-[26px] w-8" alt="chat-icon" />
      <span class="drop-shadow-orange font-messiri font-bold text-lg leading-5 text-[#DD9300]">
        {{ activeChatTitle }}
      </span>
    </div>

    <!-- Chat Messages -->
    <div class="relative flex-1 flex flex-col space-y-2 max-h-[600px] overflow-auto">
      <component
          v-for="message in messages"
          :is="message.system ? systemMessage : userMessage"
          :key="message.id"
          :sender="message.sender"
          :timestamp="message.timestamp"
      >
        {{ message.content }}
      </component>
    </div>

    <!-- Chat Input -->
    <div class="relative flex bg-[#484848]/30 border border-black/80 rounded-[10px] mt-3">
      <input
          v-model="message"
          :disabled="!isAuth || isSending"
          @keyup.enter="sendMessage"
          class="bg-transparent py-4 pl-5 flex-1 text-gray-300 resize-none outline-none placeholder:font-medium placeholder:text-[#8d8d8b] disabled:opacity-50"
          placeholder="Написать сообщение"
      />
      <div class="flex gap-1 items-center">
        <button class="px-1" @click="toggleStickerModal" :disabled="!isAuth || isSending">
          <svg class="text-[#545453] duration-200 hover:text-white cursor-pointer h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <button class="px-3" @click="sendMessage" :disabled="!isAuth || isSending">
          <svg v-if="!isSending" class="text-[#545453] duration-200 hover:text-white cursor-pointer h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else class="animate-spin text-[#DD9300] h-8 w-8" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Chat Tabs -->
    <div class="mt-4 flex justify-around items-center bg-[#202020]/40 p-2 rounded-md border border-[#AE1F00]/40">
      <button
          v-for="chat in chatModes"
          :key="chat.id"
          @click="switchChat(chat.id)"
          :class="{ 'text-[#DD9300]': activeChat === chat.id, 'text-gray-400': activeChat !== chat.id }"
          class="flex-1 text-center py-2 font-semibold transition-colors duration-200"
      >
        {{ chat.name }}
      </button>
    </div>

    <StickerModal :show="showStickerModal" @close="toggleStickerModal" @select="sendSticker" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import { socket } from '~/utils/socket'
import StickerModal from '~/components/chat/StickerModal.vue'
import { useAuthStore } from '@/stores/auth'

const userMessage = defineAsyncComponent(() => import('~/components/chat/UserChatMessage.vue'))
const systemMessage = defineAsyncComponent(() => import('~/components/chat/SystemChatMessage.vue'))

const auth = useAuthStore()
const isAuth = computed(() => !!auth.user)
const currentUser = computed(() => auth.user)

const isLoading = ref(true)
const isSending = ref(false)

interface Sender {
  id: number
  login: string
  lvl: number
  avatar: string
}

interface ChatMessage {
  id: number
  system: boolean
  sender: Sender
  content: string
  chatId: string
  timestamp: number
}

const chatModes = ref([
  { id: 'world', name: 'Мировой чат' },
  { id: 'fleet', name: 'Чат флота' },
  { id: 'market', name: 'Чат рынка' }
])

const activeChat = ref('world')
const activeChatTitle = computed(() =>
    chatModes.value.find(chat => chat.id === activeChat.value)?.name || ''
)

const messages = ref<ChatMessage[]>([])
const message = ref('')
const showStickerModal = ref(false)

let currentSocketChannel = ''

const loadMessages = async () => {
  try {
    const res = await fetch(`http://localhost:5000/chat/${activeChat.value}`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Ошибка API: ${res.status} — ${text}`)
    }

    const data = await res.json()

    if (!Array.isArray(data)) {
      throw new TypeError('Неверный формат данных от API')
    }

    messages.value = data.reverse()
  } catch (err) {
    console.error('Ошибка при загрузке сообщений:', err)
  }
}

const subscribeToChatSocket = () => {
  if (currentSocketChannel) {
    socket.off(currentSocketChannel)
  }

  currentSocketChannel = `chat:${activeChat.value}`
  socket.on(currentSocketChannel, (msg: ChatMessage) => {
    if (msg.chatId === activeChat.value) {
      messages.value.push(msg)
      if (messages.value.length > 40) messages.value.shift()
    }
  })
}

const sendMessage = () => {
  if (!message.value.trim() || !auth.user?.id || isSending.value) return

  const payload = {
    content: message.value,
    senderId: auth.user.id,
    chatId: activeChat.value,
    system: false
  }

  console.log('[CHAT] Отправка:', payload)
  isSending.value = true

  socket.emit('chat:message', payload, (ack) => {
    isSending.value = false
    if (ack?.ok) {
      console.log('[SERVER ACK] Подтверждено')
    } else {
      console.warn('[SERVER ACK] Ошибка:', ack?.error || 'нет ack')
    }
  })

  message.value = ''
}

const toggleStickerModal = () => {
  showStickerModal.value = !showStickerModal.value
}

const sendSticker = (stickerSrc: string) => {
  message.value = `Стикер: ${stickerSrc}`
  sendMessage()
}

const switchChat = (chatId: string) => {
  activeChat.value = chatId
}

watch(activeChat, async () => {
  await loadMessages()
  subscribeToChatSocket()
})

onMounted(async () => {
  if (!auth.access_token) {
    console.warn('Нет access_token — чат недоступен')
    isLoading.value = false
    return
  }

  if (!auth.user) {
    await auth.fetchUser()
  }

  if (!auth.user?.id) {
    console.warn('auth.user пуст — чат отключён')
    isLoading.value = false
    return
  }

  socket.emit('register', auth.user.id)
  console.log('[SOCKET] Зарегистрирован:', auth.user.login)

  await loadMessages()
  subscribeToChatSocket()

  isLoading.value = false
})
</script>
