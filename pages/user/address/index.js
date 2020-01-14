// pages/user/address/index.js
let App = getApp()
Page({
  data: {
    flag:'',
  },
  onLoad: function (option) {
    var that = this
    console.log(option)
    if(option.flag){
      that.setData({
        flag: option.flag
      })
    }
    App._post("center.address/lists",{},function(res){
      console.log(res)
      that.setData({
        list:res.data.list
      })
    })
  },
  add(e){
    qq.navigateTo({
      url: '/pages/user/address/add/index',
    })
  },
  edit(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    qq.navigateTo({
      url: '/pages/user/address/edit/index?id='+id + '&flag='+ this.data.flag,
    })
  },
})