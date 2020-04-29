//获取歌曲
// http://musicapi.leanapp.cn/search/multimatch?keywords=霍尊
// http://musicapi.leanapp.cn/search/suggest?keywords=霍尊

function getMusics(url) {
    let promise = new Promise((resolve, reject) => {
        // 执行异步任务，获取歌曲
        let xmlHttp = new XMLHttpRequest();
        // 监听readState
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status == 200) {
                    resolve(xmlHttp.response)
                } else {
                    reject("失败")
                }
            }
        }
        // 设置、发送请求
        xmlHttp.open('GET', url)
        xmlHttp.send()
    });
    return promise;
}

// 获取歌曲
const url = 'http://musicapi.leanapp.cn/search/suggest?keywords=霍尊';
getMusics(url).then(
    (data) => {
        // 获取歌曲专辑
        console.log(JSON.parse(data).result.songs)
        let songs = JSON.parse(data).result.songs;
        let musicId = songs[0].id
        // 获取歌曲
        const musicUrl = `http://musicapi.leanapp.cn/music/url?id=${musicId}`;
        // 返回新的promise
        return getMusics(musicUrl)
    }, (err) => {
        console.log(err)
    })
    .then((data) => {
        console.log(JSON.parse(data).data)
        const musicUrl = JSON.parse(data).data[0].url;
        console.log(musicUrl);
        document.getElementById("myAudio").src = musicUrl
    }, (err) => {
        console.log(err)
    })


// 获取歌曲
// `http://musicapi.leanapp.cn/music/url?id=${musicId}`;


// 获取评论api
// http://musicapi.leanapp.cn/comment/music?id=${musicId}&limit=10


// 歌曲封面
// `http://musicapi.leanapp.cn/song/detail?ids=${musicId}`;
