// news 模块的增删改查
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/node"


// 查询所有news总数量
module.exports.getTotal = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            const dbase = db.db('node');
            dbase.collection('news').find({}).toArray(function (err, result) {
                if (err) reject(err);
                db.close();
                resolve(result.length)
            });
        })
    })
}


// 分页查询news
module.exports.getPage = function (page) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            const dbase = db.db('node');
            dbase.collection('news').find().skip((page - 1) * 10).limit(10).toArray(function (err, result) {
                if (err) reject(err);
                db.close();
                resolve(result)

            });
        })
    })
}


//根据newsId查询news
module.exports.findById = function (newsId) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            const dbase = db.db('node');
            const findObj = {"newsId": parseInt(newsId)};
            dbase.collection('news').find(findObj).toArray(function (err, result) {
                if (err) reject(err);
                db.close();
                resolve(result)
            });
        })
    })
}

//添加news
module.exports.addNews = function (newsObj) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            const dbase = db.db('node');
            const {title, newsUrl, content} = newsObj;
            const findObj = {
                newsId: parseInt(Date.now().toString()),
                title: newsObj.title,
                newsUrl: newsObj.newsUrl,
                content: newsObj.content,
                pDate: new Date()
            };
            dbase.collection('news').insertOne(findObj, function (err, result) {
                if (err) reject(err);
                db.close();
                resolve(result)
            });
        })
    })
}


//修改news
module.exports.updNews = function (newsObj) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            const dbase = db.db('node');
            const findObj = {"newsId": parseInt(newsObj.newsId)};
            const Obj = {
                $set: {
                    newsId: parseInt(newsObj.newsId),
                    title: newsObj.title,
                    newsUrl: newsObj.newsUrl,
                    content: newsObj.content,
                    pDate: new Date()
                }
            };
            dbase.collection('news').updateOne(findObj, Obj, function (err, result) {
                if (err) reject(err);
                db.close();
                resolve(result)
            });
        })
    })
}


// 删除news
module.exports.delNews = function (newsId) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            const dbase = db.db('node');
            const findObj = {"newsId": parseInt(newsId)};
            dbase.collection('news').deleteOne(findObj, function (err, result) {
                if (err) reject(err);
                db.close();
                resolve(result)
            });
        })
    })
}

function getNextSequence(name, db) {
    var ret = db.counters.findAndModify(
        {
            query: {_id: name},
            update: {$inc: {seq: 1}},
            new: true
        }
    );
    return ret.seq;
}
