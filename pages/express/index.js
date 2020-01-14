let App = getApp();
Page({
  data: {
    disabled: false,
    station: [],
    index: 0,
    fastMail: '',
    time: '10:00',//时间
    tsaddtime: '',//日期;
    current: null,
    currenttime: null
  },

  onLoad: function (res) {
    //这里获得最近的商品数据 随机商品数据
    var that = this;
    App._get('express/dot/index', {
    }, function (result) {
      if (result.data.list == "" || result.data.list == null) {
        return false
      }
      that.setData({
        station: result.data.list,
        fastMail: result.data.list[0].id
      });

    })

    //获取系统时间
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();

    var month = date.getMonth() + 1; date
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    let time = (Array(2).join(0) + (date.getHours()+1)).slice(-2) + ':' + (Array(2).join(0) + date.getMinutes()).slice(-2);
    that.setData({
      date: currentdate,
      tsaddtime: currentdate,
      current: currentdate,
      time: time,
      currenttime: time
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    var price = num * 25;
    // 将数值与状态写回  
    this.setData({
      num: num,
      price: price
    });
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log(e.detail.value)
    this.setData({
      tsaddtime: e.detail.value
    })
  },
  bindtsaddtime(e) {
    console.log(e.detail.value)
    this.setData({
      tsaddtime: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.current == this.data.tsaddtime && e.detail.value < this.data.currenttime) {
      this.setData({
        time: this.data.currenttime
      })
      return;
    }
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.setData({ disabled: true })
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }

    let _this = this;
    var sendname = e.detail.value.sendname;//寄件人姓名
    var sendphone = e.detail.value.sendphone;//寄件人联系方式
    var post = e.detail.value.post;//选用快递
    var weigh = e.detail.value.weigh;//物体重量
    //var receipt_time = this.data.date //预约时间
    var a = this.data.tsaddtime;
    var b = this.data.time;
    var receipt_time = a + " " + b;
    var sendaddress = e.detail.value.sendaddress

    if (sendname == '' || sendphone == '' || sendaddress == '' || weigh == '' || receipt_time == '') {
      qq.showToast({
        title: '请填写完整信息',
        duration: 2000,
        icon: 'none'
      });
      this.setData({ disabled: false })
      return false;
    } else if (!(/^1\d{10}$/.test(e.detail.value.sendphone))) {
      qq.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      this.setData({ disabled: false })
      return false;
    } else {
      App._post('ajax/checkContent', { text: sendname + sendaddress + weigh }, function (res) {
        console.log(res);
        App._post('express/delivery/index', {
          sendname: e.detail.value.sendname,//寄件人姓名
          sendphone: e.detail.value.sendphone,//寄件人联系方式
          dot_id: e.detail.value.post,//选用快递
          num: e.detail.value.weigh,//物重
          receipt_time: receipt_time, //预约时间
          sendaddress: sendaddress
        }, function (result) {
          if (result.code !== 1) {
            setTimeout(() => {
              wx.showToast({
                title: '提交失败!',
                icon: 'fail',
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
            this.setData({ disabled: false })
          }
          else {
            setTimeout(() => {
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                success: function () {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                }
              });
              setTimeout(() => {
                wx.hideToast();
              }, 2000)
            }, 0);
            // qq.showToast({
            //   title: '提交成功！',
            //   icon: 'success',
            //   duration: 1500,
            //   success(data) {
            //     setTimeout(function () {
            //       qq.switchTab({
            //         url: '/pages/index/index',
            //       })
            //     }, 1000)
            //   }
            // })
          }
        });
      });

    }
  },


})
