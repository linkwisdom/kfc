var kfc = require('../src')

function testComposide () {
    // 模板转为json对象
    var data = kfc.parse(__dirname + '/composide/main.tpl')

    // 将数据输出-用于持续化存储
    // console.log(kfc.dump(data))

    // 模板转为html字符串
    var html = kfc.stringify(data)

    html = kfc.tidy(html)

    console.log(html)
}

function testToHtml () {
    var data = kfc.readJson(__dirname + '/composide/data.json')
    // 模板转为html字符串
    var html = kfc.stringify(data)

    html = kfc.tidy(html)
    console.log(html)
}

testComposide()
