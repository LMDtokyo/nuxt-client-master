<template>
  <img :src="iconSrc" :alt="altText" class="icon" />
</template>

<script setup>
const props = defineProps({
  iconSrc: String,
  altText: String
});
</script>

<style scoped>
.icon {
  width: 50px;
  height: 50px;
}
</style>
