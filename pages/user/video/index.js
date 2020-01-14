// pages/user/personal/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    App._post("coupon/index/getCoupon?id=" + App.globalData.userInfo.id, {},      function(result) {

      console.log(result.data);
      that.setData({
        list: result.data,
      })
    });
    App._post("coupon/index/getPack2", {}, function (res) {
      console.log(1,res);
      that.setData({
        hongbao: res.data,
      })
    });
  },
  lq: function (e) {
    let that=this;
    let id = e.currentTarget.id;
    console.log(id)
    App._post("coupon/index/hasCoupon", { id: App.globalData.userInfo.id, cid:id}, function (result) {
      that.onShow();

    })
  },
  onShow: function () {
    // 获取订单列表
    this.onLoad();
  },
})