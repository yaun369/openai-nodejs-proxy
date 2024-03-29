const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = 3000;

app.use(
  "/anthropic",
  createProxyMiddleware({
    target: "https://api.anthropic.com",
    pathRewrite: {
      "^/anthropic": "", // 将路径中的 /anthropic 替换为空字符串
    },
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
      proxyReq.removeHeader("x-forwarded-for");
      proxyReq.removeHeader("x-real-ip");
    },
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.use(
  "/arxiv/api",
  createProxyMiddleware({
    target: "http://export.arxiv.org/api/query",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
      proxyReq.removeHeader("x-forwarded-for");
      proxyReq.removeHeader("x-real-ip");
    },
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.use(
  "/pdf",
  createProxyMiddleware({
    target: "https://arxiv.org",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
      proxyReq.removeHeader("x-forwarded-for");
      proxyReq.removeHeader("x-real-ip");
    },
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.use(
  "/",
  createProxyMiddleware({
    target: "https://api.openai.com",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
      proxyReq.removeHeader("x-forwarded-for");
      proxyReq.removeHeader("x-real-ip");
    },
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
