const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api5", {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api5": "" },
    })
  );
};
