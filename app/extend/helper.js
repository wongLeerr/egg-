const moment = require("moment");

module.exports = {
  // 时间格式化
  relativeTime(time) {
    return moment(new Date(time * 1000)).fromNow();
  },
};
