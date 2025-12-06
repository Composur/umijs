<template>
  <div class="webp-demo">
    <h1>WebP 图片使用示例</h1>

    <section>
      <h2>1. 内置图片（使用 import 导入）</h2>
      <p>项目内的图片需要使用 import 导入，默认使用原始格式</p>
      <WebPImage
        :src="yayImage"
        width="400"
        alt="内置图片示例"
        @load="handleImageLoad"
      />
    </section>

    <section>
      <h2>2. 在线图片（使用代理服务）</h2>
      <p>通过图片代理服务转换在线图片为 WebP</p>
      <WebPImage
        src="https://picsum.photos/400/300"
        width="400"
        alt="在线图片示例（代理）"
        :proxy-url="proxyUrl"
      />
      <p class="note">注意：需要配置实际的图片代理服务 URL</p>
    </section>

    <section>
      <h2>3. 在线图片（使用 CDN 参数）</h2>
      <p>如果使用阿里云 OSS、腾讯云 COS 等 CDN，可以使用转换参数</p>
      <WebPImage
        src="https://example.com/image.jpg"
        width="400"
        alt="CDN 图片示例"
        cdn-params="x-oss-process=image/format,webp"
      />
      <p class="note">注意：需要替换为实际的 CDN 图片 URL</p>
    </section>

    <section>
      <h2>4. 手动指定 WebP URL</h2>
      <p>如果已经准备好了 WebP 版本的图片，可以直接指定（需要先导入）</p>
      <WebPImage
        :src="yayImage"
        :webp-src="yayWebpImage || undefined"
        width="400"
        alt="手动指定 WebP"
      />
      <p class="note">
        注意：如果 yay.webp 文件不存在，此示例会回退到原始图片。
        要测试此功能，请先创建 yay.webp 文件并导入。
      </p>
    </section>

    <section>
      <h2>5. 浏览器支持检测</h2>
      <p>
        当前浏览器是否支持 WebP: <strong>{{ webpSupportStatus }}</strong>
      </p>
      <button @click="checkSupport">重新检测</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import WebPImage from "../components/WebPImage.vue"
import { checkWebPSupport } from "../utils/image"
import yayImage from "../assets/yay.jpg"
// 如果存在 webp 版本，可以这样导入（如果文件不存在，会报错，所以用 try-catch 或条件导入）
// import yayWebpImage from "../assets/yay.webp"

const webpSupportStatus = ref<string>("检测中...")
const proxyUrl = ref<string>("") // 配置你的图片代理服务 URL
// 如果 yay.webp 不存在，这里会报错，所以先注释掉
const yayWebpImage = ref<string>("") // 如果需要，可以动态导入或使用空字符串

const checkSupport = async () => {
  webpSupportStatus.value = "检测中..."
  const supported = await checkWebPSupport()
  webpSupportStatus.value = supported ? "✅ 支持" : "❌ 不支持"
}

const handleImageLoad = (event: Event) => {
  console.log("图片加载完成", event)
}

onMounted(() => {
  checkSupport()
})
</script>

<style scoped>
.webp-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

h2 {
  color: #666;
  margin-bottom: 10px;
  font-size: 18px;
}

p {
  color: #888;
  margin-bottom: 15px;
}

.note {
  color: #ff9800;
  font-size: 14px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #40a9ff;
}
</style>
