/**
 * 文件操作
 * process.cwd() 获取程序根目录
 * __dirname 当前文件所在的目录
 * __filename 表示正在执行脚本的文件名
 */
const fs = require('fs');
const path = require('path');

/**
 * 读取文件数据
 * @param callback
 */
function readFile(callback) {
  fs.readFile(path.join(process.cwd(), 'data', 'data.json'), 'utf8', function (err, data) {
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
  fs.writeFile(path.join(process.cwd(), 'data', 'data.json'), data, function (err) {
    if (err) {
      throw err;
    }
    callback();
  });
}

module.exports = {
  readFile,
  writeFile
};
