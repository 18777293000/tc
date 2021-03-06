const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    types: '',
    list: '',
    youhui: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id,
      types: options.types,
    })

    App._post('center/order/orderInfo', { id: that.data.id, type: that.data.types }, function (res) {
      that.setData({
        list: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  pj: function (e) {
    // 获取订单列表
    wx.navigateTo({
      url: "/pages/user/assess/assess?id=" + this.data.id
    })
  },

})