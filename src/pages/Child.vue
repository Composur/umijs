<template>
  <div>
    <h2 @click="inc">Child</h2>
    <p>{{ count }}</p>
  </div>
</template>
<script setup lang="ts">
const count = defineModel("count", { type: Number, default: 0 })
const inc = () => {
  count.value++
}
</script>
