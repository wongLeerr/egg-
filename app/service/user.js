const { Service } = require("egg");

class UserService extends Service {
  async find(uid) {
    // const { ctx } = this;
    // const user = await ctx.db.query("select * from user where id = ?", [uid]);
    // return user;
  }
}

module.exports = UserService;
