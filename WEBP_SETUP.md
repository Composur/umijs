# WebP 自动化配置完成 ✅

## 配置概览

项目已成功配置构建时自动将图片转换为 WebP 格式。

## 已完成的配置

### 1. 依赖安装
- ✅ `imagemin@9.0.1`
- ✅ `imagemin-webp@8.0.0`

### 2. 转换脚本
- ✅ 创建了 `scripts/convert-images.mjs`
- ✅ 自动转换 `src/assets` 目录下的所有图片
- ✅ 显示转换进度和文件大小减少百分比

### 3. 构建集成
- ✅ `pnpm build` 和 `pnpm build:prd` 会自动执行图片转换
- ✅ 可以单独运行 `pnpm build:images` 手动转换

### 4. 组件支持
- ✅ `WebPImage` 组件自动检测并使用 WebP 文件
- ✅ 自动回退到原始格式（如果浏览器不支持或文件不存在）

## 使用方法

### 开发时
```bash
# 手动转换图片（可选）
pnpm build:images
```

### 构建时
```bash
# 构建时会自动转换图片
pnpm build

# 或生产环境构建
pnpm build:prd
```

### 在代码中使用
```vue
<script setup lang="ts">
import yayImage from "../assets/yay.jpg"
</script>

<template>
  <!-- 组件会自动使用生成的 webp 文件 -->
  <WebPImage :src="yayImage" width="388" alt="图片" />
</template>
```

## 转换效果

测试结果：`yay.jpg` 转换为 `yay.webp` 后，文件大小减少了 **87.0%**！

## 文件结构

```
umijs/
├── scripts/
│   └── convert-images.mjs    # 图片转换脚本
├── src/
│   ├── assets/
│   │   ├── yay.jpg           # 原始图片
│   │   └── yay.webp          # 自动生成的 WebP（构建时）
│   ├── components/
│   │   └── WebPImage.vue     # WebP 图片组件
│   └── utils/
│       └── image.ts          # 图片工具函数
└── package.json              # 已更新构建脚本
```

## 注意事项

1. **开发环境**：开发时不会自动转换，需要手动运行 `pnpm build:images`
2. **Git 管理**：建议将 `.webp` 文件添加到 `.gitignore`（可选）
3. **质量调整**：可在 `scripts/convert-images.mjs` 中调整质量参数（默认 80）

## 下一步

现在你可以：
1. 添加更多图片到 `src/assets` 目录
2. 运行 `pnpm build:images` 转换图片
3. 使用 `WebPImage` 组件展示图片
4. 享受更快的页面加载速度！🚀

