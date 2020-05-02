// mongodb 基本使用
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/node";

// 连接mongodb，创建数据库node
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close()
})*/


// 连接mongodb，创建集合
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw  err;
    var dbase = db.db("node");
    dbase.createCollection('goods', function (err, res) {
        if (err) throw  err;
        console.log("集合已创建!");
        db.close()
    })
})*/


// 连接mongodb,在news集合里插入一条数据
/*
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db('node');
    const newsObj={"title":"老友喊话特朗普：醒醒吧！美国人的命比你的选举更重要","newsUrl":"http://m.news.cctv.com/2020/04/27/ARTIXYqxAS0woQEZyZVgxXMM200427.shtml","content":"近日，特朗普老友皮尔斯·摩根喊话特朗普：“美国人的生命比你的选举更重要。如果你继续以自己为中心，继续玩弄愚蠢的政治……如果你意识不到自己的错误，你就做不对。”目前，特朗普已“取关”了这位老友。（视频来源：CGTN）"}
    dbase.collection("news").insertOne(newsObj, function (err, result) {
        if (err) throw err;
        console.log("news插入成功");
        db.close();
    })
})
*/

// 连接mongodb,在news集合里插入多条数据
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbase = db.db('node');
    const myobjs=[{"newsId":1001,"title":"老友喊话特朗普：醒醒吧！美国人的命比你的选举更重要","newsUrl":"http://m.news.cctv.com/2020/04/27/ARTIXYqxAS0woQEZyZVgxXMM200427.shtml","content":"近日，特朗普老友皮尔斯·摩根喊话特朗普：“美国人的生命比你的选举更重要。如果你继续以自己为中心","pDate":"2020-05-01T06:58:56.000Z"},{"newsId":1002,"title":"北京顺丰速运有限公司中关村大街经营分部丹棱街速运营业点：逆风前行","newsUrl":"http://news.ynet.com/zt/bjldzzs/","content":"面对严峻的新冠病毒肺炎疫情，北京顺丰速运有限公司中关村大街经营分部丹棱街速运营业点的79名快递员","pDate":"2020-04-29T06:59:46.000Z"},{"newsId":1003,"title":"VUe阅读本教程前，您需要了解的知识","newsUrl":"https://www.runoob.com/vue2/vue-tutorial.html","content":"Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件","pDate":"2020-05-01T07:41:06.000Z"},{"newsId":1004,"title":"Node.js 连接 MySQL","newsUrl":"https://www.runoob.com/nodejs/nodejs-mysql.html","content":"本章节我们将为大家介绍如何使用 Node.js 来连接 MySQL，并对数据库进行操作。","pDate":"2020-05-01T07:42:34.000Z"},{"newsId":1005,"title":"菜鸟工具","newsUrl":"https://c.runoob.com","content":"以下标记的书签只适用于本地浏览器","pDate":"2020-05-01T07:26:34.000Z"},{"newsId":1008,"title":"老友喊话特朗普：醒醒吧！美国人的命比你的选举更重要","newsUrl":"http://m.news.cctv.com/2020/04/27/ARTIXYqxAS0woQEZyZVgxXMM200427.shtml","content":"近日，特朗普老友皮尔斯·摩根喊话特朗普：“美国人的生命比你的选举更重要。如果你继续以自己为中心，继续玩弄愚蠢的政治……如果你意识不到自己的错误，你就做不对。”目前，特朗普已“取关”了这位老友。（视频来源：CGTN）","pDate":"2020-04-28T14:34:29.000Z"},{"newsId":1009,"title":"北京顺丰速运有限公司中关村大街经营分部丹棱街速运营业点：逆风前行 助力市民战“疫”","newsUrl":"http://news.ynet.com/zt/bjldzzs/","content":"面对严峻的新冠病毒肺炎疫情，北京顺丰速运有限公司中关村大街经营分部丹棱街速运营业点的79名快递员“逆风前行”、假日无休、风雨无阻地穿梭在丹棱街巷，将居民们日常所需的蔬菜瓜果、生活用品、防疫物资等送到千家万户，生动演绎着“小人物”的“大担当”","pDate":"2020-05-01T14:38:32.000Z"},{"newsId":1010,"title":"老友喊话特朗普：醒醒吧！美国人的命比你的选举更重要","newsUrl":"http://m.news.cctv.com/2020/04/27/ARTIXYqxAS0woQEZyZVgxXMM200427.shtml","content":"近日，特朗普老友皮尔斯·摩根喊话特朗普：“美国人的生命比你的选举更重要。如果你继续以自己为中心，继续玩弄愚蠢的政治……如果你意识不到自己的错误，你就做不对。”目前，特朗普已“取关”了这位老友。（视频来源：CGTN）","pDate":"2020-05-01T14:40:33.000Z"},{"newsId":1011,"title":"北京顺丰速运有限公司中关村大街经营分部丹棱街速运营业点：逆风前行 助力市民战“疫”","newsUrl":"http://news.ynet.com/zt/bjldzzs/","content":"面对严峻的新冠病毒肺炎疫情，北京顺丰速运有限公司中关村大街经营分部丹棱街速运营业点的79名快递员“逆风前行”、假日无休、风雨无阻地穿梭在丹棱街巷，将居民们日常所需的蔬菜瓜果、生活用品、防疫物资等送到千家万户，生动演绎着“小人物”的“大担当”","pDate":"2020-05-01T14:40:34.000Z"},{"newsId":1012,"title":"十三届全国人大三次会议将于2020年5月22日在京召开","newsUrl":"http://www.xinhuanet.com/politics/2020-04/29/c_1125921760.htm","content":"面对新冠肺炎疫情，北京汽车集团有限公司工会（以下简称北汽集团工会）结合职工队伍分布广、行业多样、办公类型不同、承担支援武汉任务重等实际情况，立足职工需求，抓实疫情防控，助力复工复产，积极践行“有困难，找工会”，为职工撑起疫情期间的“保护伞”","pDate":"2020-05-19T14:42:06.000Z"},{"newsId":1013,"title":"习近平主持召开中共中央政治局常务委员会会议","newsUrl":"https://xhpfmapi.zhongguowangshi.com/vh512/share/9068954?channel=weixin&from=singlemessage","content":"新华社北京4月29日电 中共中央政治局常务委员会4月29日召开会议，分析国内外新冠肺炎疫情防控形势，研究部署完善常态化疫情防控举措，研究确定支持湖北省经济社会发展一揽子政策。中共中央总书记习近平主持会议并发表重要讲话。","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1014,"title":"文化强民族强，从抗疫大考中感悟中华文化的力量","newsUrl":"http://m.news.cctv.com/2020/04/29/ARTIov3aPeJQqjSHRL0mnyVe200429.shtml","content":"文化，是一个国家、一个民族的灵魂。几千年的历史演进，中华民族创造了灿烂的优秀传统文化。\r\n\r\n在此次抗击新冠肺炎疫情的斗争中，武汉人民、湖北人民，以及全国人民展现出了令世人赞叹的中国力量、中国精神。这种中国力量、中国精神的背后，就是深厚的中华文化。\r\n\r\n中华优秀传统文化是中华民族的精神命脉。习近平总书记高度重视中华优秀传统文化的传承与发展，他曾多次在文章与讲话中精心用典。\r\n\r\n让我们重温经典，探寻战“疫”大考所展现的中华传统文化底色，感受中华民族发展中这份更基本、更深沉、更持久的力量。","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1015,"title":"美国猪肉加工厂超800人感染 BBC万字长文揭秘内部故事","newsUrl":"http://m.news.cctv.com/2020/04/28/ARTITbeTL2xvz02NLWliL41e200428.shtml","content":"近日，美国史密斯菲尔德、泰森等多家肉类加工厂因新冠病毒接连关闭，食品供应链面临断裂。同时养殖场“猪满为患”，大量错过出栏期的生猪或将面临安乐死的“命运”。截至4月23日，至少有13名肉类加工工人死于新冠病毒，超过6500名工人受到疫情影响。\r\n\r\n史密斯菲尔德食品公司在南达科他州苏福尔斯市的猪肉加工厂暴发该国最大规模聚集性感染，截至目前，已超过800人确诊感染，并造成2人死亡。\r\n\r\n最大感染集群为何出现在这里？新冠病毒如野火一般传播开来，到底发生了什么？","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1016,"title":"首先假定你已经安装了 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录","newsUrl":"https://www.expressjs.com.cn/starter/installing.html","content":"$ mkdir myapp\r\n$ cd myapp\r\n通过 npm init 命令为你的应用创建一个 package.json 文件。 欲了解 package.json 是如何起作用的，请参考 Specifics of npm’s package.json handling.\r\n\r\n$ npm init\r\n此命令将要求你输入几个参数，例如此应用的名称和版本。 你可以直接按“回车”键接受大部分默认设置即可，下面这个除外：","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1017,"title":"jq Paginator结合express实现分页效果","newsUrl":"https://www.php.cn/js-tutorial-385055.html","content":"分页展示内容也是我们在页面开发中经常会遇到的需求\r\n前端页面利用jqPaginator这个jquery插件来编写\r\n后端利用mysql存储数据","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1018,"title":"简洁、直观、强悍的前端开发框架，让web开发更迅速、简单","newsUrl":"https://www.bootcss.com/","content":"Bootstrap\r\n简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1019,"title":"高效的嵌入式 JavaScript 模板引擎。","newsUrl":"https://ejs.bootcss.com/#features","content":"“E” 代表什么？可以表示 “可嵌入（Embedded）”，也可以是“高效（Effective）”、“优雅（Elegant）”或者是“简单（Easy）”。EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。EJS 没有如何组织内容的教条；也没有再造一套迭代和控制流语法；有的只是普通的 JavaScript 代码而已。","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1020,"title":"基于 Vue.js 的移动端组件库","newsUrl":"https://mint-ui.github.io/#!/zh-cn","content":"Mint UI 包含丰富的 CSS 和 JS 组件，能够满足日常的移动端开发需要。通过它，可以快速构建出风格统一的页面，提升开发效率。\r\n真正意义上的按需加载组件。可以只加载声明过的组件及其样式文件，无需再纠结文件体积过大。","pDate":"2020-05-01T14:40:35.000Z"},{"newsId":1021,"title":"ElementUI","newsUrl":"https://element.eleme.cn/#/zh-CN/guide/design","content":"一致性 Consistency\r\n与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\r\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。\r\n反馈 Feedback\r\n控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；\r\n页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。","pDate":"2020-05-01T14:40:35.000Z"}];
    dbase.collection("news").insertMany(myobjs, function (err, result) {
        if (err) throw err;
        console.log("news插入多条记录成功");
        db.close();
    })
})*/

