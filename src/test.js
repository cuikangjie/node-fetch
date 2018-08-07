const fetch = require("./next");

// http://statics.zhuishushenqi.com/
const Request = new fetch({
  prefix: "http://statics.zhuishushenqi.com",
  logger: true
});

Request.start({
  method: "GET",
  url:
    "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F41885%2F41885_27b8842b02ae4bf8b0c3992d3bcbc46f.jpg%2F",
  options: { headers: { Accept: "*/*" } }
})
  .then(res => {
    console.log("res---------->", res);
  })
  .catch(err => {
    console.log(err);
  });
