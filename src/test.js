const fetch = require('./index')

console.log(fetch);
fetch({
  logger: (err, url, method, code, time) => {
    !err && console.log(url, method, code, time);
  }
})({url: ''}).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log('1', err);
})
