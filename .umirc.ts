import { defineConfig } from 'umi';
// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
export default defineConfig({
  npmClient: 'pnpm',
  presets: [require.resolve('@umijs/preset-vue')],
  manifest: {
    fileName: 'manifest.json'
  },
  chainWebpack: function (config, { webpack }) {
    // 已支持自定义配置，无需安装插件
    // config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{
    //   analyzerPort: 8010,
    // }])
    // config.optimization.realContentHash(true)
    config.optimization.runtimeChunk(true)
    config.output.filename('[name].[contenthash].js')
    config.output.chunkFilename('[name].[contenthash].js')
    return config
  },
  codeSplitting: {
    jsStrategy: 'depPerChunk'
  },
  hash: true,
  // 默认开启
  // mfsu: true,
  // analyze: {
  //   analyzerPort: 8010,
  // },
});