// 连接mongodb,查询数据news集合所有的数据
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    dbase.collection('news').find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close()
    })
})*/
// 连接mongodb,查询数据news集合newsId=1008的数据
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw  err;
    const dbase = db.db('node');
    const queryStr = {newsId: 1008}
    dbase.collection('news').find(queryStr).toArray(function (err, data) {
        if (err) throw err;
        console.log(data);
        db.close()
    })
})*/

// 连接mongodb,更新数据
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    const queryObj = {title: "百度"}
    const newsObj = {
        $set: {
            newsId: 1022,
            title: "Rust 语言 2019 调查报告",
            newsUrl: 'https://www.oschina.net/news/115136/rust-survey-2019',
            content: '从 2019 年下半年至今，不到一年的时间内，Rust 语言确实接二连三地掀起过一些波澜',
            pDate: new Date()
        }
    }
    dbase.collection('news').updateOne(queryObj, newsObj, function (err, result) {
        if (err) throw err
        console.log(result)
        db.close()
    })
})*/
// 如果要更新所有符合条的文档数据可以使用 updateMany()

//删除数据
/*
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    const delStr = {newsId: 1022}
    dbase.collection('news').deleteOne(delStr, function (err, result) {
        if (err) throw err;
        console.log(result)
        db.close()
    })
})
*/
// 如果要删除多条语句可以使用 deleteMany() 方法


