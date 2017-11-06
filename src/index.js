var path = require('path')
var Parser = require('./Parser')
var Dump = require('./Dump')
var plugin = require('./plugin')

Dump.import = function (file, srcPath) {
    if (srcPath) {
        file = path.resolve(path.dirname(srcPath), file)
    }
    return Parser.prototype.import(file)
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

exports.stringify = function (data) {
    var content = Dump.print(data)
    if (plugin.useCache) {
        content += plugin.dumpContent()
    }
    return content
}
