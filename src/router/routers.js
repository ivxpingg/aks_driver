import MainLayout from '../views/layout/main'
const Login = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
       component: () => import('../views/page/login/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: () => import('../views/page/register/registerPage.vue')
    }
];

const Main = [
    {
        path: '/',
        redirect: '/home',
        // alias: '/home',
        meta: {
            title: ''
        },
        component: MainLayout,
        children: [
            {
                path: 'orderManage',
                name: 'orderManage',
                meta: {
                    title: '订单管理',
                    data: {}
                },
                component: () => import('../views/page/order/orderManage.vue')
            },
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '一键抢单',
                    data: {}
                },
                component: () => import('../views/page/orderReceiving/orderReceiving.vue')
            },
            {
                path: 'userCenter',
                name: 'userCenter',
                meta: {
                    title: '个人中心',
                    data: {}
                },
                component: () => import('../views/page/userCenter/userCenter.vue')
            },
        ]
    }
];

// 司机服务
const DriverServer = [
    {
        path: '/orderReceiving/onTrip',
        name: 'onTrip',
        meta: {
            title: '订单管理',
            data: {}
        },
        component: () => import('../views/page/orderReceiving/children/onTrip/onTrip.vue')
    },
    {
        path: '/orderReceiving/setAmount/:id',
        name: 'setAmount',
        meta: {
            title: '发起收款',
            data: {}
        },
        component: () => import('../views/page/orderReceiving/children/setAmount/setAmount.vue')
    },
    {
        path: '/orderManage/orderDetail/:id',
        name: 'orderDetail',
        meta: {
            title: '订单详情',
            data: {}
        },
        component: () => import('../views/page/order/children/orderDetail.vue')
    },
];


// 出行服务
const Service = [
    ...DriverServer
];

export default [
    ...Login,
    ...Main,
    ...Service
]