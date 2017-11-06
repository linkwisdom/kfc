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
    this.attributes = attr
    this.slots = {}
    this.file = parent.file || ''
    this.data = Object.assign({}, parent.data, data)
    this.indent = parent.indent + this.gap
    this.children = []

    // 如果是根元素，不需要缩进
    if (tag === 'root') {
        this.isRoot = true
        this.indent = ''
    }
    if (parent.isRoot) {
        this.indent = ''
    }
}

Context.prototype = {
    gap: '    ',
    indent: '',
    tag: 'div',
    file: './',
    slots: {},
    attributes: {class: 'ad-box-wrapper'},
    data: {},
    children: []
}

module.exports = Context