<template>
    <div class="orderManage-container">
        <van-sticky :offset-top="0">
            <van-nav-bar class="nav-bar-main"
                         title="打车订单"></van-nav-bar>
        </van-sticky>
        <div class="page-body" :style="{height: height}">
            <!--<van-tabs ref="vanTab" v-model="active" sticky :offset-top="46">-->
                <!--<van-tab title="未完成订单" name="uncomplete">-->
                    <!--<vOrderList noticeStatus="uncomplete"></vOrderList>-->
                <!--</van-tab>-->
                <!--<van-tab title="已完成订单" name="complete">-->
                    <!--<vOrderList noticeStatus="complete"></vOrderList>-->
                <!--</van-tab>-->
            <!--</van-tabs>-->

            <vOrderList></vOrderList>
        </div>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixins/comMixin';
    import vOrderList from './module/orderList/orderList';
    export default {
        name: 'vorderManage',
        mixins: [comMixin],
        components: {vOrderList},
        data () {
            return {
                height: 'auto',
                active: 'uncomplete'
            };
        },
        mounted() {
            this.height = (window.innerHeight - 46 - 50) + 'px';
        }
    }
</script>

<style lang="scss" scoped>
    .orderManage-container {
    }
</style>