// news 模块的增删改查
const mysql = require('mysql')

// 连接配置
const pool = mysql.createPool({
    host: '192.168.56.102',
    port: '3306',
    user: 'root',
    password: 'luoyang',
    database: 'node',
    timezone: "08:00"
})

function getData(sql, ...params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (err) {
                reject(err);
                return;
            }
            conn.query(sql, params, function (err, data) {
                conn.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            })
        })
    })
}


// 查询所有news总数量
module.exports.getTotal = function () {
    return new Promise((resolve, reject) => {
        let sql = "select count(*) as total from news"
        getData(sql).then((res) => {
            resolve(res[0])
        }, (err) => {
            reject(err)
        })
    })
}


// 分页查询news
module.exports.getPage = function (page) {
    return new Promise((resolve, reject) => {
        const sql = "select * from news order by newsId limit ?,?"
        getData(sql, (page - 1) * 10, 10).then((res) => {
            resolve(res)
        }, (err) => {
            reject(err)
        })
    })
}


//根据newsId查询news
module.exports.findById = function (newsId) {
    return new Promise((resolve, reject) => {
        const sql = "select * from news where newsId = ?"
        getData(sql, newsId).then((res) => {
            resolve(res)
        }, (err) => {
            reject(err)
        })
    })
}

//添加news
module.exports.addNews = function (newsObj) {
    return new Promise((resolve, reject) => {
        const sql = "insert into news(title,newsUrl,content,pdate) values(?,?,?,now())"
        getData(sql, newsObj.title, newsObj.newsUrl, newsObj.content).then((res) => {
            console.log("===1=")
            resolve(true)
        }, (err) => {
            console.log("===2=")
            reject(err)
        })
    })
}


//修改news
module.exports.updNews = function (newsObj) {
    return new Promise((resolve, reject) => {
        const sql = "update news set title=?,newsUrl=?,content=?,pdate=now() where newsId=?"
        getData(sql, newsObj.title, newsObj.newsUrl, newsObj.content, newsObj.newsId).then((res) => {
            resolve(true)
        }, (err) => {
            reject(err)
        })
    })
}


// 删除news
module.exports.delNews = function (newsId) {
    return new Promise((resolve, reject) => {
        const sql = "delete from news where newsId=?"
        getData(sql, newsId).then((res) => {
            resolve(true)
        }, (err) => {
            reject(err)
        })
    })
}

