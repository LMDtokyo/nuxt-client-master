<template>
    <div class="inventory">
      🧳 Инвентарь: {{ inventory.current }} / {{ inventory.max }}
    </div>
  </template>
  
  <script setup>
  defineProps(['inventory'])
  </script>
  
  <style scoped>
  .inventory {
    background: rgba(20, 20, 20, 0.8);
    padding: 10px 15px;
    text-align: center;
    border-radius: 8px;
    font-size: 1rem;
    color: #ff9900;
  }
  </style>
  