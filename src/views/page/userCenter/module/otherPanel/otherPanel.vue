<template>
    <div class="otherPanel-container">
        <van-cell-group>
            <van-cell title="常用信息管理" is-link>
                <van-icon slot="icon"
                          size="20px"
                          color="#999"
                          name="newspaper-o">
                </van-icon>
            </van-cell>
            <van-cell title="反馈与建议" is-link>
                <van-icon slot="icon"
                          size="20px"
                          color="#999"
                          name="records">
                </van-icon>
            </van-cell>
            <van-cell title="消息通知" is-link>
                <van-icon slot="icon"
                          size="20px"
                          color="#999"
                          name="bell">
                </van-icon>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'votherPanel',
        data () {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .otherPanel-container {
        padding: 10px;
        .van-icon {
            padding-right: 5px;
        }
    }
</style>