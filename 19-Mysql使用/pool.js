// Mysql 数据库操作
const mysql = require('mysql')

// 创建链接
const pool = mysql.createPool({
    host: '192.168.56.102',
    database: 'node',
    user: 'root',
    password: 'luoyang',
    port: '3306'
})

pool.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query('select * from news order by newsid', function f(err, data) {
        console.log(data)
    })
})
