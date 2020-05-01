// 读取data.json写入到mysql中
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const moment = require('moment')

const conn = mysql.createConnection({
    host: '192.168.56.102',
    post: '3306',
    user: 'root',
    password: 'luoyang',
    database: 'node'
})

// 连接数据库
conn.connect();

readJsonFile(function (list) {
    const arr = listToArray(list);
    console.log(arr[1])
    // 批量插入数据, Value不是values(?,?,?,?),而是values ?
    conn.query("insert into news(title,newsUrl,content,pDate) values ? ", [arr], function (err, result) {
        if (err) throw err;
        console.log(result)
    })

})


// 读取json文件
function readJsonFile(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
        if (err) {
            throw  err
        } else {
            const newsList = JSON.parse(data || '[]');
            callback(newsList);
        }
    })
}

// 对象list转二维数组
function listToArray(list) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        var dataArr = []
        dataArr.push(list[i].title)
        dataArr.push(list[i].newsUrl)
        dataArr.push(list[i].content)
        dataArr.push(new Date(moment(list[i].pDate).format("YYYY-MM-DD HH:mm:SS")))
        arr.push(dataArr)
    }
    return arr;
}

