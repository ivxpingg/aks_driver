<template>
    <div class="home-container">
        <vHeader></vHeader>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixins/comMixin';
    import vHeader from './module/header/header';
export default {
    name: 'Home',
    mixins: [comMixin],
    components: {vHeader},
    data () {
        return {};
    },
    methods: {
        back () {
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" scoped>
    .home-container {
        .btn-ul {
            padding: 16px 16px;
            > li {
                margin: 5px 0;
                border-radius: 5px;
                overflow: hidden;
                &:hover {
                    box-shadow: 0 0 3px #969896;
                }
                > img {
                    width: 100%;
                }
            }
        }
    }
</style>