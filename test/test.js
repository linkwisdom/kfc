var kfc = require('../src')

// 模板转为json对象
var data = kfc.parse(__dirname + '/composide/main.tpl')

// 模板转为html字符串
console.log(kfc.stringify(data))