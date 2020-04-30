const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const querystring = require('querystring');
const _ = require("underscore");
const moment = require('moment');


http.createServer(function (req, res) {

    // 挂载到res,tplData传入的模板数据
    res.render = function (filename, tplData) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.setHeader("Content-Type", "text/html;charset=utf-8")
                res.end("读取文件失败! 404")
            } else {
                // 不同的文件类型，不同用怎么办
                // 通过第三方模块mime 实现
                // https://tool.oschina.net/commons

                if (tplData) { //要模板替换
                    var fn = _.template(data.toString('utf8'));
                    data = fn(tplData);
                }

                res.setHeader("Content-Type", mime.getType(filename))
                res.end(data)
            }
        })
    }


    if (req.url === '/' || req.url === '/index.html' && req.method === 'GET') {
        // 1. 读取新闻数据,转换成list
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            // 第一次data.json不存在
            if (err && err.code !== 'ENOENT') {
                throw err
            } else {
                const newsList = JSON.parse(data || '[]');

                // 2. 服务端使用模板引擎，将数据渲染到页面
                const filename = path.join(__dirname, 'views', '/index.html');
                // 读取文件
                res.render(filename, {list: newsList})

            }
        })

    } else if (req.url === '/addNews.html' && req.method === 'GET') {
        const filename = path.join(__dirname, 'views', '/addNews.html');
        // 读取文件
        res.render(filename)
    } else if (req.url.startsWith('/add.html') && req.method === 'GET') {
        // 第二个参数true,表明返回一个对象
        const newsObj = url.parse(req.url, true)
        const {title, newsUrl, content} = newsObj.query
        const obj = {title, newsUrl, content}
        // 读取文件
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            // 第一次data.json不存在
            if (err && err.code !== 'ENOENT') {
                throw err
            } else {
                const newsList = JSON.parse(data || '[]');
                newsList.push(obj)
                // 写入文件
                fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(newsList), function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log("新闻保存成功！");
                        // 跳转，设置响应报文头
                        res.statusCode = 302;
                        res.statusMessage = "Found"
                        res.setHeader('Location', '/')
                        res.end()
                    }
                })

            }
        })

    } else if (req.url.startsWith('/add.html') && req.method === 'POST') {
        // post数据量大，分批次提交
        // 读取文件
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            // 第一次data.json不存在
            if (err && err.code !== 'ENOENT') {
                throw err
            } else {
                const newsList = JSON.parse(data || '[]');

                // 监听request对象的data和end事件
                var array = [];
                req.on('data', function (chunk) {  // chunk 当次提交的一部分数据，数据类型Buffer
                    array.push(chunk)
                })

                req.on('end', function () {  // 表示上次提交的分数据已经全部接收完毕
                    var postBody = Buffer.concat(array);
                    postBody = postBody.toString('utf8')

                    // 转换json对象
                    const {title, newsUrl, content} = querystring.parse(postBody)
                    const obj = {title, newsUrl, content}
                    newsList.push(obj);
                    // 写入文件
                    fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(newsList), function (err) {
                        if (err) {
                            throw err
                        } else {
                            console.log("新闻保存成功！");
                            // 跳转，设置响应报文头
                            res.statusCode = 302;
                            res.statusMessage = "Found"
                            res.setHeader('Location', '/')
                            res.end()
                        }
                    })
                })


            }
        })

    } else if (req.url.startsWith('/newsDetail.html') && req.method === 'GET') {
        const {newsId} = url.parse(req.url, true).query;
        const filename = path.join(__dirname, 'views', '/newsDetail.html');
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            if (err) {
                throw err;
            } else {
                const newsList = JSON.parse(data || '[]');
                const newsObj = newsList.find((item, index) => {
                    return index == newsId ? item : null
                });
                res.render(filename, {news: newsObj})
            }
        })
    } else if (req.url.startsWith('/del.html') && req.method === 'GET') {
        const {newsId} = url.parse(req.url, true).query
        // 读取json,删除后重新添加回去
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            if (err) {
                throw err;
            } else {
                const newsList = JSON.parse(data || '[]');
                newsList.splice(newsId, 1)
                // 写入文件，跳转到列表
                fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(newsList), function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log("新闻保存成功！");
                        // 跳转，设置响应报文头
                        res.statusCode = 302;
                        res.statusMessage = "Found"
                        res.setHeader('Location', '/')
                        res.end()
                    }
                })
            }
        })
    } else if (req.url.startsWith('/public') && req.method === 'GET') {
        // 文件路径
        const filename = path.join(__dirname, req.url);
        // 读取文件
        res.render(filename)
    } else {
        const filename = path.join(__dirname, 'views', '/404.html');
        // 读取文件
        res.render(filename)
    }
}).listen(8080, function () {
    console.log("server start success: http://localhost:8080");
})



