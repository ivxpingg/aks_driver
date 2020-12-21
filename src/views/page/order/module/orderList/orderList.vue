<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
                class="messageList-container"
                v-model="listLoading"
                :finished="listFinished"
                finished-text="没有更多了"
                :error.sync="listError"
                error-text="请求失败，点击重新加载"
                @load="onLoad">

            <div class="page-body">
                <div class="item hairline__bottom"
                     v-for="item in listData"
                     :key="item.taxiOrderId" @click="gotoDetail(item)">

                    <div class="flex-row hairline__bottom">
                        <div class="left-col">
                            <div class="top-icon">
                                <div class="icon"></div>
                            </div>
                            <div class="center-icon">
                                <div class="icon"></div>
                            </div>
                            <div class="bottom-icon">
                                <div class="icon"></div>
                            </div>
                        </div>
                        <div class="center-col">
                            <div class="text top-text">{{item.beginAddress}}</div>
                            <div class="text bottom-text">{{item.endAddress}}</div>
                        </div>
                        <div class="right-col">
                            <div class="text order-status-label">{{item.orderStatusLabel}}</div>
                            <div class="text price">
                                <span class="money-icon"> {{item.totalPrice ? '￥': ''}} </span>
                                <span class="money-value">{{item.totalPrice}}</span>
                            </div>
                        </div>
                    </div>

<!--                    <div class="top-panel ivx-row">-->
<!--                        <div class="ivx-item ivx-item_1 price">-->
<!--                            <span class="money-icon"> {{item.totalPrice ? '￥': ''}} </span>-->
<!--                            <span class="money-value">{{item.totalPrice}}</span>-->
<!--                        </div>-->
<!--                        <div class="ivx-item">-->
<!--                            <span class="state" :class="{'state-inTrip': item.orderStatus === 'in_trip'}">{{item.orderStatusLabel}}</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="ivx-row">-->
<!--                        <div class="ivx-item ivx-item_1">-->
<!--                            <span class="ivx-title">-->
<!--                                <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#1AD8E2"></van-icon>-->
<!--                            </span>-->
<!--                            <span class="ivx-text">{{item.beginAddress}}</span>-->
<!--                        </div>-->
<!--                        <div class="ivx-item">-->
<!--                            &lt;!&ndash;<span class="">待评价</span>&ndash;&gt;-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="ivx-row">-->
<!--                        <div class="ivx-item">-->
<!--                            <span class="ivx-title">-->
<!--                               <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#E69B21"></van-icon>-->
<!--                            </span>-->
<!--                            <span class="ivx-text">{{item.endAddress}}</span>-->
<!--                        </div>-->
<!--                    </div>-->

                </div>
            </div>
        </van-list>
    </van-pull-refresh>
</template>

<script>
    export default {
        name: 'vOrderList',
        data () {
            return {
                searchParams: {
                    current: 1,      // 当前第几页
                    size: 10,      // 每页几行
                    total: 0,     // 总行数
                },
                isLoading: false,
                listLoading: false,
                listFinished: false,
                listError: false,
                listData: [],

            };
        },
        mounted() {},
        methods: {
            onRefresh() {
                this.searchParams.current = 1;
                this.listData = [];
                this.listLoading = false;
                // this.listFinished = false;
                this.onLoad();
            },
            onLoad() {
                this.$http({
                    method: 'post',
                    url: '/taxi/list',
                    data: this.searchParams
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.searchParams.current++;
                        this.listData = this.listData.concat(res.data.records || []);
                        this.searchParams.total = res.data.total;
                    }
                    if (!res.data.records) {
                        this.listFinished = true;
                    }
                    this.listLoading = false;
                    this.isLoading = false;
                }).catch(() => {
                    this.listLoading = false;
                    this.listError = true;
                })
            },
            gotoDetail(item) {
                switch (item.orderStatus) {
                    case 'end_trip':
                    case 'wait_pay':
                    case 'pay':
                        this.$router.push({name: 'setAmount', params: {id: item.taxiOrderId}})
                        break;
                    default: this.$router.push({name: 'orderDetail', params: {id: item.taxiOrderId}})
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .orderList-container {

    }

    .page-body {
        .item {
            position: relative;
            margin-bottom: 10px;
            padding: 0 14px;
            background-color: #FFF;
            border-radius: 5px;

            .flex-row {
                display: flex;
                .left-col {
                    display: flex;
                    flex-direction: column;
                    width: 23px;
                    .top-icon {
                        padding-top: 18px;
                        height: 27px;
                        .icon {
                            display: inline-block;
                            float: left;
                            width: 9px;
                            height: 9px;
                            border-radius: 4px;
                            background: #0ECB67;
                        }
                    }
                    .center-icon {
                        flex: 1;
                        padding-left: 4px;
                        .icon {
                            width: 1px;
                            height: 100%;
                            background: #F1F1F1;
                        }
                    }
                    .bottom-icon {
                        padding-bottom: 18px;
                        height: 27px;
                        .icon {
                            display: inline-block;
                            float: left;
                            width: 9px;
                            height: 9px;
                            border-radius: 4px;
                            background: #F12A2A;
                        }
                    }
                }
                .center-col {
                    flex: 1;
                    .text {
                        padding: 11px 0;
                        color: #181616;
                        font-size: 15px;
                        line-height: 22px;
                    }
                }
                .right-col {
                    .text {
                        padding-left: 10px;
                        line-height: 44px;
                        text-align: right;
                    }
                    .seat-num {
                        color: #F89C24;
                        font-size: 17px;
                        padding-left: 10px;
                        padding-top: 5px;
                        line-height: 39px;
                        font-weight: bold;
                    }
                    .order-status-label {
                        color: #919191;
                        font-size: 14px;
                    }
                }
            }

            .price {
                padding-left: 5px;
                font-size: 16px;
                font-weight: 700;
                color: rgb(249, 137, 64);
                text-align: left;
                min-height: 10px;
            }

            .ivx-date {
                color: #919191;
                font-size: 13px;
                line-height: 45px;
            }
        }
        /*.item {*/
        /*    position: relative;*/
        /*    margin: 10px;*/
        /*    padding: 10px;*/
        /*    background-color: #FFF;*/
        /*    border-radius: 5px;*/

        /*    .price {*/
        /*        padding-left: 5px;*/
        /*        font-size: 16px;*/
        /*        font-weight: 700;*/
        /*        color: rgb(249, 137, 64);*/
        /*        text-align: left;*/
        /*    }*/

        /*    .state {*/
        /*        font-weight: 700;*/
        /*        &.state-inTrip {*/
        /*            color: rgb(26,216,226)*/
        /*        }*/
        /*    }*/
        /*}*/
    }
</style>
