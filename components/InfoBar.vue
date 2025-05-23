<template>
    <div class="info-bar">
      <div class="status-warning-box">
        <img src="/icons/rflag.png" alt="Флаг" class="status-icon" />
        Вас ищут <span class="highlight">Охотники на пиратов</span>
        <div class="stars">
          <img src="/icons/star.png" alt="⭐" class="star-icon" />
          <img src="/icons/star.png" alt="⭐" class="star-icon" />
          <img src="/icons/star.png" alt="⭐" class="star-icon" />
        </div>
      </div>
  
      <div class="inventory-box">
        <img src="/icons/inv.png" alt="Инвентарь" class="inventory-icon" />
        Инвентарь: <span>{{ inventory.current }}\{{ inventory.max }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    inventory: Object
  })
  </script>
  
  <style scoped>
  .info-bar {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .status-warning-box {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    width: 363px;
    height: 45px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status-icon {
    width: 40px;
    height: 40px;
    margin-left: -10px;
    flex-shrink: 0;
  }
  .stars {
    display: flex;
    flex-shrink: 0;
  }
  .star-icon {
    width: 15px;
    height: 14px;
  }
  .highlight {
    color: #ffc107;
  }
  .inventory-box {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    width: 363px;
    height: 45px;
    min-width: 280px;
  }
  .inventory-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  .inventory-box span {
    color: #ffae00;
  }
  </style>
  