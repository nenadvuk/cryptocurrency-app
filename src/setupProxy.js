
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      "/api",
      {
        target: "https://api-pub.bitfinex.com",
        changeOrigin: true
      }
    )
  );
};
