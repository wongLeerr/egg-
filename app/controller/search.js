const { Controller } = require("egg");

class SearchController extends Controller {
  async index() {
    const { ctx } = this;
    console.log("🐶ctx>> name", ctx.query.name);
    ctx.body = `hello world ${ctx.query.name}`;
  }
}

module.exports = SearchController;
