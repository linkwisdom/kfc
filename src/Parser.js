var htmlparser = require('htmlparser2')
var fs = require('fs')
var Context = require('./Context')

var proto = {}

proto.parse = function (content, file) {
    var root = Object.assign({}, Context.prototype, {file})
    var stack = [new Context(root)]
    var current = {}
    var parser = new htmlparser.Parser({
        onopentag (name, attribs) {
            var parent = stack[stack.length - 1]
            current = new Context(parent, attribs, name)
            stack.push(current)
            parent.child.push(current)
        },
        ontext (text) {
            text = text.trim()
            if (text && current.child) {
                current.child.push({
                    tag: 'TextNode',
                    node: 'text',
                    indent: current.indent + current.gap,
                    data: current.data,
                    content: text
                })
            }
        },
        onclosetag (name) {
            current = stack.pop()
        }
    }, {decodeEntities: true})
    parser.write(content)
    parser.end()
    return stack[0]
}

proto.import = function (file) {
    var content = fs.readFileSync(file, 'utf8')
    return this.parse(content, file)
}

function Parser (option) {}

Object.assign(Parser.prototype, proto)

module.exports = Parser
