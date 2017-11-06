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

<script type="text/javascript" src="./main.js" lang="babel"></script>
<script type="text/javascript" lang="babel">
export default {
    data () {
        return {
            title: 'ad-title',
            url: 'ad-url'
        }
    }
}
</script>

<style type="text/css" src="./style.less" lang="less"></style>
<style type="text/css" lang="less">
.adx-box {
    .title {
        color: #333;
    }
}
</style>