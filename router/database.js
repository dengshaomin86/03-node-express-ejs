// 路由模块
const express = require('express');
const router = express.Router();
const {db_fn} = require("../utils/database.js");

router.get('/', function (req, res) {
    res.send('database');
});

router.get('/find', function (req, res) {
  db_fn.find().then(data => {
    res.send(data);
  });
});

router.get('/add', function (req, res) {
  db_fn.add(req.query).then(data => {
    res.send(data);
  });
});

router.get('/modify', function (req, res) {
  db_fn.modify(req.query).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/remove', function (req, res) {
  db_fn.remove(req.query).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});

module.exports = router;