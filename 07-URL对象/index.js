var url = require('url');

const myUrl=url.parse("https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash");

console.log(myUrl.protocol)
console.log(myUrl.auth)
console.log(myUrl.host)
console.log(myUrl.hostname)
console.log(myUrl.port)
console.log(myUrl.path)
console.log(myUrl.pathname)
console.log(myUrl.search)
console.log(myUrl.query)
console.log(myUrl.hash)
console.log(myUrl.href)
console.log(myUrl.toString())
console.log(url.format(myUrl, { fragment: false, unicode: true, auth: false }));


