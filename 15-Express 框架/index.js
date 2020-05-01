// 入口文件

// 加载express模块
const express = require('express');

// 创建一个app对象
const app = express();

// 通过中间件监听指定的路由 ,use路径匹配时：不区分方法get、post，请求路径第一部分只要匹配即可
//app.use('/index', (req, res) => res.send('Hello World! 你好同学们！'));

// app.all() 注册路由，use路径匹配时：不区分方法，路径完全匹配
// app.all('/good', (req, res) => res.send('Hello World! 你好同学们！'));

//  请求方法确定，路径第一部分只要匹配即可，正则表达式解决
//app.get(/^\/index(\/.+)*$/,(req, res) => res.send('Hello World! 你好同学们！'));

// 通过req.params获取路由中的参数
app.get('/news/:year/:month/:day', function (req, res) {
    res.send(req.params)
})


// 启动服务
app.listen(9090, function () {
    console.log("server start up at http://localhost:9090")
})
