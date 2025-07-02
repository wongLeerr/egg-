module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/news", controller.news.list);
  router.get("/user/:id", controller.user.info);
  router.get("/search", app.middleware.uppercase(), controller.search.index); // 访问 /search?name=nodejs 会先执行 app.middleware.uppercase() 中间件，再交给对应controller处理
};
