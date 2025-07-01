/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = "egg_1751268167539_2665";

  // 添加中间件
  config.middleware = ["robot"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpl": "nunjucks",
    },
  };

  config.news = "http://localhost:3000";

  return {
    ...config,
    ...userConfig,
  };
};
