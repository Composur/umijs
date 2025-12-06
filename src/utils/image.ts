/**
 * 图片工具函数 - 支持 WebP 格式
 */

const WEBP_SUPPORT_CACHE_KEY = '__webp_support__'

/**
 * 检测浏览器是否支持 WebP 格式（带缓存）
 * 使用 localStorage 缓存检测结果，避免重复检测
 */
export function checkWebPSupport(): Promise<boolean> {
  // 先检查缓存
  if (typeof window !== 'undefined' && window.localStorage) {
    const cached = window.localStorage.getItem(WEBP_SUPPORT_CACHE_KEY)
    if (cached !== null) {
      return Promise.resolve(cached === 'true')
    }
  }

  // 如果没有缓存，进行检测
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      const supported = webP.height === 2
      // 缓存结果
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(WEBP_SUPPORT_CACHE_KEY, String(supported))
      }
      resolve(supported)
    }
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * 同步获取 WebP 支持状态（从缓存）
 * 如果缓存不存在，默认返回 true（现代浏览器都支持）
 * 这样可以避免初始加载非 WebP 资源
 */
export function getWebPSupportSync(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    // SSR 环境，默认返回 true
    return true
  }

  const cached = window.localStorage.getItem(WEBP_SUPPORT_CACHE_KEY)
  if (cached !== null) {
    return cached === 'true'
  }

  // 没有缓存时，默认假设支持（现代浏览器都支持 WebP）
  // 如果实际不支持，后续检测会更新缓存，下次就会使用正确的值
  return true;
}

/**
 * 将图片 URL 转换为 WebP 格式
 * 支持多种转换方式：
 * 1. 内置图片：直接替换扩展名
 * 2. 在线图片：使用图片代理服务或 CDN 转换
 * 
 * @param url 原始图片 URL
 * @param options 转换选项
 * @returns WebP 格式的 URL
 */
export function convertToWebP(
  url: string,
  options: {
    // 是否强制使用 WebP（即使浏览器不支持）
    force?: boolean;
    // 图片代理服务 URL（用于在线图片转换）
    proxyUrl?: string;
    // CDN 转换参数（如腾讯云、阿里云等）
    cdnParams?: string;
  } = {}
): string {
  const { force = false, proxyUrl, cdnParams } = options;

  // 如果是 data URL，直接返回
  if (url.startsWith('data:')) {
    return url;
  }

  // 如果是内置图片（相对路径或 umi 处理后的路径），替换扩展名
  // 支持 umi 处理后的路径格式：/static/yay.7d162f31.jpg -> /static/yay.7d162f31.webp
  if (url.startsWith('./') || url.startsWith('../') || (!url.startsWith('http') && !url.startsWith('data:'))) {
    // 匹配 .jpg, .jpeg, .png 扩展名（可能包含 hash）
    return url.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp$2');
  }

  // 在线图片处理
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // 方式1: 使用图片代理服务
    if (proxyUrl) {
      return `${proxyUrl}?url=${encodeURIComponent(url)}&format=webp`;
    }

    // 方式2: 使用 CDN 参数转换（如腾讯云、阿里云等）
    if (cdnParams) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${cdnParams}`;
    }

    // 方式3: 使用在线图片转换服务（如 Cloudinary、ImageKit 等）
    // 这里提供一个示例，实际使用时需要根据服务商调整
    // return `https://your-image-service.com/convert?url=${encodeURIComponent(url)}&format=webp`;

    // 方式4: 简单替换扩展名（如果服务器支持）
    return url.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp$2');
  }

  return url;
}

/**
 * 获取图片的最佳格式 URL
 * 如果浏览器支持 WebP，返回 WebP 格式；否则返回原始格式
 * 
 * @param originalUrl 原始图片 URL
 * @param webpUrl WebP 格式的 URL（可选，如果不提供则自动生成）
 * @param webpSupported 浏览器是否支持 WebP（可选，如果不提供则自动检测）
 * @returns 最佳格式的 URL
 */
export async function getBestImageUrl(
  originalUrl: string,
  webpUrl?: string,
  webpSupported?: boolean
): Promise<string> {
  const isSupported =
    webpSupported !== undefined
      ? webpSupported
      : await checkWebPSupport();

  if (isSupported) {
    return webpUrl || convertToWebP(originalUrl);
  }

  return originalUrl;
}

/**
 * 预加载图片
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}

