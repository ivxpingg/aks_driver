/**
 * axios组件自己定义封装，增加基础配置、请求前、后拦截器处理。
 * @return axios对象
 * */

import axios from 'axios';
import Config from '../../config';
import Cookies from 'js-cookie';
import router from '../../router';
import {Toast} from 'vant';

axios.defaults.withCredentials = true;
const Ajax = axios.create({
  baseURL: Config.ajaxUrl,  // 对应vue.config.js中的publicPath参数
  timeout: 30000
});
// ajax请求前拦截器
Ajax.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
    config.headers.common['Authorization'] = Cookies.get(Config.tokenKey);
    return config
}, function (error) {
    // router.push('/login');
    return Promise.reject(error)
});
// ajax响应后拦截器
Ajax.interceptors.response.use(function (response) {
    // 判断未登录
    if (response.data.code === 'E0008') {
        router.push({
            name: 'login' // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    }
    else if (response.data.code === 'SUCCESS') {
        return response.data;
    }
    else {
        if (response.data.msg) {
            Toast(response.data.msg);
        }
        return response.data || {};
    }
}, function (error) {
    return Promise.reject(error)
});

export default Ajax;
