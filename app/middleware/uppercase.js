module.exports = (options) => {
  return async function uppercase(ctx, next) {
    console.log("uppercase middleware ctx>>", ctx.query);
    ctx.query.name = ctx.query.name.toUpperCase();
    await next();
  };
};
