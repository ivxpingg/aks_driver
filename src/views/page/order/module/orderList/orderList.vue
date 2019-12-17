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
                <div class="item"
                     v-for="item in listData"
                     :key="item.taxiOrderId" @click="gotoDetail(item)">

                    <div class="top-panel ivx-row">
                        <div class="ivx-item ivx-item_1 price">
                            <span class="money-icon"> {{item.totalPrice ? '￥': ''}} </span>
                            <span class="money-value">{{item.totalPrice}}</span>
                        </div>
                        <div class="ivx-item">
                            <span class="state" :class="{'state-inTrip': item.orderStatus === 'in_trip'}">{{item.orderStatusLabel}}</span>
                        </div>
                    </div>
                    <div class="ivx-row">
                        <div class="ivx-item ivx-item_1">
                            <span class="ivx-title">
                                <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#1AD8E2"></van-icon>
                            </span>
                            <span class="ivx-text">{{item.beginAddress}}</span>
                        </div>
                        <div class="ivx-item">
                            <!--<span class="">待评价</span>-->
                        </div>
                    </div>
                    <div class="ivx-row">
                        <div class="ivx-item">
                            <span class="ivx-title">
                               <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#E69B21"></van-icon>
                            </span>
                            <span class="ivx-text">{{item.endAddress}}</span>
                        </div>
                    </div>
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
            margin: 10px;
            padding: 10px;
            background-color: #FFF;
            border-radius: 5px;

            .price {
                padding-left: 5px;
                font-size: 16px;
                font-weight: 700;
                color: rgb(249, 137, 64);
                text-align: left;
            }

            .state {
                font-weight: 700;
                &.state-inTrip {
                    color: rgb(26,216,226)
                }
            }
        }
    }
</style>