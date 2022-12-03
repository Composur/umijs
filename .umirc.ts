import { defineConfig } from 'umi';
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
export default defineConfig({
  npmClient: 'pnpm',
  presets: [require.resolve('@umijs/preset-vue')],
  manifest: {
    fileName: 'manifest.json'
  },
  chainWebpack: function (config, { webpack }) {
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{
      analyzerPort: 8010,
    }])
    config.optimization.realContentHash(true)
    return config
  },
  codeSplitting: {
    jsStrategy: 'depPerChunk'
  },
  hash: true,
  // 默认开启
  // mfsu: true,
});
