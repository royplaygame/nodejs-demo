const fs = require('fs');
const path = require('path')
// ./ 相对路径，是相对执行node命令的路径， 如何相对与当前正在执行的js文件的路径
// 绝对路径来解决，用__dirname,表示当前正在执行的js文件的目录
// __dirfilename,表示当前正在执行的js文件的绝对路径
function readMyFile() {
    fs.readFile(path.join(__dirname, './hello.txt'), 'utf8', function (err, data) {
        if (err) {
            console.error("读取文件失败！" + err)
        } else {
            // Buffer 对象转换成字符串
            console.log(data.toString())
        }
    })
}

readMyFile()
