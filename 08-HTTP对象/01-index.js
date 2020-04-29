// 加载http模块
const http = require('http');

// 创建http服务
let server = http.createServer();


// 监听用户请求事件
server.on('request', function (req, res) {
    //获取用户请求的路径 req.url
    console.log(req.url)


    // 中文乱码， 设置相应报文头
    res.setHeader('Content-Type', 'text/html;charset=utf-8')

    res.write("<h1>我是服务器，我正在服务！，中文乱码</h1> ")
    res.write("I am server,I am working")
    // 服务器相应ok,该服务器应该视为此消息已完成
    res.end("  ==>ok")
});


//启动服务
server.listen(8080, function () {
    console.log("server start success: http://localhost:8080")
});


// 1. 中文乱码， 设置相应报文头

// 2. 不同路径，相应不同的数据

// 3. 获取用户请求的路径 req.url
