// 模块一：负责启动服务，服务模块   常用名称：index.js  app.js main.js
// 模块二：负责扩展request、response对象，方便使用，扩展模块   常用名称：context.js  ext.js
// 模块三：处理路由服务，路由模块   常用名称：router.js  controller
// 模块四：处理具体路由业务代码，业务模块     常用名称：handler.js   service.js   service
// 模块五：数据放入数据库中，数据操作模块     常用名称：model.js 表名称.js
// 模块六：配置信息，配置模块，端口号、数据库地址、账号密码等   常用名称：config.js  cfg.js


const http = require('http');
const context = require('./context.js')
const router = require('./router.js')
const config = require('./config.js')

http.createServer(function (req, res) {
    // 调用context把req、res传递过去
    context(req, res);

    // 路由判断,把req、res传递过去
    router(req, res);


}).listen(config.port, function () {
    console.log("server start success: http://localhost:" + config.port);
})


