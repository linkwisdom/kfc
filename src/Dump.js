var etpl = require('etpl')

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
        for (let key in attributes) {
            var text = etpl.compile(attributes[key])(node.data)
            arr.push(`${key}="${text}"`)
        }
        if (this.printData) {
            for (let key in data) {
                var text = etpl.compile(data[key])(node.data)
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
            var text = etpl.compile(node.content)(node.data)
            text = text.replace(/\n/g,  '\n' + node.indent)
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
        arr.push(this.startTag(node))
        var c = this.content(node)
        c && arr.push(c)
        c = this.endTag(node)
        c && arr.push(c)
        return arr.join('\n')
    }
}