// pages/user/index.js
let App = getApp()
Page({
  data: {
    list:'',
  },
  onLoad: function (options) {
    var that = this
    if (!App.globalData.userInfo) {
      /*App.showError("请登录后再操作", function () {
        App.login();
      });*/
    }else{
     App._post("relevant/index", {}, function (res) {
       console.log(res)
       if(res.data.list){
         that.setData({
           list: res.data.list,
         });
       }
    })
    }
   
  },
  onShow: function (options) {
    var that = this
    if (!App.globalData.userInfo) {
      /*App.showError("请登录后再操作", function () {
        App.login();
      });*/
    } else {
      App._post("relevant/index", {}, function (res) {
        console.log(res)
        that.setData({
          list: res.data.list
        })
      })
    }

  },
})