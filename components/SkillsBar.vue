<template>
    <div class="skills-bar">
      <button class="skill-btn">🔥</button>
      <button class="skill-btn">💧</button>
      <button class="skill-btn">⚡</button>
      <button class="skill-btn">🛡</button>
    </div>
  </template>
  
  <script setup>
  // no props or logic for now
  </script>
  
  <style scoped>
  .skills-bar {
    display: flex;
    gap: 12px;
  }
  .skill-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    font-size: 20px;
    color: #fff;
    padding: 8px 12px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .skill-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  </style>
  