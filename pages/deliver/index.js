let App = getApp();
Page({
  data: {
    banner: [],
    deliver: [],
    title:[],
  },
  onShow: function () {
    //这里获得最近的商品数据 随机商品数据
    let that = this;
    App._get('express/deliver/index', {}, function (result) {
    //  console.log(result)
      that.setData({
        banner: result.data.bannerList,
        deliver: result.data.deliverList,
      });
      });
  },
 daiqu: function () {
    qq.navigateTo({
      url: '../pick/index'
    })
  },
  goMailing: function () {
    qq.navigateTo({
      url: '../express/index',
    })
  },

})