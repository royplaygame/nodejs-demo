// Mysql 数据库操作
const mysql = require('mysql')

// 创建链接
const conn = mysql.createConnection({
    host: '192.168.56.102',
    database: 'node',
    user: 'root',
    password: 'luoyang',
    port: '3306'
})

// 连接数据库
conn.connect();

// 查询数据
/*conn.query('select * from news', function (error, results, fields) {
    if (error) throw error
    console.log(results)
})*/


// 添加数据
/*var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '以下标记的书签只适用于本地浏览器', new Date()];
conn.query('insert into news(title,newsUrl,content,pDate) values(?,?,?,?)', addSqlParams, function (err, result) {
    if (err) throw err;
    console.log(result)
})*/

// 修改数据
/*var addSqlParams = ['Node.js 连接 MySQL', 'https://www.runoob.com/nodejs/nodejs-mysql.html', '本章节我们将为大家介绍如何使用 Node.js 来连接 MySQL，并对数据库进行操作。', new Date(), 1004];
conn.query('update news set title=? , newsUrl=? , content=? , pDate=? where newsId=?', addSqlParams,function (err, result) {
    if (err) throw err;
    console.log(result)
})*/


// 删除数据
/*conn.query('delete from news where newsId=1006', function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows)
})*/
