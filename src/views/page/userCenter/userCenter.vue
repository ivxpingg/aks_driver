<template>
    <div class="userCenter-container">
        <vUserHeader></vUserHeader>
        <!--<vOrderNav></vOrderNav>-->
        <vOtherPanel></vOtherPanel>

        <div class="logout" @click="logout">退 出 登 录</div>
    </div>
</template>

<script>
    import vUserHeader from './module/userHeader/userHeader';
    import vOrderNav from './module/orderNav/orderNav';
    import vOtherPanel from './module/otherPanel/otherPanel';
    export default {
        name: 'vuserCenter',
        components: {vUserHeader, vOrderNav, vOtherPanel},
        data () {
            return {};
        },
        methods: {
            logout() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确认退出?'
                }).then(() => {
                    this.$http({
                        method: 'get',
                        url: '/logout'
                    }).then((res) => {
                        this.$router.push({
                            name: 'login'
                        })
                    });

                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userCenter-container {
        .logout {
            margin-top: 20px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            text-decoration: underline;
            color: #5A5A5A;
        }
    }
</style>
