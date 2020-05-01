// 读取mysql写入到data.json中
const mysql = require('mysql');
const fs = require('fs')
const path = require('path')


// 配置connection
const conn = mysql.createConnection({
    host: '192.168.56.102',
    port: '3306',
    user: 'root',
    password: 'luoyang',
    database: 'node'
})

//连接数据库
conn.connect()

// 查询数据库,并写入数据到文件
conn.query('select * from news', function (err, data) {
    if (err) throw  err;
    // 数据写入到文件
    writeJsonFile(JSON.stringify(data), function () {
        console.log('写入数据成功！')
    })
})


// 写data.json文件
function writeJsonFile(data, callback) {
    fs.writeFile(path.join(__dirname, 'data', "my.json"), data, function (err) {
        if (err) throw  err;
        callback()
    })
}
