<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg p-6 w-[400px]">
        <h2 class="text-xl font-bold mb-4">Выберите стикер</h2>
        <div class="grid grid-cols-3 gap-4">
          <img
              v-for="sticker in stickers"
              :key="sticker.id"
              :src="sticker.src"
              @click="selectSticker(sticker)"
              class="cursor-pointer transition-transform transform hover:scale-110"
              alt="sticker"
          />
        </div>
        <button @click="closeModal" class="mt-4 w-full py-2 bg-gray-800 text-white rounded-lg">Закрыть</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close', 'select']);
const stickers = ref([
  { id: 1, src: 'path/to/sticker1.png' },
  { id: 2, src: 'path/to/sticker2.png' },
  // Добавьте сюда другие стикеры
]);

const closeModal = () => {
  emit('close');
};

const selectSticker = (sticker) => {
  emit('select', sticker.src);
  closeModal();
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
