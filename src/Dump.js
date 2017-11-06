var tpl = require('./tpl')
var plugin = require('./plugin')

const SIGNLE_TAGS = ['input', 'img', 'hr', 'link']

const components = {

}

module.exports = {
    mixContext (comp, shell) {
        Object.assign(comp.data, shell.data)
        comp.slots = shell.slots
        comp.indent = shell.indent + comp.indent
        if (!comp.children) {
            return comp
        }
        comp.children.forEach(item => {
            this.mixContext(item, shell)
        })
        return comp
    },
    attributes (node) {
        var arr = ['']
        var {attributes, data} = node
        for (const key in attributes) {
            const text = tpl.render(attributes[key], node)
            arr.push(`${key}="${text}"`)
        }
        if (this.printData) {
            for (const key in data) {
                const text = tpl.render(data[key], node)
                arr.push(`:${key}="${text}"`)
            }
        }
        return arr.join(' ')
    },
    startTag (node) {
        const tagName = node.tag
        if (components[tagName]) {
            // 如果是已注册组件，进行组件替换解析
            let comp = components[tagName]
            comp = this.mixContext(comp, node)
            node._finished = true
            return this.print(comp)
        }
        // console.log(tagName, node.content)
        if (plugin.hasOwnProperty(tagName) && node.children.length) {
            node.content = node.children[0].content || ''
            node.content = plugin[tagName](node)
            if (node._finished) {
                return ''
            }
        }
        const attr = this.attributes(node)
        return `${node.indent}<${node.tag}${attr}>`
    },
    endTag (node) {
        if (SIGNLE_TAGS.indexOf(node.tag) > -1 || node._finished) {
            return
        }
        return `${node.indent}</${node.tag}>`
    },
    content (node) {
        if (node._finished) {
            return ''
        }
        if (node.content) {
            return node.indent + node.content.replace(/\n/g, '\n' + node.indent)
        }
        if (node.children.length < 1) {
            return
        }
        const items = node.children
        const arr = items.map(item => {
            // 插槽内容先跳过
            if (item.slotName) {
                return ''
            }
            return this.print(item)
        })
        return arr.join('\n')
    },
    print (node) {
        if (node.tag === 'TextNode') {
            var text = tpl.render(node.content, node)
            text = text.replace(/\n/g, '\n' + node.indent)
            return node.indent + text
        }
        // <link import="./title.tpl" name="title"></link>
        if (node.tag === 'link' && node.attributes.import) {
            var comp = this.import(node.attributes.import, node.file)
            components[node.attributes.name || comp.tag] = comp
            return
        }
        if (node.tag === 'slot') {
            // 支持插槽
            const slotName = node.attributes['name'] || 'content'
            // node.slots是通过源组件传递过来的
            return node.slots[slotName] || ''
        }
        const arr = []
        if (!node.isRoot) {
            var c = this.startTag(node)
            c.trim() && arr.push(c)
        }
        if (!node._finished) {
            c = this.content(node)
            c && arr.push(c)
        }
        if (!node.isRoot) {
            c = this.endTag(node)
            c && arr.push(c)
        }
        return arr.join('\n')
    }
}
