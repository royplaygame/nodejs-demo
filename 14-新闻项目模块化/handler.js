// 模块四：处理具体路由业务代码，业务模块

const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const config = require('./config.js')

// 1. 处理index.html 里面的代码
module.exports.index = function (req, res) {
    // 1. 读取新闻数据,转换成list
    readNewsData(function (list) {
        // 1. 服务端使用模板引擎，将数据渲染到页面
        res.render(path.join(config.viewPath, '/index.html'), {list: list})
    })
}
// 2. 处理addNews.html 里面的代码
module.exports.toNews = function (req, res) {
    // 读取文件
    res.render(path.join(config.viewPath, '/addNews.html'))
}
// 3. 处理newsDetail.html里面的代码
module.exports.detail = function (req, res) {
    const {newsid} = req.query;
    readNewsData(function (list) {
        const newsObj = list.find((item, index) => {
            return index == newsid ? item : null
        });
        res.render(path.join(config.viewPath, '/newsDetail.html'), {news: newsObj})
    })
}
// 4. 处理add.html get里面的代码
module.exports.addGet = function (req, res) {
// 第二个参数true,表明返回一个对象
    const obj = req.query
    // 读取文件
    fs.readFile(config.dataPath, 'utf8', function (err, data) {
        // 第一次data.json不存在
        if (err && err.code !== 'ENOENT') {
            throw err
        } else {
            const newsList = JSON.parse(data || '[]');
            newsList.push(obj)
            // 写入文件
            fs.writeFile(config.dataPath, JSON.stringify(newsList), function (err) {
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

}
// 5. 处理add.html post里面的代码
module.exports.addPost = function (req, res) {
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
}
// 6. 处理del.html里面的代码
module.exports.delNews = function (req, res) {
    const {newsid} = req.query
    // 读取json,删除后重新添加回去
    readNewsData(function (list) {
        list.splice(newsid, 1)
        // 写入文件，跳转到列表
        writeNewsData(JSON.stringify(list), function () {
            // 跳转，设置响应报文头
            res.statusCode = 302;
            res.statusMessage = "Found"
            res.setHeader('Location', '/')
            res.end()
        })
    })
}
// 7. 处理public 里面的代码
module.exports.resource = function (req, res) {
    res.render(path.join(__dirname, req.url))
}
// 8. 处理public 里面的代码
module.exports.errorTips = function (req, res) {
    res.render(path.join(config.viewPath, '/404.html'));
}

// 读取data.json文件
function readNewsData(callback) {
    fs.readFile(config.dataPath, 'utf8', function (err, data) {
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
    fs.writeFile(config.dataPath, data, function (err) {
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
