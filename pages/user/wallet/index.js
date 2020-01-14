// pages/user/wallet/index.js
let App = getApp();
Page({
  data: {
    // height: qq.getSystemInfo().windowHeight,
    figure:true,
    money:"",
    types:"",
  },
  onLoad: function (options) {
   
  },

  figure(e){
    var that = this
    console.log(e)
    let type = e.currentTarget.dataset.type;
    let types = that.data.types;
    let money = that.data.money;

    if(type==1){
      money = "充值金额";
      types = 1;
    }else if(type==2){
      money = "提现金额";
      types = 2;
    }

    console.log(!that.data.figure)
    that.setData({
      money,
      types,
      figure: !that.data.figure
    })
  },
  confirm(e){
    var that = this
    that.setData({
      figure: !that.data.figure
    })
  },
  
})