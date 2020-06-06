const path = require('path');
const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部，
    // 比如 https://www.my-app.com/
    // 如果你的应用时部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如，如果你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 `/my-app/`
    publicPath: '/',
// 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'));
    },
    // 将构建好的文件输出到哪里
    outputDir: 'aks_driver',
    lintOnSave: false,
    devServer: {
        open: false,
        host: 'localhost',
        port: 9002,
        hot: true,
        https: false,
        hotOnly: false,
        proxy: {
            // '/aks_driver': {
            //     target: 'http://110.86.21.246:8887',
            //     ws: true,
            //     changeOrigin: true
            // },
            '/aks_driver': {
                target: 'http://124.88.217.239:8002/',
                ws: true,
                changeOrigin: true
            }
        }
    },
}
