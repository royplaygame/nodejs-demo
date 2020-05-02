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


module.exports.getData = getData

// 查询所有news
/*let sql = "select * from news"
getData(sql).then((res) => {
    console.log(res.length)
}, (err) => {
    console.log(err)
})*/


// 分页查询news
/*
const sql = "select * from news order by newsId limit ?,?"
getData(sql, 5,5).then((res) => {
    console.log(res.length)
}, (err) => {
    console.log(err)
})*/

//根据newsId查询news
/*
cosnt sql = "select * from news where newsId = ?"
getData(sql, 1005).then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})*/


//添加news
/*
const sql = "insert into news(title,newsUrl,content,pdate) values(?,?,?,now())"
getData(sql, 'mytitle', 'http://www.baidu.com', 'baidu.com').then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})*/


//修改news
/*
const sql = "update news set title=?,newsUrl=?,content=?,pdate=now() where newsId=?"
getData(sql, '测试', 'http://www.test.com', '测试之家', 1022).then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})*/



// 删除news
const sql = "delete from news where newsId=?"
getData(sql, 1022).then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})
