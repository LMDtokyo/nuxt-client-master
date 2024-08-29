<template>
  <div class="container my-auto flex flex-col bg-black/30 md:px-8 py-2 rounded-[10px] border border-black">
    <!-- Chat Header -->
    <div
        class="sticky top-0 left-1/2 transform -translate-x-1/2 flex gap-[10px] items-center p-[10px] rounded-md w-fit bg-gradient-to-tr from-[#080808]/40 from-[40%] to-[#401F00] border-[#FF9900]/20"
    >
      <img src="icons/chat.png" class="h-[26px] w-8" alt="chat-icon" />
      <span class="drop-shadow-orange font-messiri font-bold text-lg leading-5 text-[#DD9300]">{{ activeChatTitle }}</span>
    </div>

    <!-- Chat Messages -->
    <div class="relative flex-1 flex flex-col space-y-2 max-h-[600px] overflow-auto">
      <component
          v-for="(message, idx) in messages"
          :is="message.system ? systemMessage : userMessage"
          :key="idx"
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
          @keyup.enter="sendMessage"
          class="bg-transparent py-4 pl-5 flex-1 text-gray-300 resize-none outline-none placeholder:font-medium placeholder:text-[#8d8d8b]"
          placeholder="Написать сообщение"
      />
      <div class="flex gap-1">
        <!-- Кнопка открытия меню стикеров -->
        <button class="px-1" @click="toggleStickerModal">
          <svg
              class="text-[#545453] duration-200 hover:text-white cursor-pointer h-8 w-8"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
          </svg>
        </button>

        <button class="px-3" @click="sendMessage">
          <svg
              class="text-[#545453] duration-200 hover:text-white cursor-pointer h-8 w-8"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
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
          :class="{
          'text-[#DD9300]': activeChat === chat.id,
          'text-gray-400': activeChat !== chat.id
        }"
          class="flex-1 text-center py-2 font-semibold transition-colors duration-200"
      >
        {{ chat.name }}
      </button>
    </div>

    <!-- Модальное окно с стикерами -->
    <StickerModal :show="showStickerModal" @close="toggleStickerModal" @select="sendSticker" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { systemNotifications } from '~/components/chat/SystemNotifications';
import StickerModal from '~/components/chat/StickerModal.vue';

const chatModes = ref([
  { id: 'world', name: 'Мировой чат' },
  { id: 'fleet', name: 'Чат флота' },
  { id: 'market', name: 'Чат рынка' }
]);

const activeChat = ref('world');
const activeChatTitle = computed(() =>
    chatModes.value.find(chat => chat.id === activeChat.value)?.name || ''
);

const messages = ref([
  {
    id: 1,
    system: false,
    sender: { id: 1, login: 'letmedietokyo', lvl: 437, avatar: 'img/logo0.png' },
    content: "Message content here...",
    timestamp: Date.now()
  }
]);

const systemMessage = resolveComponent('SystemChatMessage');
const userMessage = resolveComponent('UserChatMessage');
const message = ref('');

const showStickerModal = ref(false);

const sendMessage = () => {
  if (!message.value.trim()) return;

  messages.value.unshift({
    id: Date.now(),
    sender: { id: 1, login: 'kofeek', lvl: 241, avatar: 'img/logo1.png' },
    content: message.value.trim(),
    timestamp: Date.now()
  });

  if (messages.value.length > 40) messages.value.pop();

  message.value = '';
};

const toggleStickerModal = () => {
  showStickerModal.value = !showStickerModal.value;
};

const sendSticker = (stickerSrc) => {
  message.value = `Стикер: ${stickerSrc}`;
  sendMessage();
};

const switchChat = (chatId) => {
  activeChat.value = chatId;
};

const addSystemMessage = (content: string) => {
  messages.value.unshift({
    id: Date.now(),
    system: true,
    content,
    timestamp: Date.now()
  });

  if (messages.value.length > 40) messages.value.pop();
};

// Примеры вызовов уведомлений
addSystemMessage(systemNotifications.bossKill('Игрок1', 'Древний Дракон'));
addSystemMessage(systemNotifications.locationOpened('Потерянный город'));
addSystemMessage(systemNotifications.monsterAppeared('Ледяной великан'));
addSystemMessage(systemNotifications.portCaptured('Чёрная Бригада'));
addSystemMessage(systemNotifications.lotteryWin('Игрок2'));
</script>

<style scoped>
/* Additional styling for visual enhancement */
</style>
