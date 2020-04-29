// 全局模块，不需通过require来加载
// global（全局变量）
//  __dirname
//  __filename
//  clearInterval(intervalObject)
//  clearTimeout(timeoutObject)
//  console
//  exports
//  global
//  module
//  process
//  require()
//  setInterval(callback, delay[, ...args])
//  setTimeout(callback, delay[, ...args])
//  TextDecoder
//  TextEncoder
//  URL
//  URLSearchParams

const fs = require('fs');
const path = require('path')

// 异步写入文件
function writeMyFile() {
    fs.writeFile('hello.txt', "hello word!中国你好", 'utf8', function (err) {
        if (err) {
            console.error("写入文件失败！" + err)
        } else {
            console.error("写入文件成功！")
        }
    })
}
//writeMyFile()


// 异步读取文件
function readMyFile() {
    fs.readFile('hello.txt', 'utf8', function (err, data) {
        if (err) {
            console.error("读取文件失败！" + err)
        } else {
            // Buffer 对象转换成字符串
            console.log(data.toString())
        }
    })
}
//readMyFile()


// 创建目录
function createFolder() {
    fs.mkdir(path.join(__dirname, 'test/good/look/hello'), {recursive: true}, function (err) {
        if (err) {
            console.error("创建文件夹失败！" + err)
        } else {

            console.log("创建文件夹成功！")
        }
    })
}
//createFolder()


// 作业创建目录结构
// 01-node安装
// 02-fs文件系统
// 03-path路径


// 文件属性
function fileStat() {
    fs.stat('hello.txt', function (err, stats) {
        if (err) {
            return console.error(err)
        }
        console.log(stats.isDirectory())
    })
}

//fileStat()

// 删除文件
function delFile() {
    fs.unlink('hello.txt', function (err) {
        if (err) {
            return console.error("删除文件失败")
        }
        console.log("删除文件成功!")
    })
}

//delFile()


// 创建文件或者目录
function createDir() {
    fs.mkdir("test/good/book", {recursive: true}, function (err) {
        if (err) {
            return console.log("创建文件夹失败" + err)
        }
        console.log("创建文件夹成功")
    })
}

//createDir()

// 异步方式读取文件夹
function readFileDir(dir) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            return console.log("读取文件夹失败" + err)
        }
        console.log("读取文件夹" + dir + "成功:");
        files.forEach(file => {
            const pathDir = path.join(dir, file)
            fs.stat(pathDir, function (err, stats) {
                if (err) {
                    return console.log(err)
                } else {
                    if (stats.isDirectory()) {
                        readFileDir(pathDir);
                    } else {
                        console.log(file)
                    }
                }
            })
        })
    })
}

readFileDir('./')

// 刪除目录
function delDir() {
    fs.rmdir('test/good/book', function (err) {
        if (err) {
            return console.log("刪除失敗" + err)
        }
        console.log("刪除成功")
    })
}

//delDir()


// 同步方式遍历目录
function readDirSync(dir) {
    const parentDir = dir;
    const files = fs.readdirSync(dir);
    files.forEach(filename => {
        const filedir = path.join(dir, filename);
        const stats = fs.statSync(filedir);
        if (stats.isDirectory()) {
            readDirSync(filedir)
        } else {
            console.log(filename)
        }
    })
}

//readDirSync('./')
