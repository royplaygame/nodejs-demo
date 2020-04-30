const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');


http.createServer(function (req, res) {
    if (req.url === '/' || req.url === '/index.html' && req.method === 'GET') {
        const filename = path.join(__dirname, 'views', '/index.html');
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
    } else if (req.url === '/addNews.html' && req.method === 'GET') {
        const filename = path.join(__dirname, 'views', '/addNews.html');
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
    } else if (req.url === '/newsDetail.html' && req.method === 'GET') {
        const filename = path.join(__dirname, 'views', '/newsDetail.html');
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
    } else if (req.url.startsWith('/public') && req.method === 'GET') {
        // 文件路径
        const filename = path.join(__dirname, req.url);
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
    } else {
        const filename = path.join(__dirname, 'views', '/404.html');
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
    }


}).listen(8080, function () {
    console.log("server start success: http://localhost:8080")
})

