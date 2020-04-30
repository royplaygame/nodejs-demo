// 模块六：配置信息，配置模块，端口号、数据库地址、账号密码等
const path = require('path');
module.exports = {
    "port": 8081,
    "dataPath": path.join(__dirname, 'data', 'data.json'),
    "viewPath": path.join(__dirname, 'views')
}
