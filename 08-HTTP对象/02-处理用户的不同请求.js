const http = require('http')

http.createServer(function (req, res) {

    //获取用户请求的路径 req.url
    if (req.url === '/' || req.url === '/index') {
        res.end("index")
    } else if (req.url === '/login') {
        res.end("login")
    } else if (req.url === '/userlist') {
        res.end("userlist")
    } else if (req.url === '/register') {
        res.end("register")
    } else {
        res.end("404 not Found")
    }

    res.end("ok")

}).listen(8080, function () {
    console.log("server start success: http://localhost:8080")
})


