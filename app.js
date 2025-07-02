module.exports = (app) => {
  app.beforeStart(async () => {
    console.log("🐶beforeStart");
    // 可以创建一个匿名的 context 对象，可以调用 service 等
    const ctx = app.createAnonymousContext();
    // await ctx.service.user.findAll();
    ctx.logger.info("🐶ctx.logger");
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
