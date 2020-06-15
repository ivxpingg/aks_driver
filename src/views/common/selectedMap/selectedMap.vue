<template>
    <van-popup v-model="popup_show"
               class="selectedMap-container"
               position="bottom">
        <div class="list">
            <div class="list-item" @click="selectedMap(0)">百度地图</div>
            <div class="list-item" @click="selectedMap(1)">高德地图</div>
            <div class="list-item" @click="selectedMap(2)">腾讯地图</div>
        </div>
    </van-popup>
</template>

<script>
    export default {
        name: 'selectedMap',
        data() {
            return {
                popup_show: false
            }
        },
        methods: {
            selectedMap(mapType) {
                this.$emit('callback', mapType);
            }
        }
    }
</script>

<style lang="scss">
    .selectedMap-container {
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        .list {
            background-color: #fff;
            .list-item {
                position: relative;
                text-align: center;
                font-size: 18px;
                line-height: 60px;
                color: #333;
                background-color: #fff;
                &::after {
                    position: absolute;
                    box-sizing: border-box;
                    content: ' ';
                    pointer-events: none;
                    right: 0;
                    bottom: 0;
                    border-bottom: 1px solid #ebedf0;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                }
                &:hover {
                    background-color: #dcdcdc;
                }
            }
        }
    }
</style>
