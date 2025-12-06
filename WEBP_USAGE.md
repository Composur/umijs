# WebP 图片使用指南

本项目已集成 WebP 图片支持，可以自动为支持的浏览器提供 WebP 格式，不支持的浏览器自动回退到原始格式。

## 功能特性

1. ✅ **自动格式检测**：自动检测浏览器是否支持 WebP
2. ✅ **内置图片支持**：支持项目内的图片自动转换为 WebP
3. ✅ **在线图片支持**：支持在线图片（PNG/JPG）转换为 WebP
4. ✅ **自动回退**：不支持的浏览器自动使用原始格式
5. ✅ **多种转换方式**：支持图片代理、CDN 转换等多种方式

## 使用方法

### 方式一：使用 WebPImage 组件（推荐）

```vue
<template>
  <div>
    <!-- 内置图片 -->
    <WebPImage src="../assets/yay.jpg" width="388" alt="图片描述" />

    <!-- 在线图片 -->
    <WebPImage
      src="https://example.com/image.jpg"
      width="500"
      alt="在线图片"
      :proxy-url="proxyUrl"
    />

    <!-- 使用 CDN 转换参数 -->
    <WebPImage
      src="https://example.com/image.png"
      width="500"
      :cdn-params="'x-oss-process=image/format,webp'"
    />
  </div>
</template>

<script setup lang="ts">
import WebPImage from "../components/WebPImage.vue"

const proxyUrl = "https://your-image-proxy.com/convert"
</script>
```

### 方式二：使用工具函数

```vue
<template>
  <picture>
    <source :srcset="webpUrl" type="image/webp" />
    <img :src="originalUrl" alt="图片" />
  </picture>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import {
  checkWebPSupport,
  convertToWebP,
  getBestImageUrl,
} from "../utils/image"

const originalUrl = ref("https://example.com/image.jpg")
const webpUrl = ref("")
const finalUrl = ref("")

onMounted(async () => {
  const supported = await checkWebPSupport()
  webpUrl.value = convertToWebP(originalUrl.value)
  finalUrl.value = await getBestImageUrl(originalUrl.value)
})
</script>
```

## 组件 Props

| 属性        | 类型                | 默认值   | 说明                                      |
| ----------- | ------------------- | -------- | ----------------------------------------- |
| `src`       | `string`            | -        | **必需**，原始图片 URL                    |
| `webpSrc`   | `string`            | -        | 可选，WebP 格式的 URL（不提供则自动生成） |
| `alt`       | `string`            | `''`     | 图片描述                                  |
| `width`     | `string \| number`  | -        | 图片宽度                                  |
| `height`    | `string \| number`  | -        | 图片高度                                  |
| `imgClass`  | `string`            | -        | 图片 CSS 类名                             |
| `imgStyle`  | `string \| object`  | -        | 图片内联样式                              |
| `loading`   | `'lazy' \| 'eager'` | `'lazy'` | 懒加载设置                                |
| `proxyUrl`  | `string`            | -        | 图片代理服务 URL（用于在线图片转换）      |
| `cdnParams` | `string`            | -        | CDN 转换参数（如阿里云、腾讯云等）        |

## 在线图片转换方案

### 方案一：使用图片代理服务

如果你有自己的图片代理服务，可以这样配置：

```vue
<WebPImage
  src="https://example.com/image.jpg"
  proxy-url="https://your-proxy.com/convert"
/>
```

代理服务需要支持：

- 接收 `url` 参数（原始图片 URL）
- 接收 `format` 参数（目标格式，如 webp）
- 返回转换后的图片

### 方案二：使用 CDN 转换参数

#### 阿里云 OSS

```vue
<WebPImage
  src="https://your-bucket.oss-cn-hangzhou.aliyuncs.com/image.jpg"
  cdn-params="x-oss-process=image/format,webp"
/>
```

#### 腾讯云 COS

```vue
<WebPImage
  src="https://your-bucket.cos.ap-shanghai.myqcloud.com/image.jpg"
  cdn-params="imageMogr2/format/webp"
/>
```

#### 七牛云

```vue
<WebPImage
  src="https://your-domain.com/image.jpg"
  cdn-params="imageView2/format/webp"
/>
```

### 方案三：使用第三方图片服务

可以使用 Cloudinary、ImageKit 等第三方服务：

```typescript
// 在 utils/image.ts 中配置
export function convertToWebP(url: string) {
  if (url.startsWith("http")) {
    // Cloudinary 示例
    return `https://res.cloudinary.com/your-cloud/image/fetch/f_webp/${encodeURIComponent(
      url
    )}`

    // ImageKit 示例
    // return `https://ik.imagekit.io/your-imagekit-id/${encodeURIComponent(url)}?tr=f-webp`
  }
  return url.replace(/\.(jpg|jpeg|png)$/i, ".webp")
}
```

## 构建时自动转换（已配置 ✅）

项目已配置构建时自动将图片转换为 WebP 格式。

### 工作原理

1. **自动转换**：运行 `pnpm build` 或 `pnpm build:prd` 时，会自动执行图片转换
2. **转换位置**：`src/assets` 目录下的所有 `.jpg`、`.jpeg`、`.png` 图片会被转换为 `.webp` 格式
3. **自动使用**：`WebPImage` 组件会自动检测并使用生成的 WebP 文件
4. **智能回退**：如果浏览器不支持 WebP 或文件不存在，自动回退到原始格式

### 手动转换图片

如果需要单独转换图片（不执行完整构建），可以运行：

```bash
pnpm build:images
```

### 配置说明

- **转换脚本**：`scripts/convert-images.mjs`
- **质量设置**：默认质量 80（可在脚本中调整）
- **输出位置**：与原始图片同目录

### 转换效果

转换后的图片通常可以减少 25-35% 的文件大小，某些图片甚至可以减少 80% 以上，显著提升页面加载速度。

## 注意事项

1. **内置图片**：✅ 已配置自动转换，构建时会自动生成 WebP 版本
2. **在线图片**：需要确保图片服务器支持格式转换，或使用代理服务/CDN 参数
3. **浏览器兼容性**：现代浏览器都支持 WebP，组件会自动检测并回退到原始格式
4. **性能优化**：WebP 格式通常比 JPG/PNG 小 25-35%，某些图片甚至可以减少 80% 以上
5. **开发环境**：开发时不会自动转换，需要手动运行 `pnpm build:images` 或执行构建命令
6. **Git 管理**：建议将生成的 `.webp` 文件添加到 `.gitignore`，因为它们可以通过构建脚本自动生成

## 示例

查看 `src/pages/index.vue` 了解完整使用示例。
