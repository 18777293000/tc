dApp({
  //定义全局的域名变量
   Domain: 'https://pl.shipucm.cn',
  //  Domain: 'https://tc.commonts.cn',
  ApiUrl: '',
  /* 设置api地址 */
  setApiUrl: function () {
    this.ApiUrl = this.Domain + '/api/';
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    that.setApiUrl();
    that._post('common/init', {}, function (data, ret) {
      //console.log(data)
      that.globalData.config = data.data.config;
      //如果需要一进入小程序就要求授权登录,可在这里发起调用
      that.check(function (ret) { });
    }, function (data, ret) {
      that.showError(ret.msg);
    });
  },
  //判断是否登录
  check: function (cb) {
    var that = this;
    if (that.globalData.userInfo) {

      typeof cb == "function" && cb(that.globalData.userInfo);
    } else {
      this.login(cb);
      // qq.getSetting({
      //   success: function (res) {

      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称

      //       qq.getUserInfo({
      //         withCredentials: true,
      //         success: function (res) {
      //           that.login(cb);
      //         },
      //         fail: function () {
      //           that.showLoginModal(cb);
      //         }
      //       });
      //     } else {
      //       that.showLoginModal(cb);
      //     }
      //   },
      //   fail: function () {
      //     that.showLoginModal(cb);
      //   }
      // });
      // this.login(cb);
    }
  },
  //登录
  login: function (cb) {
    var that = this;

      var token = qq.getStorageSync('token') || '';

    
    //调用登录接口
    if(token == ''){
      return;
    }
    qq.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          qq.getUserInfo({
            success: function (ures) {
              qq.request({
                url: that.ApiUrl + 'user/qlogin',
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
                    //that.showLoginModal(cb);

                  }
                }
              });
            },
            fail: function (res) {
              //that.showLoginModal(cb);
            }
          });
        } else {
          //that.showLoginModal(cb);
        }
      }
    });
  },

  //显示登录或授权提示
  showLoginModal: function (cb) {
    var that = this;
    if (!that.globalData.userInfo) {
      //获取用户信息
      qq.getSetting({
        success: function (sres) {
          if (sres.authSetting['scope.userInfo']) {
            qq.showModal({
              title: '温馨提示',
              content: '当前无法获取到你的个人信息，部分操作可能受到限制',
              confirmText: "重新登录",
              cancelText: "暂不登录",
              success: function (res) {
                if (res.confirm) {
                  that.login(cb);
                } else {
                  that.showError('用户暂不登录');

                }
              }
            });
          } else {
            qq.showModal({
              title: '温馨提示',
              content: '当前无法获取到你的个人信息，部分操作可能受到限制',
              confirmText: "去授权",
              cancelText: "暂不授权",
              success: function (res) {
                if (res.confirm) {
                  qq.navigateTo({
                    url: '/pages/login/login?type=getuserinfo',
                  });
                  return false;
                  qq.openSetting({
                    success: function (sres) {
                      that.check(cb);
                    }
                  });
                } else {
                  that.showError('用户暂不授权');

                }
              }
            });
          }
        }
      })
    } else {
      typeof cb == "function" && cb(that.globalData.userInfo);
    }
  },
  //构造CDN地址
  cdnurl: function (url) {
    return url.toString().match(/^https?:\/\/(.*)/i) ? url : this.globalData.config.upload.cdnurl + url;
  },
  //失败提示
  showError: function (msg, callback) {
    qq.showModal({
      title: '温馨提示',
      content: msg,
      showCancel: false,
      success: function (res) {
        //callback && callback();
      }
    });
  },
  _post: function (url, data, success, fail, complete) {
    let App = this;

       data.token = qq.getStorageSync('token');

   
    
    qq.request({
      url: App.ApiUrl + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data: data,
      success: function (res) {

        if (res.data.code === 401) {
          App.check(App._post(url, data, success, fail, complete));
          return false;
        } else if (res.data.code === 0) {
          App.showError(res.data.msg, function () {
            fail && fail(res);
          });
          return false;
        }
        success && success(res.data);
      },
      fail: function (res) {
        App.showError(res.errMsg, function () {
          fail && fail(res);
        });
      },
      complete: function (res) {
        qq.hideLoading();
        qq.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },


  /**get请求*/
  _get: function (url, data, success, fail, complete) {
    qq.showNavigationBarLoading();
    let App = this;
    // 构造请求参数
    data = data || {};

    // 构造get请求
    let request = function () {
      
      data.token = qq.getStorageSync('token');

      qq.request({
        url: App.ApiUrl + url,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        success: function (res) {

          if (res.data.code === 401) {
            App.check(App._get(url, data, success, fail, complete));
            return false;
          } else if (res.data.code === 0) {
            App.showError(res.data.msg);
            return false;
          } else {
            success && success(res.data);
          }
        },
        fail: function (res) {
          App.showError(res.errMsg, function () {
            fail && fail(res);
          });
        },
        complete: function (res) {
          qq.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    request();
  },


  //全局信息
  globalData: {
    userInfo: null,
    config: null,
    id:null
    // lat:null,
    // lng:null,
  }
})

