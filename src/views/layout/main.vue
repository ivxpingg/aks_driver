<template>
    <div class="main-container">
        <router-view class="main-body" />
        <van-tabbar v-model="active"
                    active-color="rgb(26,216,226)"
                    @change="changeTab">
            <van-tabbar-item name="orderManage">
                订单管理
                <van-icon slot="icon" :name="orderIcon" />
            </van-tabbar-item>

            <van-tabbar-item name="home">
                一键抢单
                <van-icon slot="icon" :name="serviceIcon" />
            </van-tabbar-item>

            <van-tabbar-item name="userCenter">
                <van-icon slot="icon" :name="personIcon" />
                个人中心
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'Main',
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
                isLoading: false
            };
        },
        mounted() {
            this.active = this.$route.name;
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