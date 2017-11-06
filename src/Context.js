function Context (parent, attribs = {}, tag = 'root') {
    var data = {}
    var attr = {}
    for (var key in attribs) {
        var kay = key.substr(1)
        var value = attribs[key]
        if (key === 'slot') {
            // 如果当前标签是插槽内容，先标记，并且传递给父容器
            this.slotName = value
            parent.slots[value] = this
        }
        if (key.charAt(0) === ':') {
            data[kay] = value[0] === '$' ? parent.data[kay] || value : value
        }
        else {
            attr[key] = value
        }
    }
    this.tag = tag || 'div'
    this.node = 'element'
    this.attr = attr
    this.slots = {}
    this.file = parent.file || ''
    this.data = Object.assign({}, parent.data, data)
    this.indent = parent.indent + this.gap
    this.child = []

    // 如果是根元素，不需要缩进
    if (tag === 'root') {
        this.node = 'root'
        this.indent = ''
    }
    if (parent.node === 'root') {
        this.indent = ''
    }
}

Context.prototype = {
    node: 'element', // 节点类型 root / element /text
    gap: '    ',
    indent: '',
    text: '', // 文本内容
    tag: 'div',
    file: './', // 跟节点文件来源
    slots: {}, // 插槽元素
    attr: {class: 'ad-box-wrapper'},
    data: {},
    child: []
}

module.exports = Context
