// 业务模块
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const querystring = require('querystring');

module.exports.index = function (req, res) {
    readFile(function (data) {
        /*ejs.renderFile(path.join(__dirname, 'views', 'index.html'), {list: data, name: 'peter'}, function (err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        });*/

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


/**
 * 读取文件数据
 * @param callback
 */
function readFile(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
        if (err && err.code !== 'ENOENT') {
            throw err;
        }
        let list = JSON.parse(data || '[]');

        callback(list);
    });
}

/**
 * 写入文件数据
 * @param data string
 * @param callback
 */
function writeFile(data, callback) {
    fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, function (err) {
        if (err) {
            throw err;
        }
        callback();
    });
}

/**
 * 获取 post 数据
 * @param req
 * @param callback
 */
function getPostBody(req, callback) {
    let arr = [];
    req.on('data', function (chunk) {
        // 提交的数据类型是 Buffer对象
        arr.push(chunk);
    });

    req.on('end', function () {
        // 组装数据
        let postBody = Buffer.concat(arr);
        postBody = querystring.parse(postBody.toString('utf8'));
        callback(postBody);
    });
}
