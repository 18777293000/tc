let App = getApp();
var that;
Page({

  data: {
    source: '',
    address: '添加定位',
    texts: '',
    showView: true,
    pic: 'img/banner.jpg'

  },

  onLoad(options) {
    that = this;
    App._get("center/sign/index",{},function(res){   
      that.setData({
        list:res.data.list
      })
    })
  },
  
})