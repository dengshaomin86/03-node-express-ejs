// 路由模块
const express = require('express');
const router = express.Router();
const fn = require("../database.js");

router.get('/', function (req, res) {
    res.send('database');
});

router.get('/find', function (req, res) {
  fn.find().then(data => {
    res.send(data);
  });
});

router.get('/add', function (req, res) {
  fn.add(req.query).then(data => {
    res.send(data);
  });
});

router.get('/modify', function (req, res) {
  fn.modify(req.query).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/remove', function (req, res) {
  fn.remove(req.query).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});

module.exports = router;