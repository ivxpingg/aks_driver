<template>
    <div class="onTrip-container">
        <van-sticky :offset-top="0">
            <van-nav-bar class="nav-bar-main"
                         right-text="订单"
                         :title="title"
                         @click-right="com_goto('orderManage')"></van-nav-bar>
        </van-sticky>

        <div class="page-body" :style="{height: height + 'px'}">
            <div class="baidu" id="baidu_ontrip_dom"></div>

            <div class="btn-panel">

                <div v-if="orderData.orderStatus === 'receive_order' && driverPoint.lng"  style="margin-bottom: 20px; text-align: right; padding: 10px;">
                    <van-button type="info"
                                color="rgb(26,216,226)"
                                @click="$refs.selectedMap1.popup_show = true">导航至接送点</van-button>
                </div>

                <van-button v-if="orderData.orderStatus === 'receive_order'"
                            type="info"
                            color="rgb(26,216,226)"
                            size="large" @click="onOk_getOn">确认乘客上车</van-button>

                <div v-if="orderData.orderStatus === 'in_trip'" style="margin-bottom: 20px; text-align: right; padding: 10px;">
                    <van-button type="info"
                                color="rgb(26,216,226)"
                                @click="$refs.selectedMap2.popup_show = true">开始导航</van-button>
                </div>

                <van-button v-if="orderData.orderStatus === 'in_trip'"
                            type="info"
                            color="rgb(26,216,226)"
                            size="large" @click="onOk_arrived">到达目的地</van-button>
            </div>
        </div>

        <vSelectedMap ref="selectedMap1" @callback="onClick_DrivingDirections_receiveOrder"></vSelectedMap>
        <vSelectedMap ref="selectedMap2" @callback="onClick_DrivingDirections_inTrip"></vSelectedMap>
    </div>
</template>