// mongodb排序
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    let mysort = {type: 1};
    dbase.collection('news').find().sort(mysort).toArray(function (err, result) {
        if (err) throw err;
        console.log(result)
    })
})*/

// 查询分页
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    dbase.collection('news').find().limit(2).toArray(function (err, result) {
        if (err) throw err;
        console.log(result)
        db.close()
    })
})*/

// skip(2): 跳过前面两条数据，读取两条数据
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    dbase.collection('news').find().skip(2).limit(2).toArray(function (err, result) {
        if (err) throw err;
        console.log(result)
        db.close()
    })
})*/


// 删除集合
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    dbase.collection('goods').drop(function (err, result) {
        if (err) throw err;
        console.log(result)
    })
})*/


//mongoDB 不是一个关系型数据库，但我们可以使用 $lookup 来实现左连接。
// 下面是初始化操作
/*MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    const dbase = db.db('node');
    // 创建集合products
    dbase.createCollection('products', function (err, result) {
        if (err) throw err;
        console.log("products创建成功！")
        db.close()
    })
})

//  // 创建集合orders
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    const dbase = db.db('node');
    dbase.createCollection('orders', function (err, result) {
        if (err) throw err;
        console.log("orders创建成功！")
        db.close()
    })
})

//  在products里添加多条记录
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    const dbase = db.db('node');
    // 在products里添加多条记录
    const products = [
        {_id: 154, name: '笔记本电脑'},
        {_id: 155, name: '耳机'},
        {_id: 156, name: '台式电脑'}
    ]
    dbase.collection('products').insertMany(products, function (err, result) {
        if (err) throw err;
        console.log("products中插入多条记录成功！")
        db.close()
    });
})

// 在order表中插入多条记录
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    const dbase = db.db('node');
    const orders = [
        {_id: 1, product_id: 154, status: 1},
        {_id: 2, product_id: 156, status: 1},
    ]
    dbase.collection('orders').insertMany(orders, function (err, result) {
        if (err) throw err;
        console.log("orders中插入多条记录成功！")
        db.close()
    })
})*/

// 使用 $lookup 来实现左连接
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    const dbase = db.db('node');
    dbase.collection('orders').aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'orderdetails'
            }
        }
    ]).toArray(function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result))
        db.close()
    })
})
