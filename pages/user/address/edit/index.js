// pages/user/address/edit/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedValue: 'true',
    id: '',
    detail: {},
    isdefault: '',
    flag: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      flag: options.flag,
    })

    App._post("center.address/detail", {
      id: options.id
    }, function (res) {
      console.log(res)
      that.setData({
        detail: res.data,
        id: res.data.id,
        isdefault: res.data.isdefault
      })
    })
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
    console.log(that.data.id)
    App._post('ajax/checkContent', { text: address + names + telephone + particular }, function (res) {
      console.log(res);
      App._post("center.address/edit", {
        name: names,
        mobile: telephone,
        area: address,
        detail: particular,
        isdefault: isdefault,
        id: that.data.id
      }, function (res) {
        console.log(res)
        qq.showToast({
          title: '修改成功',
        })
        if (that.data.flag == "") {
          qq.switchTab({
            url: '/pages/user/index',
          })
        } else {
          qq.navigateTo({
            url: '/pages/food/order/order',
          })
        }
      })
    });

  },
  delete(e) {
    console.log(e)
    var that = this
    App._post("center.address/del", {
      id: that.data.id
    }, function (res) {
      console.log(res)
      qq.showToast({
        title: '删除成功',
      })
      qq.switchTab({
        url: '/pages/user/index',
      })
    })
  },
})