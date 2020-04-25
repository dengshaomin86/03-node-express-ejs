const os = require('os');

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
    postBody = JSON.parse(postBody.toString('utf8'));
    callback(postBody);
  });
}

// 获取本机 ip 地址
function getIPAddress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

module.exports = {
  getPostBody,
  getIPAddress
};
