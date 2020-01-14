const App = getApp();

Page({
  data: {
    // banner轮播组件属性
    banner: [],
    menus: [],
    list:'',
    x:'',
    y:'',
    canIUse: qq.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    showModal: false,
    is_new: 1,
    hongbao: '',
    gou: '',
    price: 1,
    hb:''
  },
  onLoad: function () {
    let that = this;
    // 查看是否授权
    qq.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

             var token = qq.getStorageSync('token') || '';

          //调用登录接口
          qq.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求
                qq.getUserInfo({
                  success: function (ures) {
                    qq.request({
                      url: that.ApiUrl + 'user/login',
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
                          that.globalData.userInfo = response.data.userInfo;
                          qq.setStorageSync('token', response.data.userInfo.token);
                          typeof cb == "function" && cb(that.globalData.userInfo);
                        } else {
                          qq.setStorageSync('token', '');
                          that.showLoginModal(cb);

                        }
                      }
                    });
                  },
                  fail: function (res) {
                    that.showLoginModal(cb);
                  }
                });
              } else {
                that.showLoginModal(cb);
              }
            }
          });
        } else {

          that.setData({
            isHide: true
          });
        }
      }
    });

    App._get('index/index', {}, function (result) {
      console.log(result)
      that.setData({
        banner: result.data.bannerlist,
        menus: result.data.menu,
        hb: result.data.menu[2].status
      });
    });
    App._get("index/topStore",{},function(res){
      console.log(res)
      that.setData({
        list:res.data.list
      })
    });
    App._post("coupon/index/getPack", {}, function (res) {
      console.log(res)
      that.setData({
        hongbao: res.data,
      })
    });
    wx.checkSession({
      success: function () {
        setTimeout(function () {
          if (App.globalData.userInfo.is_new == 1) {
            that.setData({ //打开规则模块
              showModal: true
            });
          }
          console.log(App.globalData.userInfo.is_new)
        }, 1000)
      },
      fail() {
        that.setData({ //打开规则模块
          showModal: true,
          gou: 1
        });
      }
    })
  },
  details: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    qq.navigateTo({
      url: "../food/details/details?id=" + id,
    })
  },
  go:function(e){
    var urls = e.currentTarget.dataset.url
    qq.navigateTo({
      url: urls,
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      qq.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  next:function(){
    qq.navigateTo({
      url:"/pages/shoppingCar/shoppingCar"
    })
  },
  openrule: function() {
    wx.navigateTo({
      url: "/pages/index/hb/index"
    })
  },
  closerule: function() {
    
    this.setData({ //关闭规则模块
      showModal: false
    });
  },

  qg: function(e) {
    let that = this;
    let id = e.currentTarget.id;
    if (this.data.gou == 1) {
      wx.reLaunch({
        url: "/pages/user/index"
      })
    } else {
      App._post('coupon/index/qtake', {
        id: App.globalData.userInfo.id,
        pid: id,
        payPrice: that.data.price,
      }, function(res) {
        console.log(res.data)
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          'success': function(res) {
            App.globalData.userInfo.is_new= 0
            wx.showToast({
              title: '支付成功',
            })
            setTimeout(function() {
              wx.reLaunch({
                url: '/pages/index/index',
              })
             
            }, 1000)
          },
          'fail': function(res) {
            wx.showToast({
              title: '支付失败',
            })
          }
        })
      })
    }
  },
  onShow() {
    var that=this;
    setTimeout(function () {
      if (App.globalData.userInfo.is_new == 1) {
        that.setData({ //打开规则模块
          showModal: true
        });
      }
      console.log(App.globalData.userInfo.is_new)
    }, 1000)
  },
})