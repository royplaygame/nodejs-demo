const  arr=[12,3,4,5,6,67,7,4,78]
var buffer =Buffer.from(arr)
console.log(buffer)
const bf=Buffer.from("this is buffer 中国");
console.log(bf)
console.log(bf.toString())

// Buffer.from(string|[])
// Buffer.concat([])
// Buffer.alloc(length)
// Buffer.toString(charset)
// Buffer.byteLength(string,'utf8')
// Buffer.compare(buf1, buf2)
// Buffer.isBuffer(obj)
// Buffer可以处理二进制数据，比如图片、音频、视频
// Buffer中的数据，保存二进制数据，但在显示都是以16进制时显示的
// Buffer中每一个范围都是从00---ff
