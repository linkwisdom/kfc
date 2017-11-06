var path = require('path')
var Parser = require('./Parser')
var Dump = require('./Dump')
var plugin = require('./plugin')
var fs = require('fs')
var minify = require('html-minifier').minify

Dump.import = function (file, srcPath) {
    if (srcPath) {
        file = path.resolve(path.dirname(srcPath), file)
    }
    return Parser.prototype.import(file)
}

Dump.readFile = function (file, srcPath) {
    if (srcPath) {
        file = path.resolve(path.dirname(srcPath), file)
    }
    return fs.readFileSync(file, 'utf8')
}

exports.options = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true
}

exports.readJson = function (file) {
    var content = fs.readFileSync(file, 'utf8')
    return JSON.parse(content)
}

exports.minify = function (content) {
    return minify(content, this.options)
}

exports.tidy = function (content) {
    var parser = new Parser()
    var useCache = plugin.useCache
    plugin.useCache = false
    var data = parser.parse(content, '')
    content = Dump.print(data)
    plugin.useCache = useCache
    return content
}

exports.parse = function (entryFile) {
    var parser = new Parser()
    return parser.import(entryFile)
}

exports.dump = function (data) {
    console.log(JSON.stringify(data, ' ', 4))
}

exports.stringify = function (data) {
    var content = Dump.print(data)
    if (plugin.useCache) {
        content += plugin.dumpContent()
    }
    return content
}
