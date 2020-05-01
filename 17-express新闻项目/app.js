// 入口文件
// 负责启动服务

// 1.加载express模块
const express = require('express')

// 加载config模块
const config = require('./config.js')

// 加载router模块
const router = require('./router.js')

// 加载post获取数据模块
var bodyParser = require('body-parser');

// 2. 创建app对象
const app = express();

// 用于req.body获取值的
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

// 3. 注册路由,设置app与router关联
//app.use('/', router)   //和下面方式等价
app.use('/public',express.static('public'));
app.use(router)

// 以下两种方法等价
/*app.use("/", function (req, res) {

})

app.use(function (req, res) {

})*/

// 4. 启动服务
app.listen(config.port, function () {
    console.log("Server StartUp at: http://localhost:" + config.port)
})

