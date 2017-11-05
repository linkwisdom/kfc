<link import="./widget/title.tpl" name="adx-title">
<link import="./widget/content.tpl" name="adx-content">
<link import="./widget/footer.tpl" name="adx-footer">
<div class="ad-box" :module-name="adRework" :title="javascript">
    <adx-title
        :title_url="brand_sc_params_url"
        :log_url="brand_sc_params_url_unencrypted"
        :title_text="title text ${title}">
        ${title}
    </adx-title>
    <div>
        <adx-content></adx-content>
    </div>
    <adx-footer></adx-footer>
</div>

<script type="text/javascript">
export default {
    let a = 1
    function () {
        console.log('hello world')
    }
}
</script>

<style type="text/css"></style>