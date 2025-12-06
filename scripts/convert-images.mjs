import imagemin from "imagemin"
import imageminWebp from "imagemin-webp"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 图片转 WebP 脚本
 * 将 src/assets 目录下的 jpg/jpeg/png 图片转换为 webp 格式
 */
async function convertImages() {
  const assetsDir = path.join(__dirname, "../src/assets")

  // 检查目录是否存在
  if (!fs.existsSync(assetsDir)) {
    console.log("⚠️  assets 目录不存在，跳过图片转换")
    return
  }

  console.log("🖼️  开始转换图片为 WebP 格式...")

  try {
    const files = await imagemin([`${assetsDir}/*.{jpg,jpeg,png}`], {
      destination: assetsDir,
      plugins: [
        imageminWebp({
          quality: 80, // 质量 0-100，80 是质量和文件大小的良好平衡
          method: 6, // 压缩方法 0-6，6 是最慢但压缩率最高
        }),
      ],
    })

    if (files.length === 0) {
      console.log("ℹ️  没有找到需要转换的图片")
    } else {
      console.log(`✅ 成功转换 ${files.length} 张图片为 WebP 格式:`)
      files.forEach((file) => {
        const fileName = path.basename(file.destinationPath)
        const originalSize = fs.statSync(
          file.sourcePath.replace(/\.webp$/, path.extname(file.sourcePath))
        ).size
        const webpSize = fs.statSync(file.destinationPath).size
        const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1)
        console.log(`   - ${fileName} (减少 ${reduction}%)`)
      })
    }
  } catch (error) {
    console.error("❌ 图片转换失败:", error.message)
    process.exit(1)
  }
}

// 执行转换
convertImages()

