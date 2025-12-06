<template>
  <picture>
    <!-- 如果支持 WebP，优先使用 WebP -->
    <source
      v-if="webpSupported && webpSrc"
      :srcset="webpSrc"
      type="image/webp"
    />
    <!-- 回退到原始格式 -->
    <img
      :src="fallbackSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :class="imgClass"
      :style="imgStyle"
      :loading="loading"
      @load="handleLoad"
      @error="handleError"
    />
  </picture>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import {
  checkWebPSupport,
  getWebPSupportSync,
  convertToWebP,
} from "../utils/image"

interface Props {
  // 原始图片 URL（必需）
  src: string
  // WebP 格式的 URL（可选，如果不提供则自动生成）
  webpSrc?: string
  // 图片描述
  alt?: string
  // 图片宽度
  width?: string | number
  // 图片高度
  height?: string | number
  // CSS 类名
  imgClass?: string
  // 内联样式
  imgStyle?: string | Record<string, any>
  // 懒加载
  loading?: "lazy" | "eager"
  // 图片代理服务 URL（用于在线图片转换）
  proxyUrl?: string
  // CDN 转换参数
  cdnParams?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  loading: "lazy",
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

// 使用同步方法获取初始值，避免初始加载非 WebP 资源
// 如果缓存不存在，默认假设支持（现代浏览器都支持）
// 后续异步检测会更新这个值
const webpSupported = ref(getWebPSupportSync())
// 计算 WebP 格式的 URL
const webpSrc = computed(() => {
  // 如果明确提供了 webpSrc，直接使用
  if (props.webpSrc) {
    return props.webpSrc
  }

  // 对于在线图片，只有在提供了转换方式时才生成 WebP URL
  const isOnlineImage =
    props.src.startsWith("http://") || props.src.startsWith("https://")
  if (isOnlineImage) {
    if (!props.proxyUrl && !props.cdnParams) {
      // 如果没有提供转换方式，返回空字符串，使用原始格式
      return ""
    }
    // 有转换方式，生成 WebP URL
    return convertToWebP(props.src, {
      proxyUrl: props.proxyUrl,
      cdnParams: props.cdnParams,
    })
  }

  // 对于内置图片（通过 import 导入的），自动尝试使用 WebP 版本
  // 构建脚本会在同目录下生成 .webp 文件，通过替换扩展名来引用
  // 如果 webp 文件不存在，浏览器会自动回退到原始图片
  return convertToWebP(props.src, {})
})

// 回退到原始格式
const fallbackSrc = computed(() => props.src)

// 在后台异步检测 WebP 支持（如果缓存不存在）
// 这样可以更新缓存，但不影响初始渲染
onMounted(async () => {
  // 如果已经有缓存，就不需要再次检测
  if (typeof window !== "undefined" && window.localStorage) {
    const cached = window.localStorage.getItem("__webp_support__")
    if (cached === null) {
      // 没有缓存，进行检测并更新
      const supported = await checkWebPSupport()
      // 如果检测结果与初始假设不同，更新状态
      // 但此时图片可能已经加载，浏览器会使用 <picture> 标签自动选择
      if (supported !== webpSupported.value) {
        webpSupported.value = supported
      }
    }
  } else {
    // 没有 localStorage，直接检测
    webpSupported.value = await checkWebPSupport()
  }
})

const handleLoad = (event: Event) => {
  emit("load", event)
}

const handleError = (event: Event) => {
  emit("error", event)
}
</script>
