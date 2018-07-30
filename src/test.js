const fetch = require("./next");

const Request = new fetch({
  prefix: "https://api.zhuishushenqi.com",
  logger: true
});

Request.start({
  method: "GET",
  url: "/book/fuzzy-search",
  data: { query: "儒道", start: 0, limit: 100 }
})
  .then(res => {
    // console.log("res---------->", res);
  })
  .catch(err => {
    console.log(err);
  });
