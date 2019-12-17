<template>
    <div class="panel-title panel-title-container">
        <div class="title-panel">
            <slot></slot>
        </div>
        <div class="right-panel" @click="rightClick">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vpanel-title',
        data () {
            return {};
        },
        methods: {
            rightClick() {
                this.$emit('on-right');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .panel-title-container {
        position: relative;
        display: flex;
        &:after {
            position: absolute;
            display: block;
            content: " ";
            left: 0;
            top: 2px;
            width: 5px;
            bottom: 2px;
            background:linear-gradient(180deg,rgba(50,164,255,1) 0%,rgba(146,204,251,1) 100%);
            border-radius:2px;
        }

        .title-panel {
            flex: 1;
            font-size:14px;
            font-weight:bold;
            line-height:19px;
            color:rgba(0,0,0,1);
            text-indent: 11px;
        }
        .right-panel {
            font-size: 12px;
            color:rgba(153,153,153,1);
        }
    }
</style>