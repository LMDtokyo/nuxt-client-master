<template>
    <img :src="src" class="icon" />
  </template>
  
  <script setup>
  defineProps(['src'])
  </script>
  
  <style scoped>
  .icon {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
  }
  .icon:hover {
    transform: scale(1.2);
  }
  </style>
  