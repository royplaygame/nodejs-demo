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
