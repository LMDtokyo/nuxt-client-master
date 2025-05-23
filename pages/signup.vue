<template>
    <div class="w-[420px] bg-black/40 p-8 rounded-lg border border-white/10 shadow-xl mx-auto mt-[100px]">
      <h2 class="text-white text-2xl font-bold text-center mb-2">Регистрация нового аккаунта</h2>
      <p class="text-center text-gray-400 mb-6 text-sm">создать <span class="text-white">игровой-аккаунт</span></p>
  
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div class="flex gap-2">
          <select
            v-model="formData.class"
            class="bg-[#1f1f1f] border border-white/10 rounded-md text-white text-sm px-2 py-2 outline-none w-1/3"
          >
            <option value="" disabled selected>Выбор класса</option>
            <option value="pirate">Пират</option>
            <option value="captain">Капитан</option>
            <option value="corsair">Корсар</option>
          </select>
          
          <input
            v-model="formData.login"
            type="text"
            placeholder="Логин"
            class="w-2/3 bg-[#1f1f1f] border border-white/10 rounded-md px-4 py-2 text-white outline-none"
          />
        </div>
  
        <div>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Пароль"
            class="w-full bg-[#1f1f1f] border border-white/10 rounded-md px-4 py-2 text-white outline-none"
          />
        </div>
  
        <!-- Здесь будет reCAPTCHA -->
        <div class="flex justify-center">
          <div class="bg-white rounded-md p-2">
            <p class="text-black text-sm">[ reCAPTCHA ]</p>
          </div>
        </div>
  
        <div class="flex items-start gap-2">
          <input v-model="acceptTerms" type="checkbox" class="mt-1">
          <label class="text-xs text-white">
            Регистрируясь, я соглашаюсь с <a href="#" class="text-[#DD9300] underline">правилами сервиса</a>
          </label>
        </div>
  
        <div class="flex items-start gap-2">
          <input v-model="acceptMarketing" type="checkbox" class="mt-1">
          <label class="text-xs text-white">
            Я согласен на получение информации об акциях
          </label>
        </div>
  
        <div v-if="requestErrorMessage" class="text-red-500 text-center text-sm">{{ requestErrorMessage }}</div>
  
        <button
          type="submit"
          class="w-full bg-[#474545] text-white rounded-md flex items-center justify-center gap-2 py-2 mt-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4v16m8-8H4" />
          </svg>
          Зарегистрироваться
        </button>
      </form>
  
      <div class="mt-6 text-center text-gray-400 text-sm">
        <p>или войти через</p>
        <div class="flex justify-center mt-2">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="h-8">
        </div>
      </div>
  
      <div class="mt-4 text-center">
        <p class="text-gray-400 text-sm">
          Уже есть аккаунт? <a href="/signin" class="text-white underline">Войти</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import { definePageMeta, navigateTo } from '#imports';
  
  definePageMeta({ layout: 'auth' });
  
  const auth = useAuthStore();
  
  const formData = ref({
    class: '',
    login: '',
    email: '',
    password: ''
  });
  
  const acceptTerms = ref(false);
  const acceptMarketing = ref(false);
  const requestErrorMessage = ref<string | null>(null);
  
  const handleSignup = async () => {
    if (!acceptTerms.value) {
      requestErrorMessage.value = 'Вы должны согласиться с правилами сервиса';
      return;
    }
  
    try {
      await auth.signup(formData.value.login, formData.value.email, formData.value.password);
      navigateTo('/pirat');
    } catch (err: any) {
      requestErrorMessage.value = err.response?._data?.error_message || 'Ошибка регистрации';
    }
  };
  </script>
  