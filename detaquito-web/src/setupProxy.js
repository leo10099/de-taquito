const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/auth/google",
		createProxyMiddleware({
			target: "http://localhost:7777",
		})
	);
	app.use(
		"/auth/google/callback",
		createProxyMiddleware({
			target: "http://localhost:7777/api",
		})
	);
};
