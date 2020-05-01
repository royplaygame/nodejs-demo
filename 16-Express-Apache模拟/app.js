// 入口文件
// 加载express模块
const express = require('express');
const path = require('path')

// 创建一个app对象
const app = express();


// 处理静态资源的方法
// var fn = express.static(path.join(__dirname, 'public'));
// console.log(fn)
// 注册路由
app.use("/", express.static(path.join(__dirname, 'public')))

// res.redirect() 重定向
// res.json([body])  传对象相当于res.send()
// res.sendFile(path [, options] [, fn])
// res.status(403).end()  链式编程

// 启动服务
app.listen(9090, function () {
    console.log("server start up at http://localhost:9090")
})
