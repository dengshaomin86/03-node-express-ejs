/**
 * 业务模块
 * ejs 两种渲染方式（对应ejs文件、html文件）
 */
const path = require('path');
const ejs = require('ejs');
const {getPostBody} = require("./utils/index.js");
const {readFile, writeFile} = require("./utils/fileOpt.js");

module.exports.index = function (req, res) {
  readFile(function (data) {
    res.render('index', {list: data, name: 'peter'}, function (err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
};

module.exports.detail = function (req, res) {
  readFile(function (list) {
    let obj = list.find(item => item.id === Number(req.query.id));
    if (obj) {
      ejs.renderFile(path.join(__dirname, 'views', 'detail.html'), obj, function (err, result) {
        if (err) {
          throw err;
        }
        res.send(result);
      });
    } else {
      res.end('No such Item');
    }
  });
};

module.exports.submit = function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'submit.html'));
};

module.exports.addGet = function (req, res) {
  readFile(function (list) {
    req.query.id = (list.length ? Math.max.apply(null, list.map(function (o) {
      return o.id
    })) : 0) + 1;
    list.push(req.query);

    writeFile(JSON.stringify(list), function () {
      res.redirect('/');
    });

  });
};

module.exports.addPost = function (req, res) {
  // post 的数据量过大时会分多次提交，每次提交都会触发req.on('data')，提交完成会触发req.on('end')
  readFile(function (list) {
    getPostBody(req, function (postBody) {
      postBody.id = (list.length ? Math.max.apply(null, list.map(function (o) {
        return o.id
      })) : 0) + 1;

      list.push(postBody);

      writeFile(JSON.stringify(list), function () {
        res.redirect('/');
      });

    });
  });
};

module.exports.favicon = function (req, res) {
  res.sendFile(path.join(__dirname, 'favicon.png'));
};

module.exports.error = function (req, res) {
  res.status(404).send('404 Not Found');
};
