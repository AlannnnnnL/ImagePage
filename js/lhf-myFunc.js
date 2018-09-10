/**
 * 获取滚动的头部距离和左边距离
 * scroll().top scroll().left
 * @returns {*}
 */
function scroll() {
    if(window.pageYOffset !== null){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

/**
 * 获取屏幕的宽度和高度
 * @returns {*}
 */
function client() {
    if(window.innerWidth){ // ie9+ 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}


/**
 *  匀速动画函数
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj, target, speed) {
    // 1. 清除定时器
    clearInterval(obj.timer);

    //如果当前就在目标位置，则不用动
    if(Math.abs(target) === Math.abs(obj.offsetLeft)){
        clearInterval(obj.timer);
        return false;
    }

    // 2. 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    // 3. 设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + "px";

        if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
            clearInterval(obj.timer);

            obj.style.left = target + "px";
        }
    }, 20);

}

/**
 * 根据元素的属性获取样式值
 * @param {object}obj 元素
 * @param {string}attr 属性名
 */
function getCSSAttrValue(obj,attr) {
    if(obj.currentStyle){ //IE和Opera
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}

/**
 * 缓动动画
 * @param obj 被加动画的元素
 * @param json 键值对格式的元素属性
 * @param fn 回调函数
 */
function buffer(obj,json,fn) {
    //清楚定时器
    clearInterval(obj.timer);

    //设置定时器
    var begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
        //旗帜
        var flag = true;
        for(var k in json){
            //获取初始值
            if("opacity" === k){//透明度
                //起始值就是当前的透明度，为了兼容IE 将0-1的值乘上100
                begin = parseInt(parseFloat(getCSSAttrValue(obj, k)) * 100);
                target = parseInt(parseFloat(json[k] * 100));
            }else if("scrollTop" === k){
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[k]);
            }else{//其他情况
                begin = parseInt(getCSSAttrValue(obj,k)) || 0;
                target = parseInt(json[k]);
            }

            //求出步长(0.2为缓动系数)
            speed = (target - begin) * 0.2;

            //判断向上还是向下取整
            speed = target > begin ? Math.ceil(speed) : Math.floor(speed);

            //动起来
            if("opacity" === k){//透明度
                //w3c
                obj.style.opacity = (begin + speed) / 100;
                //ie
                obj.style.filter = "alpha(opacity:"+(begin+speed)+")";
            }else if("scrollTop" === k){
                obj.scrollTop = begin + speed
            }else if("zIndex" === k){
                obj.style[k] = json[k];
            }else{
                obj.style[k] = begin + speed + "px";
            }

            //判断
            if(target !== begin){
                flag = false;
            }
        }

        //清除定时器
        if(flag){
            clearInterval(obj.timer);

            //判断有没有回调函数
            if(fn){
                fn();
            }
        }
    },20);
}

/**
 * 自己网上找的判断浏览器类型方法
 * @returns {string}
 */
function isBrowser() {
    var userAgent = navigator.userAgent;
    //微信内置浏览器
    if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
        return "MicroMessenger";
    }
    //QQ内置浏览器
    else if(userAgent.match(/QQ/i) == 'QQ') {
        return "QQ";
    }
    //Chrome
    else if(userAgent.match(/Chrome/i) == 'Chrome') {
        return "Chrome";
    }
    //Opera
    else if(userAgent.match(/Opera/i) == 'Opera') {
        return "Opera";
    }
    //Firefox
    else if(userAgent.match(/Firefox/i) == 'Firefox') {
        return "Firefox";
    }
    //Safari
    else if(userAgent.match(/Safari/i) == 'Safari') {
        return "Safari";
    }
    //IE
    else if(!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }
    else {
        return "未定义:"+userAgent;
    }
}

