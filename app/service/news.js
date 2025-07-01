const Service = require("egg").Service;

class NewsService extends Service {
  async list() {
    const { config, ctx } = this;

    const res = await ctx.curl(`${config.news}/test/news/list`);
    // res.data 是buffer
    const data = JSON.parse(res.data.toString());

    return data;
  }
}

module.exports = NewsService;
