export default {
    state: {
        mapLoc: null,  // app定位信息
        appPoint: null,  // 百度地图point对象
    },
    getters: {

    },
    mutations: {
        setMapPosition(state, position) {
            state.mapLoc = position;
            if (position && position.point) {
                state.appPoint = position.point;
            }
        }
    },
    actions: {}
}
