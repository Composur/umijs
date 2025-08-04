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
    // 查看 vue-loader 是否已配置
    console.log('Has vue-loader?', config.module.rules.has('vue'));

    // 获取 vue-loader rule
    const vueRule = config.module.rule('vue');
    if (vueRule) {
      console.log('Vue rule loaders:', vueRule.uses.values());
    }
    // 已支持自定义配置，无需安装插件
    // config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{
    //   analyzerPort: 8010,
    // }])
    // config.optimization.realContentHash(true)

    // config.plugin('ScriptExtHtmlWebpackPlugin').use(ScriptExtHtmlWebpackPlugin, [{
    //   inline: /runtime\..*\.js$/
    // }])
    config.optimization.runtimeChunk(true)
    // config.optimization.splitChunks({
    //   chunks: 'async',
    //   minSize: 20000,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   name: false,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module: any) {
    //         //取得名称。例如 /node_modules/packageName/not/this/part.js
    //         // 或 /node_modules/packageName
    //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

    //         // npm package 是 URL 安全的，但有些服务不喜欢 @ 符号
    //         return `npm.${packageName.replace('@', '')}`;
    //       },
    //     },
    //     common: {
    //       name: 'common',
    //       test: /[\\/]src[\\/]/,
    //       chunks: 'initial',
    //       minChunks: 2, //一般为非第三方公共模块
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // })
    // config.output.filename('[name].[contenthash].js')
    // config.output.chunkFilename('[name].[contenthash].js')
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
