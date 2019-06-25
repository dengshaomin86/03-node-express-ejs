// 路由模块
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('users');
});

module.exports = router;