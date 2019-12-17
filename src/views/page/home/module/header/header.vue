<template>
    <div class="header-container">

        <div class="banner">
            <h2>阿克苏交通出行</h2>

            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img class="img" src="./images/banner-1.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img class="img" src="./images/banner-2.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img class="img" src="./images/banner-4.png" alt="">
                </van-swipe-item>

            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vHeader',
        data () {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .header-container {
        position: relative;
        background-color: #FFF;
        height: 180px;
        overflow: hidden;

        &:before {
            position: absolute;
            display: block;
            content: " ";
            width: 1000px;
            height: 1000px;
            background-color: #1AD8E2;
            border-radius: 50%;
            top: -1000px;
            left: -500px;
            margin-top: 140px;
            margin-left: 50%;
        }
        .banner {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 10px;
            
            > h2 {
                padding-bottom: 10px;
                text-align: center;
                color: #FFF;
            }
            .van-swipe {
                border-radius: 9px;
                overflow: hidden;
            }
            .img {
                width: 100%;
            }
        }
    }
</style>