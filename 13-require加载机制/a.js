// 加载b.js
const b = require('./b.js')

// 下面的会从缓存中读取
require('./b.js')
require('./b.js')
require('./b.js')

// 查找路径
//console.log(module.paths)
// [
// 'C:\\Users\\Administrator\\WebstormProjects\\nodejs-demo\\13-require加载机制\\node_modules',
//     'C:\\Users\\Administrator\\WebstormProjects\\nodejs-demo\\node_modules',
//     'C:\\Users\\Administrator\\WebstormProjects\\node_modules',
//     'C:\\Users\\Administrator\\node_modules',
//     'C:\\Users\\node_modules',
//     'C:\\node_modules'
// ]
