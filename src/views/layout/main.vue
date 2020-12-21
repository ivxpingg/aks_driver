<template>
    <div class="main-container">
        <router-view class="main-body" />
        <van-tabbar v-model="active"
                    active-color="rgba(0, 156, 255, 1)"
                    @change="changeTab">
            <van-tabbar-item name="orderManage">
                订单管理
                <van-icon slot="icon" :size="26" :name="orderIcon" />
            </van-tabbar-item>

            <van-tabbar-item name="home">
                一键抢单
                <van-icon slot="icon" :size="26" :name="serviceIcon" />
            </van-tabbar-item>

            <van-tabbar-item name="userCenter">
                <van-icon slot="icon" :size="26" :name="personIcon" />
                个人中心
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import baiduMixin from '../../lib/mixins/baiduMixin';
    export default {
        name: 'Main',
        mixins: [baiduMixin],
        computed: {
            orderIcon() {
                return this.active === 'orderManage' ? 'todo-list' : 'todo-list-o';
            },
            serviceIcon() {
                return this.active === 'home' ? 'location' : 'location-o';
            },
            personIcon() {
                return this.active === 'userCenter' ? 'manager' : 'manager-o';
            }
        },
        data () {
            return {
                active: 'home',
                isLoading: false,
                timer: null
            };
        },
        destroyed() {
            if (this.timer) clearInterval(this.timer);
        },
        mounted() {
            this.active = this.$route.name;
            this.BD_getLocation_app();
            this.timer = setInterval(() => {
                this.BD_getLocation_app();
            }, 200)
        },
        watch: {
          '$route.name'(val) {
              this.active = val;
          }
        },
        methods: {
            changeTab(name) {
                this.$router.push({name})
            },
            onRefresh() {
                window.location.href = window.location.origin + '/home?t=' + Math.random();
                this.isLoading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-container {
        .main-body {
            padding-bottom: 50px;

        }
    }
</style>
<style lang="scss">
    .main-container {
        .main-body {
        }
    }
</style>
