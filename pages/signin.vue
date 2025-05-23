<template>
  <div class="w-[400px] bg-black/40 p-8 rounded-lg border border-white/10 shadow-xl">
    <h2 class="text-white text-2xl font-bold text-center mb-6">Авторизация в игру</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="text-sm text-white block mb-1">Игровое имя</label>
        <input
            v-model="formData.login"
            type="text"
            placeholder="Логин"
            class="w-full bg-[#1f1f1f] border border-white/10 rounded-md px-4 py-2 text-white outline-none"
        />
      </div>

      <div>
        <label class="text-sm text-white block mb-1">Пароль</label>
        <input
            v-model="formData.password"
            type="password"
            placeholder="Пароль"
            class="w-full bg-[#1f1f1f] border border-white/10 rounded-md px-4 py-2 text-white outline-none"
        />
      </div>

      <div v-if="requestErrorMessage" class="text-red-500 text-center text-sm">{{ requestErrorMessage }}</div>

      <!-- Кнопка войти -->
      <button
          type="submit"
          class="w-full bg-[#474545] text-white rounded-md flex items-center justify-center gap-2 py-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v8a2 2 0 002 2h4m10-4h-8m0 0l4-4m-4 4l4 4"/>
        </svg>
        Войти
      </button>

      <div class="flex items-center justify-between mt-4 text-white text-sm">
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="accent-[#474545]" />
          <span>Запомнить меня</span>
        </label>
      </div>

      <!-- Google вход -->
      <div class="mt-6 text-center text-gray-400 text-sm">
        <p>или войти через</p>
        <div class="flex justify-center mt-2">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="h-8">
        </div>
      </div>

      <!-- Зарегистрироваться / Забыли пароль -->
      <div class="flex justify-between mt-6 text-sm text-white">
        <button
            type="button"
            @click="goToRegister"
            class="flex items-center gap-1 text-white/80 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4v16m8-8H4" />
          </svg>
          Зарегистрироваться
        </button>
        <button type="button" class="text-white/60 hover:text-white">Забыли пароль?</button>
      </div>
    </form>

    <!-- Выбор для админа -->
    <div v-if="auth.user?.isAdmin && showChoice" class="mt-8 space-y-2 text-center border-t border-white/10 pt-6">
      <p class="text-lg font-semibold text-yellow-300">Добро пожаловать, админ</p>
      <div class="flex justify-center gap-4 mt-2">
        <NuxtLink to="/" class="btn-green">🎮 В игру</NuxtLink>
        <NuxtLink to="/admin" class="btn-yellow">🛠 Админка</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, reactive, ref, useRouter } from '#imports';
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: 'auth' });

const router = useRouter();
const auth = useAuthStore();

const formData = reactive({ login: '', password: '' });
const requestErrorMessage = ref<string | null>(null);
const showChoice = ref(false);

const handleSubmit = async () => {
  if (!formData.login || !formData.password) return;

  try {
    await auth.login(formData.login, formData.password);

    if (auth.user?.isAdmin) {
      showChoice.value = true;
    } else {
      navigateTo('/pirat');
    }
  } catch (err: any) {
    requestErrorMessage.value = err.response?._data?.error_message || 'Ошибка входа';
  }
};

const goToRegister = () => {
  router.push('/signup');
};
</script>

<style scoped>
.btn-green {
  @apply px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded;
}
.btn-yellow {
  @apply px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded;
}
</style>
