<template>
    <div class="userOrder-container">
        <div class="distance">{{drivingRouteInfo.distance}}</div>
        <div class="form">
            <van-cell-group>
                <van-field
                        v-model="orderData.beginAddress"
                        readonly >
                    <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#1AD8E2"></van-icon>
                </van-field>

                <van-field
                        v-model="orderData.endAddress"
                        readonly>
                    <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#E69B21"></van-icon>
                </van-field>
            </van-cell-group>

        </div>
        <div class="where-panel-btn-panel">
            <van-button type="info"
                        size="large"
                        @click="getOrder">一 键 抢 单</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vuserOrder',
        props: {
            map: {
                type: Object,
                required: true
            },
            orderData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                drivingRoute: null,
                drivingRouteInfo: {
                    distance: '',
                    duration: ''
                }
            };
        },
        watch: {
            orderData: {
                immediate: true,
                handler(val) {
                    if (val.beginLat) {
                        this.getDrivingRouteInfo();
                    }
                }
            }
        },
        methods: {
            // 抢单
            getOrder() {
                this.$emit('onGetOrder', this.orderData.taxiOrderId);
            },
            // 获取驾车线路信息
            getDrivingRouteInfo() {
                let that = this;
                if (!this.drivingRoute) {
                    this.drivingRoute = new BMap.DrivingRoute(this.map, {
                        onSearchComplete: function (drivingRouteResult) {
                            if (drivingRouteResult.getNumPlans() > 0) {
                                that.drivingRouteInfo.distance = drivingRouteResult.getPlan(0).getDistance();
                                that.drivingRouteInfo.duration = drivingRouteResult.getPlan(0).getDuration();
                            }
                        }
                    });
                }
                let startPoint = new BMap.Point(this.orderData.beginLng, this.orderData.beginLat);
                let endPoint = new BMap.Point(this.orderData.endLng, this.orderData.endLat);
                this.drivingRoute.search(startPoint, endPoint);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userOrder-container {
        margin: 20px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #FFF;
        .distance {
            font-size: 18px;
            line-height: 40px;
            font-weight: 700;
            padding: 0 20px;
            color: #E69B21;
        }
    }
</style>
