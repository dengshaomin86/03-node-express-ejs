const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017/runoob";

// 定义连接的数据库
const db_name = "test";

const db_fn = {
  collectionName: "student",
  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          console.log("数据库连接失败", err);
          reject("数据库连接失败");
          return;
        }
        resolve(client);
      });
    });
  },
  add(obj) {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        // 存入数据并退出连接
        collection.insertOne(obj, (err, result) => {
          client.close();
          if (err) {
            reject("新增失败");
            return;
          }
          resolve("新增成功");
        });
      });
    });
  },
  remove(obj) {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        this.findOne(obj._id).then(source => {
          // 更新指定数据并退出连接
          // delete source._id;
          // delete obj._id;

          // 删除指定数据并退出连接
          collection.remove({
            _id: source._id
          }, (err, result) => {
            client.close();
            if (err) {
              reject("删除失败");
              return;
            }
            resolve("删除成功");
          });

        }).catch(err => {
          reject(err);
        });

      });
    });
  },
  // updateOne, updateMany, or bulkWrite
  modify(obj) {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        this.findOne(obj._id).then(source => {
          // 更新指定数据并退出连接
          delete source._id;
          delete obj._id;
          collection.updateOne(source, {
            $set: obj
          }, (err, result) => {
            client.close();
            if (err) {
              reject("修改失败");
              return;
            }
            resolve("修改成功");
          });
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  },
  find() {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        collection.find().toArray((err, res) => {
          client.close();
          if (err) {
            reject("查询失败");
            return;
          }
          resolve(res);
        });
      }).catch(err => {
        reject(err);
      });
    });
  },
  findOne(_id) {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        collection.find().toArray((err, res) => {
          client.close();
          if (err) {
            reject("查询失败");
            return;
          }
          let source = res.find(item => String(item._id) === _id);
          if (!source) {
            reject("无匹配");
            return;
          }
          resolve(source);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }
};

const db_user = {
  collectionName: "user",
  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          console.log("数据库连接失败", err);
          reject("数据库连接失败");
          return;
        }
        resolve(client);
      });
    });
  },
  add(obj) {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        // 存入数据并退出连接
        collection.insertOne(obj, (err, result) => {
          client.close();
          if (err) {
            reject("新增失败");
            return;
          }
          resolve("新增成功");
        });
      });
    });
  },
  findAllUser() {},
  findUser(username) {
    return new Promise((resolve, reject) => {
      this.connect().then(client => {
        const collection = client.db(db_name).collection(this.collectionName);
        collection.find().toArray((err, res) => {
          client.close();
          if (err) {
            reject("查询失败");
            return;
          }
          let source = res.find(item => String(item.username) === username);
          if (!source) {
            reject("无匹配");
            return;
          }
          resolve(source);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }
};

module.exports = {
  db_fn,
  db_user,
};
