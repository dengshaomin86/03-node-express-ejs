// 配置启动服务
const express = require('express');

const app = express();

// 配置模板引擎
app.set('views', './views');
app.set('view engine', 'ejs');

const config = require('./config.js');

// router
const indexRouter = require('./router/index');
const usersRouter = require('./router/users');

app.use('/users', usersRouter);
app.use('/', indexRouter);

app.listen(config.port, function () {
    console.log('http://localhost:' + config.port);
});