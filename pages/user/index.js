// pages/user/index.js
const App = getApp();
Page({
  data: {
    ismenu1: '',
    ismenu2: '',
    userinfo: [],
    ApiUrl: 'https://pl.shipucm.cn/api/',
    zt: 1,
    usereinfo: [],
  },
  onLoad: function (options) {
    var that = this;

    that.check();
    qq.request({
      url: 'https://pl.shipucm.cn/api/center/rule/rulelist',
      method: 'get',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          ismenu1: res.data.data.list[1].status,
          ismenu2: res.data.data.list[2].status
          // ismenu1: 1,
          // ismenu2: 1
        })
        console.log(that.data.ismenu1, that.data.ismenu2)
      }
    })
  },
  check: function (c) {
    var that = this;
    if (App.globalData.userInfo) {
      that.setData(
        {
          userinfo: App.globalData.userInfo,
          zt: 2
        }
      )
    }
  },
  bindGetUserInfo(res) {
    var that = this;

    var token = qq.getStorageSync('token') || '';

    //调用登录接口
    qq.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          qq.getUserInfo({
            success: function (ures) {
              qq.request({
                url: that.data.ApiUrl + 'user/qlogin',
                data: {
                  code: res.code,
                  rawData: ures.rawData,
                  token: token
                },
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                success: function (lres) {

                  var response = lres.data
                  if (response.code == 1) {
                    that.setData({
                      zt: 2,
                      usereinfo: response.data.userInfo,
                    })
                    App.globalData.userInfo = response.data.userInfo;
                    console.log(that.data.userinfo);
                    qq.setStorageSync('token', response.data.userInfo.token);
                    typeof cb == "function" && cb(App.globalData.userInfo);
                    wx.reLaunch({
                      url: '/pages/index/index'
                    })
                  } else {
                    qq.setStorageSync('token', '');
                  }
                }
              });
            },
          });
        }
      }
    });
  },
  detail(e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    console.log(e)
    qq.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  //快递订单
  order1(e) {
    qq.navigateTo({
      url: '/pages/user/orders/orders',
    })
  },

  //干洗订单
  order2(e) {
    qq.navigateTo({
      url: '/pages/user/orders/orderCloth/orderCloth',
    })
  },
  //送水订单
  order3(e) {
    qq.navigateTo({
      url: '/pages/user/orders/orderWater/orderWater',
    })
  },
  //外卖订单
  order4(e) {
    qq.navigateTo({
      url: "/pages/user/orders/orderFood/orderFood",
    })
  },
  coupon(e) {
    wx.navigateTo({
      url: "/pages/user/coupon/index?auth=" + App.globalData.userInfo.auth,
    })
  },
  gg() {
    let videoAd = qq.createRewardedVideoAd({ adUnitId: "fcb1d8ea49d78f1dfaeb7a83ca4f9ad5" })
    videoAd.onError(function (res) { console.log('videoAd onError', res) })
    videoAd.onLoad(function (res) { console.log('videoAd onLoad', res) })
    videoAd.onClose(function (res) {
      console.log('videoAd onClose', res)
      qq.navigateTo({
        url:"/pages/user/video/index"
      })
    })
    videoAd.load().then(() => {
      console.log('激励视频加载成功'); videoAd.show().then(() => {
        console.log('激励视频 广告显示成功')
      })
        .catch(err => { console.log('激励视频 广告显示失败') })
    })
      .catch(err => { console.log('激励视频加载失败'); })
  },
  dy() {
    qq.subscribeAppMsg({
      subscribe: true,
    })
  }
})