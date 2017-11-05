var path = require('path')
var Parser = require('./Parser')
var Dump = require('./Dump')


Dump.import = function (file, srcPath) {
    if (srcPath) {
        file = path.resolve(path.dirname(srcPath), file)
    }
    return Parser.prototype.import(file)
}

exports.parse = function (entryFile) {
    var parser = new Parser()
    return parser.import(entryFile)
}

exports.stringify = function (data) {
    return Dump.print(data)
}