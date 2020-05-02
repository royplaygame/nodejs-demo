// 业务模块

const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const config = require('./config.js');
const {getTotal, getPage, addNews, delNews, updNews, findById} = require('./news.js')

// 处理新闻列表index
module.exports.index = function (req, res) {
    // 可以，不使用
    // 原因：要进行模版替换
    // res.sendFile(path.join(__dirname, 'views', 'index.html'))
    // 查询当前页
    let {page} = req.params
    if (page == null) {
        page = 1
    }
    // 读取数据
    getTotal().then((data) => {
        // 获取总页数，当前页数据
        const total = data.total % 10 == 0 ? parseInt(data.total / 10) : parseInt(data.total / 10 + 1);
        if (page < 1) {
            page = 1
        } else if (page >= total) {
            page = total
        }
        getPage(page).then((list) => {
            //res.render() 渲染方法,配置模版引擎如下
            ejs.renderFile(path.join(__dirname, 'views', 'index.html'), {
                list: list,
                total: total,
                curPage: parseInt(page != null ? page : 1)
            }, function (err, result) {
                res.send(result)
            })
        }, (err) => {
            console.log(err)
        })
    }, (err) => {
        console.log(err)
    })

}

// 处理新闻列表index
module.exports.toAdd = function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'addNews.html'))
}

// post添加新闻
module.exports.postAdd = function (req, res) {
    // 获取新闻对象
    let newsObj = req.body;
    // 保存数据到数据库
    addNews(newsObj).then((data) => {
        res.redirect("/index.html")
    }, (err) => {
        console.log('添加news失败' + err)
    })

}

// get添加新闻
module.exports.getAdd = function (req, res) {
    // 获取新闻对象
    let newsObj = req.query;
    // 读取数据
    // 保存数据到数据库
    addNews(newsObj).then((data) => {
        res.redirect("/index.html")
    }, (err) => {
        console.log('添加news失败' + err)
    })
}

// 刪除新闻
module.exports.delete = function (req, res) {
    const {newsId, page} = req.query;
    // 读取数据
    delNews(newsId).then((result) => {
        res.redirect("/index.html/" + page)
    }, (err) => {
        console.log('删除news失败' + err)
    })
}

// 查看新闻详情
module.exports.detail = function (req, res) {
    const {newsId} = req.query;
    // 数据库读取数据
    findById(newsId).then((result) => {
        const news = (result == null ? null : result[0]);
        ejs.renderFile(path.join(__dirname, 'views', 'newsDetail.html'), {news: news}, function (err, result) {
            res.send(result)
        })
    }, (err) => {
        console.log(err)
    })
}

// 修改新闻
module.exports.doUpd = function (req, res) {
    const {newsId, title, newsUrl, content} = req.body;
    const news = {title, newsUrl, content,newsId};
    console.log(news)
    updNews(news).then((result) => {
        res.redirect('/index.html')
    }, (err) => {
        console.log(err)
    })
}
// 跳转修改新闻页面
module.exports.toUpd = function (req, res) {
    let {newsId, page} = req.query;
    // 删除位置记录
    findById(newsId).then((result) => {
        const news = (result == null ? null : result[0]);
        ejs.renderFile(path.join(__dirname, 'views', 'updNews.html'), {news: news}, function (err, result) {
            res.send(result)
        })
    }, (err) => {
        console.log(err)
    })
}
