const { Controller, Service } = require("egg");

class NewsController extends Controller {
  async list() {
    const { ctx, config } = this;

    // 业务放在service层
    const data = await ctx.service.news.list();

    const dataList = data.data;
    await ctx.render("news/list.tpl", dataList);
  }
}

module.exports = NewsController;
