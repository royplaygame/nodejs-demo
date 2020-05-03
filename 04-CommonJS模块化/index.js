// 引入其他模块
// 核心模块的标识，就是模块的名称，文件模块的标识是文件的路径，路径一般用
// ../ 或 ./相对路径来写
const user = require('./users.js')
const math = require('./math.js')

console.log(user)

console.log(math.add(20,50))
console.log(math.mul(20,50))
