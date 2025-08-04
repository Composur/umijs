<script setup lang="ts">
import { ref } from "vue"
import Child from "./Child.vue"
const count = ref(0)
</script>
<template>
  <div>
    <h2>Yay! Welcome to umi ❤️ vue!</h2>
    <h2>{{ count }}</h2>
    <Child v-model:count="count" />
    <p>
      <img src="../assets/yay.jpg" width="388" />
    </p>
    <p>To get started, edit <code>pages/index.vue</code> and save to reload.</p>
  </div>
</template>
