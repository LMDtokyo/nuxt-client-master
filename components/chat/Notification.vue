<template>
  <transition name="fade">
    <div v-if="show" class="notification fixed bottom-4 right-4 bg-[#282828] text-white px-6 py-4 rounded-lg shadow-lg">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const message = ref('');
const show = ref(false);

export const useNotification = () => {
  const notify = (msg: string, duration: number = 3000) => {
    message.value = msg;
    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, duration);
  };

  return { notify };
};

// Watcher to automatically hide the notification after a set duration
watch(show, (val) => {
  if (!val) message.value = '';
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
