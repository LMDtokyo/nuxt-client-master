<template>
  <div class="container pt-[200px]">
    <form
      @submit.prevent="handleSubmit"
      class="p-4 w-[600px] mx-auto space-y-4 bg-black/30 border border-black rounded-lg"
    >
      <input
        class="w-full bg-transparent border-b border-black font-mono px-2 py-1 outline-none text-white"
        type="text"
        placeholder="Логин"
        v-model="formData.login"
      />
      <input
        class="w-full bg-transparent border-b border-black font-mono px-2 py-1 outline-none text-white"
        type="text"
        placeholder="Пароль"
        v-model="formData.password"
      />

      <p v-if="requestErrorMessage" class="text-red-500 text-sm text-center">{{ requestErrorMessage }}</p>

      <GradientButton elementsPosition="center" text-classes="text-[#DD9300]">
        <span class="drop-shadow-orange font-messiri font-bold text-lg leading-5">Войти</span>
      </GradientButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, reactive, ref, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: 'auth' });

const auth = useAuthStore();

const textClasses = ref('text-[#DD9300]');

const formData = reactive({ login: null, password: null });
const requestErrorMessage = ref();

const handleSubmit = async () => {
  if (!formData.login || !formData.password) return;

  try {
    await auth.login(formData.login, formData.password);
    navigateTo('/pirat');
  } catch (err: any) {
    requestErrorMessage.value = err.response._data.error_message;
  }
};
</script>
