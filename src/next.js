const nodeFetch = require("node-fetch");
const qs = require("querystringify");
const defaults = {
  mode: "cors",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

class fetch {
  constructor(options = {}) {
    this.prefix = options.prefix || "";
    this.printlog = options.logger || false;

    let flag = /(http|https):\/\//.test(this.prefix);
    if (this.prefix && !flag) {
      throw new Error(`prefix must begin with http://* or https://* `);
    }
  }

  /**
   * 生成全路径url
   * @param  {[type]} url [description]
   * @return {[type]}     [description]
   */
  generateUrl() {
    const { url } = this.param;

    this.url = this.prefix + url;
  }

  /**
   * 根据方法生成请求参数
   * @return {[type]} [description]
   */
  generateData() {
    const { method, data = {} } = this.param;

    if (method === "GET") {
      this.url = this.url + qs.stringify(data, true);
    } else {
      this.option.body = JSON.stringify(data);
    }
  }

  generateOption() {
    this.option = { ...defaults, ...this.param.options, ...this.option };
  }

  logger(url, method, status, time) {
    this.printlog &&
      console.log(
        `fetch logger: ${decodeURIComponent(url)} ${method} ${status} ${time ||
          0}ms`
      );
  }

  request() {
    let start = new Date().getTime();
    return nodeFetch(this.url, this.option)
      .then(response => {
        this.logger(
          this.url,
          this.param.method,
          response.status,
          Date.now() - start
        );
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          return Promise.reject({
            message: response.statusText,
            status: response.status
          });
        }
      })
      .catch(err => {
        return Promise.reject({ message: err, status: 0 });
      });
  }
  /**
   *  url
   *  method 'GET'
   *  data
   *  options
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  start(param) {
    this.param = { method: "GET", ...param };
    this.option = {};
    this.generateUrl();
    this.generateData();
    this.generateOption();

    return this.request();
  }
}

module.exports = fetch;
