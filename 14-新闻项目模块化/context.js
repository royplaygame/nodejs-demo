// 模块二：负责扩展request、response对象，方便使用，扩展模块


// 1. 为request增加query属性，该属性中保存用户get请求提交的数据
// 2. 为request增加pathname属性，该属性可以直接使用 request.pathname
// 3. 把request的request.method方法名称变小写
// 4. 为response增加render方法，该方法实现模板替换

const url = require('url');
const _ = require("underscore");
const mime = require('mime');
const fs = require('fs');

// 对外暴露一个函数，将index中的req、res,传递过来
module.exports = function (req, res) {

    const urlObj = url.parse(req.url.toLowerCase(), true);

    //1. 为request增加query属性
    req.query = urlObj.query;

    //2. 为request增加pathname属性
    req.pathname = urlObj.pathname

    //3. 把request的request.method方法名称变小写
    req.method = req.method.toLowerCase();

    // 4. 为response增加render方法
    res.render = function (filename, tplData) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.setHeader("Content-Type", "text/html;charset=utf-8")
                res.end("读取文件失败! 404")
            } else {
                if (tplData) { //要模板替换
                    var fn = _.template(data.toString('utf8'));
                    data = fn(tplData);
                }
                res.setHeader("Content-Type", mime.getType(filename))
                res.end(data)
            }
        })
    }
}


// 封装思路：
// 1. 封装什么代码
// 2. 代码用到外部数据了吗？用到，是否需要通过参数传递进来
// 3. 当前模块对外需要暴露什么信息 （module.exports的值是什么类型）
