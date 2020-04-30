const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const querystring = require('querystring');
const _ = require("underscore");
const moment = require('moment');

// 1. require 加载是同步的
// require加载过程
// require("./index2.js");
// 先找index2.js--->index2.json--->index2.node--->
// index2文件夹--->package.json--->入口文件main app.js---->index.js/index.json/index.node--->加载失败
// 2. node_module中查找，没有在前目录的父目录中找
// 3. 先从缓存中查找。

//
// nodejs模块分三类
// 1. 核心模块、内置模块、原生模块（同一个意思）
// 2. 文件模块，写的js文件，就是一个模块  .js .json .node的文件也都是模块（c/c++编写的模块）
// 3. 自定义模块 （第三方模块） mime mogodb mysql
//


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
        readNewsData(function (list) {
            // 1. 服务端使用模板引擎，将数据渲染到页面
            res.render(path.join(__dirname, 'views', '/index.html'), {list: list})
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
        readNewsData(function (list) {
            getPostBodyData(req, function (postBody) {
                list.push(postBody);
                // 写入文件
                writeNewsData(JSON.stringify(list), function () {
                    // 跳转，设置响应报文头
                    res.statusCode = 302;
                    res.statusMessage = "Found"
                    res.setHeader('Location', '/')
                    res.end()
                })
            })
        })
    } else if (req.url.startsWith('/newsDetail.html') && req.method === 'GET') {
        const {newsId} = url.parse(req.url, true).query;
        readNewsData(function (list) {
            const newsObj = list.find((item, index) => {
                return index == newsId ? item : null
            });
            res.render(path.join(__dirname, 'views', '/newsDetail.html'), {news: newsObj})
        })
    } else if (req.url.startsWith('/del.html') && req.method === 'GET') {
        const {newsId} = url.parse(req.url, true).query
        // 读取json,删除后重新添加回去
        readNewsData(function (list) {
            list.splice(newsId, 1)
            // 写入文件，跳转到列表
            writeNewsData(JSON.stringify(list), function () {
                // 跳转，设置响应报文头
                res.statusCode = 302;
                res.statusMessage = "Found"
                res.setHeader('Location', '/')
                res.end()
            })
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


// 读取data.json文件
function readNewsData(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
        if (err) {
            throw err;
        } else {
            const newsList = JSON.parse(data || '[]');
            // 调用回调函数，传递数据，
            callback(newsList);
        }
    });
}

// 写入data.json文件
function writeNewsData(data, callback) {
    fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, function (err) {
        if (err) {
            throw err
        } else {
            // 调用回调函数，写入数据完毕后的操作
            callback();
        }
    })
}


// 获取post提交的数据
function getPostBodyData(req, callback) {
    var array = [];
    req.on('data', function (chunk) {  // chunk 当次提交的一部分数据，数据类型Buffer
        array.push(chunk)
    })
    req.on('end', function () {  // 表示上次提交的分数据已经全部接收完毕
        var postBody = Buffer.concat(array);
        postBody = postBody.toString('utf8')
        // 转换json对象
        postBody = querystring.parse(postBody);
        callback(postBody);
    })
}
