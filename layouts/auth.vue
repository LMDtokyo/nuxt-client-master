<template>
  <div class="relative min-h-screen w-full overflow-hidden flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full w-[250px] bg-black/50 backdrop-blur-md border-r border-white/10 transition-transform duration-300 z-20',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full', // Переключение видимости
        'lg:translate-x-0' // На больших экранах всегда открыто
      ]"
    >
      <div class="flex flex-col justify-between h-full p-6">
        <div>
          <!-- Logo -->
          <div class="text-white text-2xl font-bold mb-10">
            <div class="flex items-center">
              <p class="leading-none">P</p>
              <p class="leading-none">W</p>
              <p class="leading-none">O</p>
            </div>
            <p class="text-xs font-light mt-2">PirateWorldOnline</p>
            <p class="text-xs text-gray-400">Games Center</p>
          </div>

          <!-- Navigation -->
          <nav class="flex flex-col space-y-6">
            <NuxtLink
              to="/signup"
              class="text-md"
              :class="route.path === '/signup' ? 'text-[#DD9300] font-bold' : 'text-white hover:text-[#DD9300]'"
            >
              Зарегистрироваться
            </NuxtLink>
            <NuxtLink
              to="/signin"
              class="text-md"
              :class="route.path === '/signin' ? 'text-[#DD9300] font-bold' : 'text-white hover:text-[#DD9300]'"
            >
              Войти
            </NuxtLink>
          </nav>
        </div>

        <!-- Support -->
        <div class="text-gray-400 text-sm">
          <NuxtLink to="/support" class="hover:underline">Поддержка</NuxtLink>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col relative overflow-hidden">
      <!-- Background image -->
      <img
        src="/image.png"
        alt="Background"
        class="absolute top-0 left-0 w-full h-full object-cover"
      />

      <!--Sidebar(only on mobile) -->
      <button
        @click="toggleSidebar"
        class="absolute top-4 left-4 text-white bg-black/30 p-2 rounded-md backdrop-blur-md z-30 lg:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Slot for page content -->
      <div class="relative z-10 flex justify-center items-center min-h-screen p-4">
        <slot />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isSidebarOpen = ref(false);
const route = useRoute();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
@media (min-width: 1024px) {
  aside {
    transform: translateX(0) !important;
  }
}
</style>
