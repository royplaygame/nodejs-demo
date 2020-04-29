const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
    //获取用户请求的路径 req.url
    if (req.url === '/' || req.url === '/index') {
        fs.readFile(path.join(__dirname, 'views', 'index.html'), function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data)
            }
        })
    } else if (req.url === '/login') {
        fs.readFile(path.join(__dirname, 'views', 'login.html'), function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data)
            }
        })
    } else if (req.url === '/userlist') {
        fs.readFile(path.join(__dirname, 'views', 'userlist.html'), function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data)
            }
        })
    } else if (req.url === '/register') {
        fs.readFile(path.join(__dirname, 'views', 'register.html'), function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data)
            }
        })
    } else {
        fs.readFile(path.join(__dirname, 'views', '404.html'), function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data)
            }
        })
    }
}).listen(8080, function () {
    console.log("server start success: http://localhost:8080")
})


