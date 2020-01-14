// pages/user/address/add/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedValue: 'true',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  switchChange: function (event) {
    var that = this
    //得到值
    var checkedValue = event.detail.value;
    that.setData({
      checkedValue: checkedValue
    })
  },



  formSubmit(e) {
    console.log(e)
    var that = this
    var address = e.detail.value.address
    var names = e.detail.value.names
    var telephone = e.detail.value.telephone
    var particular = e.detail.value.particular
    var isdefault = that.data.checkedValue
    console.log(that.data.checkedValue)
    App._post('ajax/checkContent', { text: address + names + telephone + particular }, function (res) {
      console.log(res);
      App._post("center.address/add", {
        name: names,
        mobile: telephone,
        area: address,
        detail: particular,
        isdefault: isdefault
      }, function (res) {
        qq.showToast({
          title: '添加成功-',
        })
        qq.switchTab({
          url: '/pages/user/index',
        })
      })
    });

  },
})