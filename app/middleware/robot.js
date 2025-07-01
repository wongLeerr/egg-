// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    console.log("robotMiddleware 执行");
    const source = ctx.get("user-agent") || "";
    await next();
  };
};
