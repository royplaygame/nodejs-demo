const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');


http.createServer(function (req, res) {
    // 获取public路径
    const publicDir = path.join(__dirname, 'public')
    // 文件路径
    const filename = path.join(publicDir, req.url);
    console.log(filename)
    // 读取文件
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("读取文件失败! 404")
        } else {
            // 不同的文件类型，不同用怎么办
            // 通过第三方模块mime 实现
            // https://tool.oschina.net/commons
            res.setHeader("Content-Type", mime.getType(filename))
            res.end(data)
        }
    })
}).listen(8080, function () {
    console.log("server start success: http://localhost:8080")
})


// 带图片，图片无法返回，服务器没有处理pic的请求
