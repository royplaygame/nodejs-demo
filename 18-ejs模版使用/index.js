// ejs 使用
let ejs = require('ejs');
let path = require('path');

citis = ['洛阳', '信阳', '濮阳', '南阳', '汝阳', '郑州']
/*
citis = ['洛阳', '信阳', '濮阳', '南阳', '汝阳', '郑州']
html = ejs.render('<%= city.join(", "); %>', {city: citis});

console.log(html)*/


ejs.renderFile(path.join(__dirname, 'index.html'), {cities:citis}, function (err, result) {
    console.log(result)
})
