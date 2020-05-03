const  fs = require('fs')

// 文件是否存在
/*let isExists = fs.existsSync('./hello.txt');
console.log(isExists);

let isExists2 = fs.existsSync('./hello.mp3');
console.log(isExists2);*/

fs.readdir('./',function (err,files) {
    if(err) throw err;
    files.forEach((file)=>{
        fs.stat(file,function (err,stats) {
            if(err) throw err;
            if(stats.isDirectory()){
                // 递归调用
            }else{
                console.log(file)
            }
        })
    })
})


// fs.rename(oldPath, newPath, callback)
// fs.watchFile(filename[, options], listener)
// fs.appendFile(path, data[, options], callback)
