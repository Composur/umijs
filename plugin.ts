import { type IApi } from 'umi';
export default (api: IApi) => {
  api.describe({
    key: 'changeFavicon',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
    enableBy: api.EnableBy.config
  });
  api.modifyConfig((memo) => {
    memo.favicon = api.userConfig.changeFavicon;
    return memo;
  });
  api.modifyWebpackConfig((memo) => {
    if (memo.optimization) {
      memo.optimization.runtimeChunk = true
    }
    return memo
  })
};