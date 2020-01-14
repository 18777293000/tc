var App = getApp();
Page({
  data: {
    type: 'getuserinfo'
  },
  onLoad: function (options) {
    this.setData({ type: options.type });
  },

  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg != 'getUserInfo:ok') {
      qq.showModal({
        title: '温馨提示',
        content: '你拒绝了授权登录,为了更好的为你提供服务,请重新进行登录',
      })
    } else {
      App.login(function () {
        qq.navigateBack();
      });

    }
  },
  /** 授权成功 跳转回原页面*/
  navigateBack: function () {
    var pages = getCurrentPages(); // 获取页面栈
    qq.navigateBack();
  },

})