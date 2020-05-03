var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('E:\\v3.3.7.zip');





readerStream.on('error', function(err){
    console.log(err.stack);
});

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('./kk.zip');

writerStream.on('open', function() {
    console.log("writerStream open")
});


writerStream.on('close',function(){
    console.log("writerStream close")
});

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
    //console.log(data.length)
    writerStream.write(data)
});

readerStream.on('end',function(){
    console.log(data.length);
    writerStream.close()
});
