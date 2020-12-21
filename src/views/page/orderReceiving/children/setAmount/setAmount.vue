<template>
    <div class="setAmount-container">
        <van-sticky :offset-top="0">
            <van-nav-bar class="nav-bar-main"
                         left-arrow
                         title="发起收款" @click-left="com_goto('home')"></van-nav-bar>
        </van-sticky>
        <div class="page-body">
            <div class="item ">
                <div class="top-panel ivx-row">
                    <div class="ivx-item ivx-item_1 price-title-panel">
                       <span class="money-icon"> {{orderData.totalPrice ? '￥': ''}} </span>
                       <span class="money-value">{{orderData.totalPrice}}</span>
                    </div>
                </div>
                <div class="ivx-row">
                    <div class="ivx-item ivx-item_1">
                            <span class="ivx-title">
                                <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#1AD8E2"></van-icon>
                            </span>
                        <span class="ivx-text"> {{orderData.beginAddress}} </span>
                    </div>
                </div>
                <div class="ivx-row">
                    <div class="ivx-item">
                            <span class="ivx-title">
                               <van-icon slot="left-icon" class-prefix="icon iconfont icondian" size="22px" color="#E69B21"></van-icon>
                            </span>
                        <span class="ivx-text">
                                 {{orderData.endAddress}}
                            </span>
                    </div>
                </div>

                <div class="ivx-row set-panel" v-if="orderData.orderStatus === 'end_trip'">
                    <div class="ivx-item">
                        <span class="money-icon">￥</span>
                    </div>
                    <div class="ivx-item ivx-item_1">
                        <div class="money-amount" @click="keyboard_props.show = true">
                            {{keyboard_props.value}}
                        </div>
                        <!--<van-field-->
                                <!--readonly-->
                                <!--clickable-->
                                <!--v-model="keyboard_props.value"-->
                                <!--@touchstart.native.stop="keyboard_props.show = true"></van-field>-->
                    </div>
                </div>
                <div class="msg" v-if="orderData.orderStatus === 'end_trip'">
                    <span>请输入计价器费用，并请乘客确认。</span>
                </div>

                <div class="btn-panel">
                    <van-button v-if="orderData.orderStatus === 'end_trip'"
                                type="info"
                                color="rgb(26,216,226)"
                                size="large" @click="onOk_set">发起收款</van-button>
                    <van-button v-if="orderData.orderStatus === 'wait_pay' || orderData.orderStatus === 'pay'"
                                type="info"
                                size="large" @click="onOk_get">确认收款</van-button>
                    <van-button v-if="orderData.orderStatus === 'wait_pay' || orderData.orderStatus === 'pay'"
                                type="danger"
                                size="large"
                                style="margin-top: 20px;"
                                @click="show = true">未收到款</van-button>
                </div>

                <div class="order-complete" v-if="orderData.orderStatus === 'complete'">
                    <van-icon name="checked" color="rgb(26,216,226)" size="45"></van-icon>
                    <div class="text">订单已完成</div>
                </div>
            </div>
        </div>

        <van-dialog
                v-model="show"
                show-cancel-button
                :beforeClose="submit">
            <div slot="title">
                未收到款？
            </div>
            <div class="dialog-body">
                <div class="field-group">
                    <van-field
                            v-model="formData.orderRemark"
                            label="描述:"
                            type="textarea"
                            placeholder="请输入描述"
                            maxlength="2000"
                            rows="1"
                            label-width="50"
                            autosize></van-field>
                </div>
            </div>
        </van-dialog>

        <van-number-keyboard
                v-model="keyboard_props.value"
                :show="keyboard_props.show"
                :maxlength="7"
                theme="custom"
                extra-key="."
                close-button-text="完成"
                @input="onInput"
                @blur="keyboard_props.show = false"
        ></van-number-keyboard>
    </div>
</template>

