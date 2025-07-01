const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log("ctx>>", ctx);
    ctx.body = "hi, egg";
  }
}

module.exports = HomeController;
