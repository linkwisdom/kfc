var babel = require('babel-core')
var less = require('less')

exports.useCache = true
exports.switch = {
    script: true,
    style: true
}

exports.merged = {
    script: [],
    style: []
}

exports.script = function (node) {
    if (!this.switch.script) {
        return node.content
    }
    var content = node.content
    if (node.attr.lang === 'babel') {
        content = babel.transform(
            node.content, {'presets': ['es2015']}
        ).code
    }
    if (this.useCache) {
        node._finished = true
        this.merged.script.push(content)
    }
    return content
}

exports.style = function (node) {
    if (!this.switch.style) {
        return node.content
    }
    var result = node.content
    if (node.attr.lang === 'less') {
        less.render(node.content, function (e, output) {
            result = output.css
        })
    }
    if (this.useCache) {
        node._finished = true
        this.merged.style.push(result)
    }
    return result
}

exports.dumpContent = function () {
    var arr = ['']
    if (this.useCache) {
        for (var tp in this.merged) {
            arr.push(`<${tp}>`)
            arr.push(this.merged[tp].join('\n'))
            arr.push(`</${tp}>`)
        }
    }
    return arr.join('\n')
}
