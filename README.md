
# kin-fetch

> 依赖于 node-fetch

```js
const kinFetch = require('kin-fetch')


const request = kinFetch({
  url:'', //baseurl
  options:{},
  logger: (err, url, method, status, time) => {
    !err && console.log(url, method, status, time);
  }
})

```
- url

> 非必填

> type: string  

- logger

> 非必填

> type: function  

- options

> 非必填

> type: object

> [node-fetch options](https://github.com/bitinn/node-fetch#options)


```js
request({
  url:'',//请求的路径为 baseurl + url
  method:'',
  data:{} // GET POST 请求参数
}).then((value) => {
  //success
}).catch((err) => {
  // errot
})
```
- url

> 必填  

- method

> 非必填 默认 GET

- data

> 非必填  默认{}
