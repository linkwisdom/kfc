/**
 * render
 * @param  {String} str  template string content
 * @param  {Object} data data Object
 * @return {String} result
 *
 * @example
 * tpl.render('xxx $data.name', {data: {name: 'jack'}})
 * tpl.render('xxx $context.list[0].name', data)
 */

var VALIABLE_REGS = /\$([a-z\_]+)\.([a-z\_\[\]\d\-\.]+)/ig
/*eslint-disable*/
exports.render = function (str, data) {
    return str.replace(
        VALIABLE_REGS,
        function (feed, mod, expr, start, source) {
            var val = feed
            if (data.hasOwnProperty(mod)) {
                with (data[mod]) {
                    return eval(expr)
                }
            }
            return feed
        }
    )
}
/*eslint-enable*/