<script>
    import comMixin from '../../../../../lib/mixins/comMixin';
    export default {
        name: 'vSetAmount',  // 发起收款
        mixins: [comMixin],
        data () {
            return {
                taxiOrderId: '',
                // 未收到款
                show: false,
                formData: {
                    taxiOrderId: '',
                    orderRemark: ''
                },
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
                    totalPrice: null
                },

                keyboard_props: {
                    value: '',
                    show: false
                }
            };
        },
        mounted() {
            this.taxiOrderId = this.$route.params.id;
            this.getData();
        },
        methods: {
            onInput(key) {

            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/taxi/taxiOrderDetail',
                    params: {
                        taxiOrderId: this.taxiOrderId
                    }
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        if (res.data) {
                            Object.assign(this.orderData, res.data);
                        }
                        else {
                        }
                    }
                    else {

                    }
                })
            },
            // 发起收款
            onOk_set() {
                if(this.keyboard_props.value === "") {
                    this.$toast('请输入收款金额');
                    return;
                }

                if(this.keyboard_props.value === "." || this.keyboard_props.value.split('.').length > 2) {
                    this.$toast('收款金额输入不正确');
                    return;
                }
                this.$dialog.confirm({
                    title: '提示',
                    message: `确认发起收款金额为 ${this.keyboard_props.value} 元?`
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: '/taxi/initiatePayment',
                        params: {
                            taxiOrderId: this.orderData.taxiOrderId,
                            totalPrice: this.keyboard_props.value
                        }
                    }).then((res) => {
                        if (res.code === 'SUCCESS') {
                            this.getData();
                        }
                    });

                }).catch(() => {

                });
            },
            // 确认收款
            onOk_get() {
                this.$dialog.confirm({
                    title: '提示',
                    message: `确认已收到款?`
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: '/taxi/confirmPayment',
                        params: {
                            taxiOrderId: this.orderData.taxiOrderId
                        }
                    }).then((res) => {
                        if (res.code === 'SUCCESS') {
                            this.orderData.orderStatus = 'complete';
                        }
                    });

                }).catch(() => {

                });
            },
            submit(action, done) {
                this.formData.taxiOrderId = this.taxiOrderId;
                if (action === 'confirm') {
                    if (this.formData.orderRemark.trim() === '') {
                        this.$notify('请输入描述！');
                        done(false);
                        return;
                    }
                    this.$http({
                        method: 'post',
                        url: '/taxi/notReceiveMoney',
                        data: this.formData
                    }).then((res) => {
                        done();
                        if (res.code === 'SUCCESS') {
                            this.$notify('提交成功！');
                            this.getData();
                        }
                    }).catch(() => {
                        done();
                    });

                } else {

                    done();
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .setAmount-container {
        .page-body {
            .item {
                position: relative;
                margin: 10px;
                padding: 10px;
                background-color: #FFF;
                border-radius: 5px;

                .price-title-panel {
                    padding-left: 5px;
                    text-align: left;
                    min-height: 10px;

                    .money-icon {
                        color: rgb(249, 137, 64);
                        font-size: 30px;
                        line-height: 44px;
                        font-weight: 700;
                    }
                    .money-value {
                        font-size: 30px;
                        line-height: 44px;
                        font-weight: 700;
                    }
                }

                .ivx-date {
                    padding-left: 10px;
                }

                .btn-panel {
                    padding-top: 15px;
                }

                .order-complete {
                    padding-top: 20px;
                    text-align: center;
                    .text {
                        padding-top: 10px;
                        color: #999999;
                        font-size: 12px;
                    }
                }
            }

            .msg {
                padding: 10px;
                color: #999;
                font-size: 12px;
                text-align: center;
            }
            .set-panel {
                padding-top: 20px;
                .money-icon {
                    color: rgb(249, 137, 64);
                    font-size: 30px;
                    line-height: 44px;
                    font-weight: 700;
                }
                .money-amount {
                    padding: 0 10px;
                    height: 44px;
                    line-height: 44px;
                    font-size: 20px;
                    font-weight: 700;
                    min-width: 120px;
                }
            }
        }
    }
</style>
