let str = 'this good b'

console.log(str.includes('s'))
console.log(str.startsWith('t'))
console.log(str.endsWith('b'))
console.log(str.repeat(5))


//伪数组变成真数组
//1. [].slice.call(list)
//2. Array.form(obj),        // ES6的新语法
// 3. var newArr= [...obj]    //使用扩展运算符,也是ES6的语法

// Array.of 将一些列的值转化成数组
// find 返回第一个满足条件返回true的元素
// findIndex返回第一个满足条件返回true的元素的下标

let nums = [2, 3, 4, 5, 56, 6, 9]

let index = nums.findIndex(item => item === 56)
console.log(index)


let users = [
    {userid: 1001, name: "zhangsan", age: 10},
    {userid: 1002, name: "lisi", age: 11},
    {userid: 1003, name: "wangwu", age: 12},
    {userid: 1004, name: "zhaoliu", age: 13},
]


const u = users.find(user => user.userid == 1003);
const uIndex = users.findIndex(user => user.userid == 1003);
console.log(u)
console.log(uIndex)



