<template>
    <div class="orderReceiving-container">
        <van-sticky :offset-top="0">
            <van-nav-bar class="nav-bar-main"
                         right-text="订单"
                         title="接单" @click-right="com_goto('orderManage')">
            </van-nav-bar>
        </van-sticky>

        <div class="page-main" :style="{height: height + 'px'}">
            <div class="baidu" id="baidu_dom"></div>

            <div class="user-order-panel" v-if="!orderData.taxiOrderId">
                <vUserOrder v-for="item in waitOrderList"
                            :key="item.taxiOrderId"
                            :map="map"
                            @onGetOrder="receiveOrder"
                            :orderData="item"></vUserOrder>
            </div>
        </div>

        <van-overlay :show="isLoader" style="display: flex; justify-content: center; align-items: center;">
            <van-loading  size="24px">加载中...</van-loading>
        </van-overlay>

    </div>
</template>

<script>
    import comMixin from '../../../lib/mixins/comMixin';
    import baiduMixin from '../../../lib/mixins/baiduMixin';
    import initBMap from '../../../lib/baidu/initBMap';
    import vUserOrder from './module/userOrder/userOrder';
    import { mapState } from 'vuex';
    export default {
        name: 'vOrderReceiving',  // 一键抢单
        mixins: [comMixin, baiduMixin],
        components: {vUserOrder},
        beforeDestroy() {
            if (this.timerForWaitOrder) {
                clearTimeout(this.timerForWaitOrder);
            }

            if (this.timerForDriverPosition) {
                clearTimeout(this.timerForDriverPosition);
            }
        },
        destroyed() {
            if (this.timing)  clearTimeout(this.timing);
        },
        computed: {
            ...mapState({
                appPoint: state => state.app.appPoint
            })
        },
        data () {
            return {
                map: null,
                height: 200,
                // 当前位置自定义覆盖物
                myOverlay: null,
                // 订单详情
                orderData: {
                    beginAddress: '',
                    beginLat: null,
                    beginLng: null,
                    endAddress: '',
                    endLat: null,
                    endLng: null,
                    orderStatus: '',
                    taxiOrderId: '',
                },
                // 待接单订单列表
                waitOrderList: [],
                timerForWaitOrder: null,
                // 驾车线路对象
                drivingRoute: null,

                // 定时器，上传司机位置信息
                timerForDriverPosition: null,
                timing: null,
                times: 1, // 调用定位次数,不能为0
                isLoader: true
            };
        },
        beforeMount() {
            if (this.appPoint) {
                this.isLoader = false;
            }
        },
        mounted() {
            let that = this;
            this.height = window.innerHeight - 46;

            if (!this.appPoint) {
                setTimeout(() => {
                    this.loadMap();
                }, 300)
            }
            else {
                this.loadMap();
            }

            this.getLastTaxiOrderDetail();

           this.uploadDriverPosition();
        },
        watch: {
            appPoint(val) {
                if (val)
                this.map.panTo(val);
            }
        },
        methods: {
            loadMap() {
                initBMap('baidu_dom', null, this.appPoint).then((map) => {
                    this.isLoader = false;
                    this.map = map;
                    this.getLocation();
                    setTimeout(() => {
                        this.getLocation();
                    }, 200)
                    setTimeout(() => {
                        this.getLocation();
                    }, 1000)
                });
            },
            getLocation() {

                let r = this.BD_getLocation_app();
                if (r.state) {
                    this.times = 1;
                    this.map.panTo(r.point);
                    this.myOverlay = this.BD_now_position_overlay(this.map, r.point);
                }
                else {
                    setTimeout(() => {
                        this.times++;
                        this.getLocation();
                    }, 1000)
                    this.map.removeOverlay(this.myOverlay);
                    this.myOverlay = null;

                    if ((this.times / 10) % 1 === 0) {
                        this.$notify('无法定位到您的当前位置');
                    }
                }
            },
            // 获取当前执行订单详情
            getLastTaxiOrderDetail() {
                this.$http({
                    method: 'get',
                    url: '/taxi/LastTaxiOrderDetail'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        Object.assign(this.orderData, res.data);

                        // 如果当前没有订单，则获取待接单的数据
                        if (res.data.taxiOrderId) {
                            this.gotoByOrderStatus();
                        }
                        else {
                            this.getWaitReceiveOrder();
                        }
                    }
                })
            },
            // 判断订单状态，跳转页面
            gotoByOrderStatus() {
                switch (this.orderData.orderStatus) {
                    // 如果是已接单状态
                    case 'receive_order':
                    // 如果是行程中状态
                    case 'in_trip': this.$router.push({name: 'onTrip'}); break;
                    case 'end_trip':
                    case 'wait_pay' :
                        this.$router.push({
                            name: 'setAmount',
                            params: {
                                id: this.orderData.taxiOrderId
                            }
                        }); break;
                }
            },
            // 获取待接单的订单
            getWaitReceiveOrder() {
                this.$http({
                    method: 'get',
                    url: '/taxi/taxiOrderList'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.waitOrderList = res.data || [];
                        this.setTimerForWaitOrder();
                    }
                })
            },
            // 设置定时5秒获取一次待接单的数据
            setTimerForWaitOrder() {
                this.timerForWaitOrder = setTimeout(() => {
                    this.getWaitReceiveOrder();
                }, 5000)
            },
            // 一键抢单
            receiveOrder(taxiOrderId) {
                this.$http({
                    method: 'get',
                    url: '/taxi/receiveOrder',
                    params: {
                        taxiOrderId: taxiOrderId
                    }
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.$router.push({name: 'onTrip'});
                    }
                    else {
                     //   this.$toast('抢单失败，订单已被接单');
                    }
                })
            },

            // 上传司机位置
            uploadDriverPosition() {
                let r = this.BD_getLocation_app();
                this.timerForDriverPosition = setTimeout(() => {
                    this.uploadDriverPosition();
                }, 5000);
                if (r.state && !!r.lng) {
                    this.$http({
                        method: 'get',
                        url: '/taxi/saveDriverPosition',
                        params: {
                            lng: r.lng,
                            lat: r.lat
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .orderReceiving-container {
        position: relative;
        .page-main {
            position: relative;
            .baidu {
                height: 100%;
            }
        }

        .user-order-panel {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 50px;
        }
    }
</style>
