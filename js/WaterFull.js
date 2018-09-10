/**
 * 瀑布流函数
 * @param parent 父盒子id
 * @param child  子盒子类名
 */
function waterFull(parent,child) {
    //内容整体居中
    //获取所有小盒子
    var allBox = $(parent).getElementsByClassName(child);
    //获取子盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    //获取屏幕的宽度
    var screenW = document.body.clientWidth || document.documentElement.clientWidth;
    //算出有几列
    var cols = parseInt(screenW / boxWidth);
    //外边距
    var xyMargin = 16;

    var heightArr=[],boxHeight=0,minBoxHeight=0,minBoxIndex=0;
    for (var i = 0; i < allBox.length; i++) {
        //获取盒子的高度
        boxHeight = allBox[i].offsetHeight;
        //将第一行的盒子高度放入数组
        if(i < cols){
            heightArr.push(boxHeight);
            allBox[i].style = '';//用户变更浏览器大小太快太频繁时，第一行会被加上相关style属性，影响布局，所以此处清除
            allBox[i].style.position = "absolute";
            allBox[i].style.left = i * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top =  xyMargin + 'px';
        }else{
            //取出最小高度
            minBoxHeight = _.min(heightArr);
            //取出最小盒子的索引
            minBoxIndex = heightArr.indexOf(minBoxHeight);
            //设置盒子的位置
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top = minBoxHeight +  xyMargin + 'px';
            //更新最小盒子的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
    //更新父盒子的高度
    var parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    $(parent).style.height = parentHeight + "px";
};

/**
 * 判断是否加载图片
 */
function checkWillLoadImage() {
    //获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length-1];
    //取出最后一个盒子自身高度的一般 + offsetTop
    var lastBoxDis = lastBox.offsetHeight*0.5 + lastBox.offsetTop;
    //获取屏幕的高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;
    //求出页面偏离浏览器的高度（也就是滚动的高度）
    var scrollTop = scroll().top;
    return lastBoxDis <= screenH+scrollTop;
}