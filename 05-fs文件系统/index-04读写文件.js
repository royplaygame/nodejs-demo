const fs = require('fs')

// 打开文件 写入
/*fs.open('./hello.txt', 'r+', function (err, fd) {
    if (err) throw err;
    // 写入文件
    fs.write(fd, 'offset 决定 buffer 中要被写入的部位， length 是一个整数，指定要写入的字节数', function (err) {
        if (err) throw err;
        console.log("write success")
        //关闭文件
        fs.close(fd, function (err) {
            console.log("close success")
        })
    })
})*/

// 打开文件 读取
fs.open('./hello.txt', 'r+', function (err, fd) {
    if (err) throw err;
    const bf=Buffer.alloc(100)
    fs.read(fd, bf, 0, 100, 0, function (err, d, buffer) {
        if (err) throw err;
        console.log(d)
        console.log(buffer.toString())
        //关闭文件
        fs.close(fd, function (err) {
            console.log("close success")
        })
    })
})
