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
        if (!comp.child) {
            return comp
        }
        comp.child.forEach(item => {
            this.mixContext(item, shell)
        })
        return comp
    },
    attr (node) {
        var arr = ['']
        var {attr, data} = node
        for (const key in attr) {
            const text = tpl.render(attr[key], node)
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
        if (plugin.hasOwnProperty(tagName)) {
            if (node.child.length) {
                node.content = node.child[0].content || ''
            }
            node.content = plugin[tagName](node)
            if (node._finished) {
                return ''
            }
        }
        const attr = this.attr(node)
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
        if (!node.child || node.child.length < 1) {
            console.dir(node)
            return
        }
        const items = node.child
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
        if (node.node === 'text') {
            var text = tpl.render(node.content, node)
            text = text.replace(/\n/g, '\n' + node.indent)
            return node.indent + text
        }
        // <link import="./title.tpl" name="title"></link>
        if (node.tag === 'link' && node.attr.import) {
            var comp = this.import(node.attr.import, node.file)
            components[node.attr.name || comp.tag] = comp
            return
        }
        if ((node.tag === 'script' || node.tag === 'style') && node.attr.src) {
            node.content = this.readFile(node.attr.src, node.file)
            node.attr.src = ''
        }
        if (node.tag === 'slot') {
            // 支持插槽
            const slotName = node.attr['name'] || 'content'
            // node.slots是通过源组件传递过来的
            return node.slots[slotName] || ''
        }
        const arr = []
        if (node.node === 'element') {
            var c = this.startTag(node)
            c.trim() && arr.push(c)
        }
        if (!node._finished) {
            c = this.content(node)
            c && arr.push(c)
        }
        if (node.node === 'element') {
            c = this.endTag(node)
            c && arr.push(c)
        }
        return arr.join('\n')
    }
}
