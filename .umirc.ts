import { defineConfig } from 'umi';
import { routes } from './src/router/index'
// const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// import HtmlInlineScriptPlugin from 'html-inline-script-webpack-plugin'
// const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const isPrd = process.env.NODE_ENV === 'production'
export default defineConfig({
  npmClient: 'pnpm',
  presets: [require.resolve('@umijs/preset-vue')],
  manifest: {
    fileName: 'manifest.json'
  },
  // 开发环境 vite ，线上环境 webpack 打包
  vite: isPrd ? false : {},
  chainWebpack: function (config, { webpack }) {
    // 已支持自定义配置，无需安装插件
    // config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{
    //   analyzerPort: 8010,
    // }])
    // config.optimization.realContentHash(true)

    // config.plugin('ScriptExtHtmlWebpackPlugin').use(ScriptExtHtmlWebpackPlugin, [{
    //   inline: /runtime\..*\.js$/
    // }])
    config.optimization.runtimeChunk(true)
    config.output.filename('[name].[contenthash].js')
    config.output.chunkFilename('[name].[contenthash].js')
    // config.plugin('HtmlInlineScriptPlugin').use(HtmlInlineScriptPlugin, [
    //   {
    //     scriptMatchPattern: [/runtime~.+[.]js$/],
    //     htmlMatchPattern: [/index.html$/],
    //   }
    // ])
    return config
  },
  codeSplitting: {
    jsStrategy: 'depPerChunk'
  },
  hash: true,
  history: { type: 'hash' },
  routes,
  // 默认开启
  // mfsu: true,
  // analyze: {
  //   analyzerPort: 8010,
  // },
});
