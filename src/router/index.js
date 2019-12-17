import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import store from '../store/store';
import Config from '../config';
Vue.use(Router);

const whiteList = ['/login', '/register'];
const typeList = ['super_admin', 'admin', 'teacher', 'student'];
const router = new Router({
    base: '/',
    routes,
    mode: 'history'
});


router.beforeEach((to, from, next) => {
    // iView.LoadingBar.start();

    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
    }
    // 判断是否已经获取用户信息
    else if (store.getters.userName === '') {
        store.dispatch('getUserInfo').then((res) => {
            next();
        }).catch(() => {
            next({
                name: 'login',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        })
    }
    else {
        next();
    }
});

router.afterEach(() => {
    // iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;