// pages/user/orders/orderCloth/orderCloth.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    navbar: ["已领取", "已过期"],
    dataType: 0,
    order: [],
    pay_type: '',
    list: '',
    list1: '',
    auth:'',
    qs:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    that.setData({
      auth:options.auth
    })
    App._get("coupon/index/is_runner",{id:App.globalData.userInfo.id}, function (res) {
      that.setData({
        qs:res.data
      })
    })
    console.log("1=",that.data.qs)
    App._post("coupon/index/getHasCoupon?id=" + App.globalData.userInfo.id, {}, function(result) {

      console.log(result.data);
      that.setData({
        list: result.data,
      })
    })
    App._post("coupon/index/getEXPCoupon?id=" + App.globalData.userInfo.id, {}, function (result) {

      console.log(result.data);
      that.setData({
        list1: result.data,
      })
    })
  },
  /** * 点击tab切换 */
  swichNav: function(e) {
    var that = this;
    let currentTab = that.data.currentTab;
    console.log(currentTab);
    //this.setData({ dataType: e.target.dataset.type });
    console.log(e.target.dataset.type);

    that.setData({
      currentTab: e.currentTarget.dataset.current,
      dataType: e.currentTarget.dataset.current,
    })
  },

  onShow: function() {
    // 获取订单列表

  },
  rule: function(e) {
    wx: wx.navigateTo({
      url: '/pages/user/coupon/rule/rule',
    })
  },
  index: function(e) {
    wx: wx.switchTab({
      url: '/pages/index/index',
    })
  },
  deliver: function(e) {
    wx: wx.navigateTo({
      url: '/pages/deliver/index',
    })
  },
  cloth: function(e) {
    wx: wx.navigateTo({
      url: '/pages/cloth/cloth',
    })
  },
  dry: function(e) {
    wx: wx.navigateTo({
      url: '/pages/dry/dry',
    })
  },
  food: function(e) {
    wx: wx.navigateTo({
      url: '/pages/food/food',
    })
  },
  index1: function (e) {
    wx.showToast({
      title: '请先认证',
    })
  },
  renz: function() {
    wx.navigateTo({
      url: "/pages/user/attestation/index"
    })
  },
  qs: function() {
    wx.navigateTo({
      url: "/pages/user/enter/errand/index"
    })
  },
})