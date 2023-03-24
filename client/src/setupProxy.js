const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://blog-api-production-2e51.up.railway.app/',
      changeOrigin: true,
    })
  );
};