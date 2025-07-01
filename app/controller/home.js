const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    // console.log("🐶this>>", this);
    // this 身上有ctx, app, config, service
    const { ctx, app, config, service } = this;
    console.log("🐶ctx>>", ctx.helper);
    console.log("🐶ctx isIOS>>", ctx.isIOS);
    ctx.body = "hi, egg";
  }
}

module.exports = HomeController;
