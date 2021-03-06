// 入口文件

// 加载express模块
const express = require('express');

// 创建一个app对象
const app = express();

// 通过中间件监听指定的路由，get方法，并且路径要严格相等path===/
app.get('/', (req, res) => res.send('Hello World! 你好同学们！'))

// res.end() 和 res.send() 区别
// 参数
// res.send()参数： a Buffer object, a String, an object, or an Array.
// res.end() 参数：String ,Buffer
// res.send() 自动生成更多的相应报文头.其中包括Content-Type:text/html;charset=utf8

// 启动服务
app.listen(9090,function () {
    console.log("server start up at http://localhost:9090")
})
