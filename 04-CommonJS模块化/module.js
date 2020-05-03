//node中有一个全剧对象global，保存全局变量和方法

// 证明a是局部变量
/*
var a = 1000
console.log(global.a)
*/


// 证明a是全局变量
/*
 a = 1000
console.log(global.a)*/


// arguments.callee保存当前执行的函数对象
/*console.log(arguments.callee.length)
console.log(arguments.callee+"")*/

// node 自动把我们写的代码自动封装到一个函数里面
// 输出如下结果：
//node中有一个全剧对象global，保存全局变量和方法
/*
function (exports, require, module, __filename, __dirname) {
// 证明a是局部变量
    /!*
    var a = 1000
    console.log(global.a)
    *!/
// 证明a是全局变量
    /!*
     a = 1000
    console.log(global.a)*!/
// arguments.callee保存当前执行的函数对象
    console.log(arguments.callee+"")
}*/

// module.exports 和exports
// exports 只能通过.的方式向外暴露数据， exports.name="zhangsan"
// module.exports 可以通过.的方式，也可以直接赋值向外暴露数据
// module.exports.name='zhangsan'    module.exports={name:'zhangsan'}



// npm -v  npm -version  查看版本
// npm search 包名  搜索包
// npm install/i  包名  安装包
// npm remove/r   包名  卸载包
// npm install/i  包名  --save  安装包并添加到依赖中
// npm install/i  安装当前目录下的包
// npm install/i 包名 -g 全局安装，一般都是工具包

