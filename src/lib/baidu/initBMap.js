
let setMap = (domId, zoom, point) => {
    let map = new BMap.Map(domId, {enableMapClick:false, minZoom:0,maxZoom:26});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(point || '阿克苏', zoom || 12);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    setMapStyle(map);
    return map;
};
/**
 * 设置百度地图样式
 * @param Map
 */
let setMapStyle = (Map) => {
    let styleJson = [
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": {
                "lightness": 20
            }
        },
        {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
                "color": "#f49935"
            }
        },
        {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        },
        {
            "featureType": "local",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
                "color": "#d1e5ff"
            }
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }
    ];
    // Map.setMapStyleV2({
    //     styleJson: styleJson
    // });
    Map.setMapStyle({
        styleJson: styleJson
    });
};

let mapLoadedCompleted = () => {
    return new Promise(resolve => {
        if (typeof BMap !== 'undefined') { resolve(1); }
        else {
            let timer = setInterval(function () {
                if (typeof BMap !== 'undefined') {
                    clearInterval(timer);
                    resolve(1);
                }
            }, 50);
        }
    });
}

/**
 * 初始化百度地图，返回百度地图对象
 * @param domId [String] 百度地图元素的ID
 * @return Object  map
 */
let initMap = (domId, zoom, point) => {
    return mapLoadedCompleted().then(function () {
        return setMap(domId, zoom, point);
    });
};

export default initMap;
