# 模板组件化构件工具
> kfc : kits for components

## 使用方法

### 构建单个文件

```sh
    # npm i kfc -g
    kfc test_file.tpl > result.tpl
```

### 自定义构建方法

```js
var kfc = require('kfc')

var data = kfc.parse('./test.tpl')

console.dir(data)

var content = kfc.stringify(data)

console.log(content)
```
### Feature

- 支持模板的组件化定义
- 支持模板变量定义
- 支持嵌套js/css
- 支持转化es6/ts/less
- 支持模板变量、属性定义


### 🌰 Example 🌰

> 参考[composide](//unpkg.com/kfc/test/composide/)
> 输出结果 [composide/result][//unpkg.com/kfc/test/composide/result.html]

```html
<template>
    <link import="./widget/title.tpl" name="adx-title">
    <link import="./widget/content.tpl" name="adx-content">
    <link import="./widget/footer.tpl" name="adx-footer">
    <div class="adx-box">
        <adx-title
            :title="AD_FANGHUA_TITLE"
            :url="AD_FANGHUA_TITLE_URL">
        </adx-title>
        <adx-content
            :content="AD_FANGHUA_DESC">
        </adx-content>
        <adx-footer
            :phone="AD_FANGHUA_PHONE"
            :showurl="AD_FANGHUA_SHOWURL"
            :url="AD_FANGHUA_TITLE_URL"> 
        </adx-footer>
    </div>
</template>

<script type="text/javascript">
export default {
    data () {
        return {
            title: 'ad-title',
            url: 'ad-url'
        }
    }
}
</script>

<style type="text/css" lang="less">
.adx-box {
    .title {
        color: #333;
    }
}
</style>
```