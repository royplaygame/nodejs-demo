// 业务模块

const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const config = require('./config.js');

// 处理新闻列表index
module.exports.index = function (req, res) {
    // 可以，不使用
    // 原因：要进行模版替换
    // res.sendFile(path.join(__dirname, 'views', 'index.html'))
    // 读取数据
    readNewsData(function (list) {
        // 查询当前页
        let {page} = req.params
        // 获取总页数，当前页数据
        const total = list.length % 10 == 0 ? parseInt(list.length / 10) : parseInt(list.length / 10 + 1);
        if (page != null && page > 0 && page <= total) {
            list = list.filter((item, index) => (index < 10 * page && index >= 10 * (page - 1)))
        } else if (page != null && page >= total) {
            // 超过总页数
            page = total;
            list = list.filter((item, index) => (index < 10 * page && index >= 10 * (page - 1)))
        } else {
            // 默认第一页数据
            list = list.filter((item, index) => index < 10);
            page = 1;
        }

        // res.render() 渲染方法,配置模版引擎如下
        ejs.renderFile(path.join(__dirname, 'views', 'index.html'), {
            list: list,
            total: total,
            curPage: parseInt(page != null ? page : 1)
        }, function (err, result) {
            res.send(result)
        })
    })
}

// 处理新闻列表index
module.exports.toAdd = function (req, res) {
    res.sendfile(path.join(__dirname, 'views', 'addNews.html'))
}

// post添加新闻
module.exports.postAdd = function (req, res) {
    // 获取新闻对象
    let newsObj = req.body;
    // 读取数据
    readNewsData(function (list) {
        list.push(newsObj)
        // 写入数据
        writeNewsData(JSON.stringify(list), function () {
            res.redirect("/index.html")
        })
    })
}

// get添加新闻
module.exports.getAdd = function (req, res) {
    // 获取新闻对象
    let newsObj = req.query;
    // 读取数据
    readNewsData(function (list) {
        list.push(newsObj)
        // 写入数据
        writeNewsData(JSON.stringify(list), function () {
            res.redirect("/index.html")
        })
    })
}

// 刪除新闻
module.exports.delete = function (req, res) {
    const {newsId, page} = req.query;
    // 读取数据
    readNewsData(function (list) {
        list.splice(parseInt(newsId) + (page - 1) * 10, 1)
        // 写入数据
        writeNewsData(JSON.stringify(list), function () {
            res.redirect("/index.html")
        })
    })
}

// 查看新闻详情
module.exports.detail = function (req, res) {
    const {newsId} = req.query;
    // 读取数据
    readNewsData(function (list) {
        const news = list.find((item, index) => {
            return newsId == index ? item : null
        })
        ejs.renderFile(path.join(__dirname, 'views', 'newsDetail.html'), {news: news}, function (err, result) {
            res.send(result)
        })
    })
}

// 修改新闻
module.exports.doUpd = function (req, res) {
    const {newsId, title, newsUrl, content} = req.body;
    const news = {title, newsUrl, content};
    readNewsData(function (list) {
        list.splice(newsId, 1, news);
        writeNewsData(JSON.stringify(list), function () {
            res.redirect('/index.html')
        })
    })
}
// 跳转修改新闻页面
module.exports.toUpd = function (req, res) {
    let {newsId, page} = req.query;
    // 删除位置记录
    const newsIndex = parseInt(newsId) + (page - 1) * 10
    readNewsData(function (list) {
        const news = list.filter((item, index) => newsIndex == index ? item : null);
        // 给news增加id属性
        news[0].id = newsIndex;
        ejs.renderFile(path.join(__dirname, 'views', 'updNews.html'), {news: news[0]}, function (err, result) {
            res.send(result);
        })
    })
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


