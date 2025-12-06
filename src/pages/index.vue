<script setup lang="ts">
import { ref } from "vue"
import Child from "./Child.vue"
import WebPImage from "../components/WebPImage.vue"
import yayImage from "../assets/yay.jpg"
// 同时导入 webp 文件，让 umi 处理路径（如果文件存在）
import yayWebpImage from "../assets/yay.webp"
const count = ref(0)
</script>
<template>
  <div>
    <h2>Yay! Welcome to umi ❤️ vue!</h2>
    <h2>{{ count }}</h2>
    <Child v-model:count="count" />
    <p>
      <!-- 使用 WebP 图片组件，自动支持 WebP 格式和回退 -->
      <!-- 传递 webpSrc 确保 webp 文件被打包到 dist -->
      <WebPImage
        :src="yayImage"
        :webp-src="yayWebpImage"
        width="388"
        alt="Yay image"
      />
    </p>
    <p>To get started, edit <code>pages/index.vue</code> and save to reload.</p>
  </div>
</template>
