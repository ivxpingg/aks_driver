<template>
    <div class="noticeBar-container">
        <van-notice-bar
                :text="text"
                left-icon="volume-o">
        </van-notice-bar>
    </div>
</template>

<script>
    export default {
        name: 'vNoticeBar',  // 消息通知滚动
        data () {
            return {
                text: '10月14日789号公交车往XXX方向停运'
            };
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .noticeBar-container {
    }
</style>