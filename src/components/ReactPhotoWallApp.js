'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

// 获取图片相关的数据
var imagesData = require('../data/imagesData.json');

// 将图片名信息转化成图片URL信息
imagesData = imagesData.map(function(image){
    image.imageURL = require('../images/' + image.fileName);
    return image;
});

/*
* 获取区间内的随机值
* */
function getRangeRandom(range) {
    return Math.floor(Math.random() * (range[1] - range[0]) + range[0]) + 'px';
}

var ImgFigure = React.createClass({
   render: function () {
       var styleObj = this.props.arrange.pos ? this.props.arrange.pos : {};

       return (
           <figure className="img-figure" style={styleObj}>
               <img src={this.props.data.imageURL} alt={this.props.data.title}/>
               <figcaption>
                   <h2 className="img-title">{this.props.data.title}</h2>
               </figcaption>
           </figure>
       );
   }
});

var ReactPhotoWallApp = React.createClass({
    Constant: {
        centerPos: {   // 中心图片的取值范围
            left: 0,
            right: 0
        },
        hPosRange: {  // 左右图片位置的取值范围
            leftSecX: [0, 0],       // 左侧区域
            rightSecX: [0, 0],      // 右侧区域
            y: [0, 0]
        },
        vPosRange: {       // 上侧区域取值范围
            x: [0, 0],      // x轴
            y: [0, 0]       // y轴
        }
    },

    // 组件加载以后， 为每张图片计算其位置范围
    componentDidMount: function () {
        // 首先获取舞台的大小
        var stageDOM = document.getElementById('stage'),
        // scrollWidth 对象的实际宽度，不包括边线
        // clientWidth 对象的可视区宽度，不包括边线
        // offsetWidth 对象的可见宽度，包括滚动条
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.floor(stageW / 2),
            halfStageH = Math.floor(stageH / 2);

        // 拿到一个imageFigure 的大小
        //var imgFigureDOM = React.findDOMNode(this.refs.imageFigure0),
        //    imgW = imgFigureDOM.scrollWidth ,
        //    imgH = imgFigureDOM.scrollHeight ,
             var imgW = 320,
                imgH = 320,
            halfImgW = Math.floor(imgW / 2),
            halfImgH = Math.floor(imgH / 2);


        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW + 'px',
            top: halfStageH - halfImgH + 'px'
        };

        // 计算左右图片的位置
        this.Constant.hPosRange = {  // 左右图片的取值范围
            leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
            rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
            y: [-halfImgH, stageH - halfImgH]
        };

        this.Constant.vPosRange = {  // 顶部图片的取值范围
            x: [halfStageW - halfImgW * 3, halfStageW + halfImgW],
            y: [-halfImgH, halfStageH - halfImgH * 3]
        };
        this.rearrange(0);
    },
/*
* 重新布局所有图片
* @ param centerIndex 指定居中图片的index
* */
    rearrange: function (centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            constant = this.Constant,
            centerPos = constant.centerPos,
            hPosRange = constant.hPosRange,
            vPosRange = constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeX = vPosRange.x,
            vPosRangeY = vPosRange.y,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), // 顶部图片的数量
            topImgSpliceIndex = 0,                     // 顶部图片的索引
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);  // 中心图片的状态
            // 首先居中 中心图片
            imgsArrangeCenterArr[0].pos = centerPos;

            // 取出要布局上侧的图片的状态信息
            topImgSpliceIndex = Math.floor(Math.random() * imgsArrangeArr.length);
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        if(imgsArrangeTopArr[0]){
            imgsArrangeTopArr[0] = {
                pos: {
                    left: getRangeRandom(vPosRangeX),
                    top: getRangeRandom(vPosRangeY)
                },
                title: '顶部图片'
            };
        }

        // 布局左右两侧的图片
        imgsArrangeArr.forEach(function (image, index) {
            if (index % 2) {     // 布局左边的图片
                image.pos = {
                    left: getRangeRandom(hPosRangeLeftSecX),
                    top: getRangeRandom(hPosRangeY)
                };
            } else {          // 布局右边的图片
                image.pos = {
                    left: getRangeRandom(hPosRangeRightSecX),
                    top: getRangeRandom(hPosRangeY)
                };
            }
        });
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    },

    getInitialState: function () {
        return {
            imgsArrangeArr: [
                {
                    pos: {
                        left: 0,
                        top: 0
                    }
                }
            ]
        };
    },
    render: function () {
        var controllerUnits = [],
            imgFigures = [];
        imagesData.forEach(function (image, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    }
                };
            }
            imgFigures.push(<ImgFigure data={image} key={'img' + index} ref={'imageFigure' + index }
                                       arrange={this.state.imgsArrangeArr[index]}></ImgFigure>);
        }.bind(this));
        return (
            <section className="stage" ref="stage" id="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});
React.render(<ReactPhotoWallApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReactPhotoWallApp;
