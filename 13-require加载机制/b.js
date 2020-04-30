function add(x, y) {
    return x + y
}


const result = add(100, 200);

console.log(result)


// 加载模块加载本模块时候，可以获取这个值
// 可以是数组、字符串、对象、函数,默认是一个对象
// module.exports
/*
module.exports.name = "hello"
module.exports.age = 20
module.exports.show = function () {
    console.log(this.name, this.age)
}

*/


// 1. exports
/*module.exports.name = "hello"
exports.age=33
exports.show = function () {
    console.log(this.name, this.age)
}*/



// 2. exports 和module.exports默认指向同一个对象
module.exports.name = "roy"
exports.age=33
exports.show = function () {
    console.log(this.name, this.age)
}

module.exports = "hello word"

