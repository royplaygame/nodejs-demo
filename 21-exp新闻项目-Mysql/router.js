// 路由模块

// 可以，不推荐这样写
/*module.exports=function (app) {
    app.get("/",(req,res)=>{})
    app.get("/index",(req,res)=>{})
    app.get("/detail",(req,res)=>{})
    app.get("/add",(req,res)=>{})
    app.post("/add",(req,res)=>{})
    app.get("/del",(req,res)=>{})
}*/


// 做法二

// 1. 创建一个路由对象，即是一个对象，又是一个函数
const express = require('express');
const handler = require('./handler.js');
const path = require('path')
const router = express.Router();


// 2. 通过router路由对象设置挂载路由
router.get("/", handler.index);
router.get("/index.html/:page", handler.index);
router.get("/index.html", handler.index)
router.get("/detail", (req, res) => {
})
router.get("/addNews.html", handler.toAdd)
router.post("/add.html", handler.postAdd)
router.get("/add.html", handler.getAdd)
router.get("/del.html", handler.delete)
router.get("/newsDetail.html", handler.detail)
router.get("/upd.html", handler.toUpd)
router.post("/doUpd.html", handler.doUpd)
// 1. 处理静态资源
//router.use("/pulbic",express.static(path.join(__dirname, 'public')))
// 3. 返回路由对象
module.exports = router
