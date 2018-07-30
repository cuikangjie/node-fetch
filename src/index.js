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

const fetch = ({ url, options, logger }) => {
  const baseurl = url || "";

  return param => {
    if (!param.url) {
      return Promise.reject({ message: "url is necessary", status: 0 });
    }

    let url =
      baseurl +
      `${param.url}${
        param.method === "GET" ? qs.stringify(param.data || {}, true) : ""
      }`;

    let start = new Date().getTime();

    return nodeFetch(url, {
      ...defaults,

      ...(options || {}),

      method: param.method || "GET",
      body: param.method === "POST" && JSON.stringify(param.data || {})
    })
      .then(response => {
        logger &&
          logger(
            false,
            url,
            param.method || "GET",
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
        logger && logger(err);
        return Promise.reject({ message: err, status: 0 });
      });
  };
};

module.exports = fetch;
