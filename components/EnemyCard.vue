<template>
    <div class="card-wrapper">
      <div class="enemy-card">
        <h2 class="title">
          <span class="title-text">Противник</span>
        </h2>
        <div class="content">
          <img :src="data.avatar" class="avatar" />
          <div class="info">
            <div class="status-line">
              <span class="dot" /> <span class="online">Online</span>
            </div>
            <div class="line">
              <img src="/icons/chlyapa.png" class="icon" />
              <span class="nickname">{{ data.name }}</span>
              <span class="level">{{ data.level }} lvl</span>
              <img src="/icons/genderMale.png" class="icon gender" />
            </div>
            <div class="line">
              <img src="/icons/pflag.png" class="icon" />
              <span>{{ data.guild }}</span>
            </div>
            <div class="line">
              <img src="/icons/chlyapa.png" class="icon" />
              <span>{{ data.ship }}</span>
            </div>
          </div>
        </div>
        <div class="bars">
          <div class="bar hp">
            <div class="fill" :style="{ width: (data.health / data.maxHealth * 100) + '%' }"></div>
            <div class="label">{{ data.health }} / {{ data.maxHealth }}</div>
            <div class="bonus">+{{ data.hpBonus }}</div>
          </div>
          <div class="bar mp">
            <div class="fill" :style="{ width: (data.mana / data.maxMana * 100) + '%' }"></div>
            <div class="label">{{ data.mana }} / {{ data.maxMana }}</div>
            <div class="bonus">+{{ data.mpBonus }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    data: Object
  });
  </script>
  
  <style scoped>
  .card-wrapper {
    width: fit-content;
    display: flex;
    justify-content: center;
    border: 2px solid #4B4D5A;
    border-radius: 16px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  
  .enemy-card {
    width: 450px;
    min-height: 220px;
    border-radius: 16px;
    padding: 8px 12px;
    color: #fff;
    font-family: 'El Messiri', serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
    background-color: rgba(0, 0, 0, 0.50);

  }
  
  .title {
    font-size: 16px;
    height: 45px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 6px;
    padding: 10px 0;
    background: url('/backgrounds/bgenemy.png') no-repeat center;
    background-size: contain;
    position: relative;
  }
  
  .title-text {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #b6b6b6, #636363, #636363);
  }
  
  .content {
    display: flex;
    align-items: center;     /* Центрируем по горизонтали */
    justify-content: center; /* Центрируем по вертикали */
    text-align: center;
  }

  
  
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    justify-content: center;
  }
  
  .status-line {
    display: flex;
    align-items: center;
    color: #07EF9C;
    font-weight: bold;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: #07EF9C;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .line {
    display: flex;
    align-items: center;
    gap: 5px;
    text-shadow: 1px 1px 2px #000;
  }
  
  .nickname {
    font-weight: bold;
    color: #eee;
  }
  
  .level {
    color: gold;
  }
  
  .icon {
    width: 16px;
    height: 16px;
  }
  
  .gender {
    margin-left: auto;
  }
  
  .bars {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 5px;
  }
  
  .bar {
    position: relative;
    height: 20px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 13px;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
  }
  
  .hp .fill {
    background: linear-gradient(to right, #008857, #6f9);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
    z-index: 0;
  }
  
  .mp .fill {
    background: linear-gradient(to right, #007E7E, #09CDF8);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
    z-index: 0;
  }
  
  .label {
    position: relative;
    z-index: 1;
    flex: 1;
  }
  
  .bonus {
    position: relative;
    z-index: 1;
    margin-left: auto;
    color: #b8ffcc;
  }
  </style>
  