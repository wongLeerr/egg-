const { Controller } = require("egg");

class UserController extends Controller {
  info() {
    const { ctx, app } = this;

    console.log("🐶ctx>>", ctx.params.id);

    ctx.body = `hi! user id: ${ctx.params.id}`;
  }
}

module.exports = UserController;
