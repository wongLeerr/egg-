module.exports = (app) => {
  app.beforeStart(async () => {
    console.log("🐶beforeStart");
    // 可以创建一个匿名的 context 对象，可以调用 service 等
    const ctx = app.createAnonymousContext();
    // await ctx.service.user.findAll();
    ctx.logger.info("🐶ctx.logger");
  });

  // 配置加载之前
  app.configWillLoad(() => {
    console.log("🐶configWillLoad");
  });

  // 配置加载之后
  app.configDidLoad(() => {
    console.log("🐶configDidLoad");
  });

  // 插件加载之前
  app.didLoad(() => {
    console.log("🐶didLoad");
  });

  // 插件加载之后

  app.willReady(() => {
    console.log("🐶willReady");
  });

  // 插件加载之后
  app.didReady(() => {
    console.log("🐶didReady");
  });

  // 服务启动之后
  app.serverDidReady(() => {
    console.log("🐶serverDidReady");
  });

  // 服务关闭之前
  app.beforeClose(() => {
    console.log("🐶beforeClose");
  });

  app.once("server", () => {
    console.log("🐶server is ready");
  });

  app.on("error", (err) => {
    console.log("🐶error>>", err);
  });

  app.on("request", (ctx) => {
    console.log("🐶request>>", ctx);
  });

  app.on("response", (ctx) => {
    console.log("🐶response>>", ctx);
  });
};
