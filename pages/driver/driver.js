// pages/driving/driving.js
let App = getApp();
Page({
  //页面的初始数据
  data: {
    content:'',
    banner1:"",
    banner2: ""
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this
    App._get("driver/index/index",{},function(res){
      console.log(res)
      that.setData({
        content:res.data.list
      })
    })
  },

  apply(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    qq.navigateTo({
      url: '/pages/driver/apply/apply?id='+id,
    })
  },

  order(e) {
    qq.navigateTo({
      url: '/pages/driver/order/order',
    })
  }
})