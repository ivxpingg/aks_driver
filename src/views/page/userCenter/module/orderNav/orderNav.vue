<template>
    <div class="orderNav-container">
        <div class="body">
            <van-row>
                <van-col span="8">
                    <van-icon name="orders-o"></van-icon>
                    <div class="title">订单</div>
                </van-col>
                <!--<van-col span="8">-->
                    <!--<van-icon name="pending-payment"></van-icon>-->
                    <!--<div class="title">待付款</div>-->
                <!--</van-col>-->
                <!--<van-col span="8">-->
                    <!--<van-icon name="todo-list-o"></van-icon>-->
                    <!--<div class="title">未使用</div>-->
                <!--</van-col>-->
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vorderNav',
        data () {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .orderNav-container {
        padding: 0 10px;
        .body {
            background-color: #FFF;
            border-radius: 5px;

            .van-col {
                position: relative;
                padding: 8px 0 5px;
                text-align: center;
                &:after {
                    position: absolute;
                    box-sizing: border-box;
                    content: ' ';
                    pointer-events: none;
                    top: 15px;
                    right: 0;
                    bottom: 15px;
                    border-right: 1px solid #ebedf0;
                    transform: scaleX(0.5);
                }
                .van-icon {
                    font-size: 32px;
                    color: #1AD8E2;
                }
            }
        }
    }
</style>