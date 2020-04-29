// request常用方法
// request.headers
// request.rawHeaders
// request.httpVersion
// request.method
// request.url

// response常用方法
// response.end()     可以是字符串或者Buffer, 还可以有一个回调函数
// response.write()   可以是字符串或者Buffer
// response.setHeader('Content-Type', 'text/css');设置css响应头
// response.statusCode    状态码。
// response.statusMessage  状态消息
// http 状态码地址：http://tools.jb51.net/table/http_status_code

//response.writeHead 向客户端写入响应报文头

const http = require('http')

http.createServer(function (req, res) {
    // 返回的是一个对象
    //console.log(req.headers)

    // 返回的是一个数组
    //console.log(req.rawHeaders)

    // console.log(req.httpVersion);
    // console.log(req.method);
    // console.log(req.url);

    //



    // res.statusCode = '404'
    // res.statusMessage = 'Not Found'
    // res.setHeader("Content-Type","text/html;charset=utf-8")

    // 会自动调用
    res.writeHead(200, 'OK', {
        "Content-Type": "text/plain;charset=utf-8"
    });


    res.write('如果在调用此方法之前调用了 response.write() 或 response.end()，则将计算隐式或可变的响应头并调用此函数。')
    res.end("ok")
}).listen(8080, function () {
    console.log("server start up http://localhsot:8080")
})
