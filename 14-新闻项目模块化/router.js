// 模块三：处理路由服务，路由模块, 所有路由代码

const handler = require('./handler.js')

module.exports = function (req, res) {
    if (req.pathname === '/' || req.pathname === '/index.html' && req.method === 'get') {
        handler.index(req, res);
    } else if (req.url.startsWith('/addNews.html') && req.method === 'get') {
        handler.toNews(req, res);
    } else if (req.pathname === '/add.html' && req.method === 'get') {
        handler.addGet(req, res);
    } else if (req.pathname === '/add.html' && req.method === 'post') {
        handler.addPost(req, res);
    } else if (req.url.startsWith('/newsDetail.html') && req.method === 'get') {
        handler.detail(req, res);
    } else if (req.url.startsWith('/del.html') && req.method === 'get') {
        handler.delNews(req, res);
    } else if (req.url.startsWith('/public') && req.method === 'get') {
        handler.resource(req, res);
    } else {
        handler.errorTips(req, res);
    }
}


