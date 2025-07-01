const path = require("path");
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 配置nunjucks, 使用nunjucks模板引擎
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks",
  },
  myplugin: {
    enable: true,
    package: "egg-myplugin",
  },
};
