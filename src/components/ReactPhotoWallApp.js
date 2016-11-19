'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

// 获取图片相关的数据
var imagesData = require('../data/imagesData.json');

// 将图片名信息转化成图片URL信息
imagesData = (function genImageURL(imagesDataArr) {
    for(var i = 0; i < imagesDataArr.length; i++){
        var singleImageData = imagesDataArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imagesDataArr = singleImageData;
    }
    return imagesDataArr;
})(imagesData);

var ReactPhotoWallApp = React.createClass({
  render: function() {
    return (
      <section className="stage">
          <section className="img-sec"></section>
          <nav className="controller-nav"></nav>
      </section>
    );
  }
});
React.render(<ReactPhotoWallApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReactPhotoWallApp;
