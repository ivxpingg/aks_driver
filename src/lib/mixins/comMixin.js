export default {
    methods: {
        com_back() {
            if (window.history.length === 1) {
                this.$router.push({name: 'home'});
            }
            else {
                this.$router.back();
            }
        },
        com_goto(name, params) {
            this.$router.push({
                name: name,
                params: params || {}
            })
        },
        /**
         * 转化时间格式
         * @param value 11225555421
         * @param format ps: 'YYYY-MM-DD HH:mm:ss'
         * @returns {string}
         */
        timeFormat(value, format) {
            format = format || 'YYYY-MM-DD';
            return value ? this.$moment(value).format(format) : '';
        },
        /**
         * 获取单个数据字典
         * @param type [String]
         * @param key [String]
         */
        com_getDict(type, key, callback) {
            this.$http({
                method: 'get',
                url: '/dict/getListByType',
                params: {
                    type: type
                }
            }).then(res => {
                if(res.code) {
                    this[key] = res.data;
                }
                if (callback) {
                    callback();
                }
            })
        },
        /**
         * 获取字典列表, 自动赋值
         * @param list [Array]
         * @return null
         */
        com_getDicts(list, callback) {
            this.$http({
                method: 'get',
                url: '/dict/getListByTypes',
                params: {
                    types: list.join(',')
                }
            }).then(res => {
                if(res.code === 'SUCCESS') {
                    list.forEach(v => {
                        this[`dict_${v}`] = res.data[v] || [];
                    });
                }
                if (callback) {
                    callback();
                }
            });
        },
        toChinesNum(num) {
            let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
            let unit = ["", "十", "百", "千", "万"];
            num = parseInt(num);
            let getWan = (temp) => {
                let strArr = temp.toString().split("").reverse();
                let newNum = "";
                for (var i = 0; i < strArr.length; i++) {
                    newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
                }
                return newNum;
            }
            let overWan = Math.floor(num / 10000);
            let noWan = num % 10000;
            if (noWan.toString().length < 4) noWan = "0" + noWan;
            return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);

        }
    }
}