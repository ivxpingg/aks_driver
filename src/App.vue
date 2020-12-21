<template>
  <div id="app">
<!--    {{msg}}-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '我是android的返回值',
        versionName: ''
      }
    },
    mounted() {
      let that = this;
      window.goBack = function (name) {
        that.msg = name;
        that.goBack()
      }

      // app调用，判断是否需要版本更新。如果需要则跳转到百度助手浏览器
      window.callbackAppVersionName = function (versionName) {
        that.msg = versionName;
        let isNew = true;
        let appVersionName;
        try {
          appVersionName = versionName.split('.')
          if (appVersionName.length === 3 && that.versionName.length === 3) {
            if (parseInt(appVersionName[2]) < parseInt(that.versionName[2])) {
              isNew = false;
            }
          }
        }
        catch (e) {

        }
        if (!isNew) {
          that.$dialog.confirm({
            title: '版本更新',
            message: '检测到新版本，是否去更新？'
          }).then(() => {
            that.openUrlByBrowser();
          })
        }
      }

      this.getNewVersion();
    },
    methods: {
      goBack() {
        if (this.$route.name === 'home' || this.$route.name === 'login') {
          Toaster.exitApp();
        }
        else  {
          if (window.history.length === 1) {
            this.$router.push({name: 'home'});
          }
          else {
            this.$router.back();
          }
        }
      },
      // 获取最新版本号
      getNewVersion() {
        this.$http({
          method: 'get',
          url: '/lastVersion',
          params: {
            platform: 'android',  // 平台
            appType: 'driver'     // 用户端： 'user' ;  司机端： 'driver'
          }
        }).then((res) => {
          if (res.code === 'SUCCESS') {
            this.versionName = res.data || '';
            this.versionName = this.versionName.split('.');
            this.getVersionName();
          }
        })
      },
      // 获取当前app版本
      getVersionName() {
        Toaster.getAppVersionName();
        //
      },
      openUrlByBrowser(url) {
        Toaster.openUrlByBrowser("https://mobile.baidu.com/item?docid=27675192&f0=search_searchContent%400_appBaseNormal%401");
      }
    }
  }
</script>

<style lang="scss">
  #app{
  }

</style>
