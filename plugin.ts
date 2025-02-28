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
  // api.chainWebpack((memo, { webpack, env }) => {
  //   memo.plugin('HtmlInlineScriptPlugin').use(HtmlInlineScriptPlugin, [{
  //     scriptMatchPattern: [/runtime~.+[.]js$/],
  //   }])
  //   return memo;
  // })
  // hash 问题，暂未发现
  api.modifyBabelPresetOpts((memo) => {
    memo.presetEnv = {
      absoluteRuntime: false
    }
    memo.pluginLockCoreJS = false
    return memo
  })
};