<script>
    import comMixin from '../../../../../lib/mixins/comMixin';
    import baiduMixin from '../../../../../lib/mixins/baiduMixin';
    import initBMap from '../../../../../lib/baidu/initBMap';
    import vSelectedMap from '../../../../common/selectedMap/selectedMap';
    export default {
        name: 'vOnTrip', // 订单状态是 已接单或者行程中；['receive_order', 'in_trip']
        mixins: [comMixin, baiduMixin],
        components: { vSelectedMap },
        data () {
            return {
                title: '接送中',
                map: null,
                height: 200,
                // 当前位置自定义覆盖物
                driverOverlay: null,
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

                // 司机位置
                driverPoint: {
                    lng: null,
                    lat: null
                },

                timerForTaxiPosition:  null,
                x: 0.001
            };
        },
        mounted() {
            this.height = window.innerHeight - 46;
            initBMap('baidu_ontrip_dom').then((map) => {
                this.map = map;
                this.getLocation();
                this.getLastTaxiOrderDetail();
            });
        },
        methods: {
            // 定位
            getLocation() {
                // let that = this;
                // let geolocation = new BMap.Geolocation();
                // geolocation.getCurrentPosition(function(r){
                //     that.setTimerForWaitOrder();
                //     if(this.getStatus() === BMAP_STATUS_SUCCESS){
                //         if (that.driverOverlay) {
                //             that.map.removeOverlay(that.driverOverlay);
                //             that.driverOverlay = null;
                //         }
                //         that.setDriverPosition(r.point);
                //     } else {
                //
                //         that.$notify('无法定位到您的当前位置');
                //     }
                // },{enableHighAccuracy: true, maximumAge: 0});

                let r = this.BD_getLocation_app();
                this.setTimerForWaitOrder();
                if (r.state) {
                    this.driverPoint.lng = r.lng;
                    this.driverPoint.lat = r.lat;
                    if (this.driverOverlay) {
                        this.map.removeOverlay(this.driverOverlay);
                        this.driverOverlay = null;
                    }
                    this.setDriverPosition(r.point, r);
                }
                else {
                    this.$notify('无法定位到您的当前位置');
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
                        this.gotoByOrderStatus();
                        // 如果当前没有订单，则获取待接单的数据
                        if (res.data.taxiOrderId) {
                            this.setDrivingLine();
                        }
                        else {
                            this.$router({
                                name: 'home'
                            });
                        }
                    }
                })
            },
            // 判断订单状态，跳转页面
            gotoByOrderStatus() {
                switch (this.orderData.orderStatus) {
                    // 如果是已接单状态
                    case 'receive_order': this.title = '前往上车点'; break;
                    // 如果是行程中状态
                    case 'in_trip': this.title = '接送中'; break;
                    default:
                        this.$router.push({
                            name: 'home'
                        });
                }
            },

            // 设置定时5秒获取一次待接单的数据
            setTimerForWaitOrder() {
                this.timerForTaxiPosition = setTimeout(() => {
                    this.getLocation();
                }, 5000)
            },
            // 设置司机地图位置， 订单状态必须是已接单或行程中的状态。
            setDriverPosition(driverPoint, r) {
                if (r.state) {
                    this.uploadDriverPosition(r);
                    if (!this.driverOverlay) {
                        this.driverOverlay = this.DB_driver_position_overlay(driverPoint);
                        this.map.addOverlay(this.driverOverlay)
                    }
                    else {
                        this.driverOverlay.setPosition(driverPoint);
                    }
                }
            },
            // 上传司机位置
            uploadDriverPosition(driverPoint) {
                this.$http({
                    method: 'get',
                    url: '/taxi/saveDriverPosition',
                    params: {
                        lng: driverPoint.lng,
                        lat: driverPoint.lat
                    }
                })
            },
            // 设置驾车线路, 首次获取订单详情后执行，只执行一次
            setDrivingLine() {
                if (!this.drivingRoute) {
                    this.drivingRoute = new BMap.DrivingRoute(this.map, {
                        renderOptions: {
                            map: this.map,
                            autoViewport: true
                        }
                    });
                }
                else {
                    return;
                }
                let startPoint = new BMap.Point(this.orderData.beginLng, this.orderData.beginLat);
                let endPoint = new BMap.Point(this.orderData.endLng, this.orderData.endLat);
                this.drivingRoute.search(startPoint, endPoint);
            },

            // 确认上车
            onOk_getOn() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确认乘客上车?'
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: '/taxi/confirmPassengerGetInCar',
                        params: {
                            taxiOrderId: this.orderData.taxiOrderId
                        }
                    }).then((res) => {
                        if (res.code === 'SUCCESS') {
                            this.getLastTaxiOrderDetail();
                        }
                    });

                }).catch(() => {

                });
            },
            onOk_arrived() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确认到达目的地?'
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: '/taxi/reachDestination',
                        params: {
                            taxiOrderId: this.orderData.taxiOrderId
                        }
                    }).then((res) => {
                        if (res.code === 'SUCCESS') {
                            // 到达目的地后,跳转发起收款
                            this.$router.push({
                                name: 'setAmount',
                                params: {
                                    id: this.orderData.taxiOrderId
                                }
                            })
                        }
                    });

                }).catch(() => {

                });
            },

            // 导航到接送点
            onClick_DrivingDirections_receiveOrder(mapType) {
                this.$refs.selectedMap1.popup_show = false;
                this.BD_driver_baidu(
                    this.driverPoint.lat,
                    this.driverPoint.lng,
                    this.orderData.beginLat,
                    this.orderData.beginLng,
                    '当前位置',
                    this.orderData.beginAddress,
                    '',
                    mapType
                );
               // let str = `${this.driverPoint.lat},${this.driverPoint.lng},${this.orderData.beginLat},${this.orderData.beginLng},当前位置,${this.orderData.beginAddress},''`;
               // Toaster.postMessage(str);
            },
            // 跳转到百度地图导航
            onClick_DrivingDirections_inTrip(mapType) {
                this.$refs.selectedMap2.popup_show = false;
                // let str = `
                // ${this.orderData.beginLat},
                // ${this.orderData.beginLng},
                // ${this.orderData.endLat},
                // ${this.orderData.endLng},
                // ${this.orderData.beginAddress},
                // ${this.orderData.endAddress}`;
                this.BD_driver_baidu(
                    this.orderData.beginLat,
                    this.orderData.beginLng,
                    this.orderData.endLat,
                    this.orderData.endLng,
                    this.orderData.beginAddress,
                    this.orderData.endAddress,
                    '',
                    mapType
                );
                // Toaster.postMessage(str);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .onTrip-container {
        position: relative;
        .page-body {
            position: relative;
            .baidu {
                height: 100%;
            }

            .btn-panel {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
    }
</style>
