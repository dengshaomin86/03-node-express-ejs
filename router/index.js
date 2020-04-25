// 路由模块
const express = require('express');
const handler = require('./../handler.js');
const config = require('./../config');
const router = express.Router();

router.get('/', handler.index);
router.get('/index', handler.index);
router.get('/detail', handler.detail);
router.get('/submit', handler.submit);
router.get('/add', handler.addGet);
router.post('/add', handler.addPost);
router.post('/signIn', handler.signIn);
router.post('/signUp', handler.signUp);
router.get('/favicon.ico', handler.favicon);

// 处理静态资源
router.use('/static', express.static(config.staticPath));

// 处理 404 错误请求
router.get('*', handler.error);

module.exports = router;