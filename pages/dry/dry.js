let App = getApp();
Page({
  data: {
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    info: '',
    index: 0,
    // multiIndex: [0, 0, 0],
    date: '年 - 月 - 日',
    time: '11:30',
    time1: '17:00',
    price: '',
    shi: '',
    tsaddtime: '',
    money: 0,
    youhui: 0,
    zongji: '',
    cid: '',
  },
  onLoad: function (e) {
    var that = this
    App._get("water/index/index", {}, function (res) {
      console.log(res)
      that.setData({
        info: res.data.info,
        price: res.data.info.price,
        money: res.data.info.price,
        zongji: res.data.info.price,
      })
    })

    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1; date
    var strDate = date.getDate();
    var hours = date.getHours();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    that.setData({
      tsaddtime: currentdate,
      shi: hours
    })
  },
  bindtsaddtime(e) {
    console.log(e.detail.value)
    this.setData({
      tsaddtime: e.detail.value
    })
  },
  /* 点击减号 */
  bindMinus: function (e) {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var money = this.data.money;
    var price = num * this.data.money;
    // 如果大于1时，才可以减  

    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      price: price,
      zongji: price
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var num = this.data.num;
    num++;
    // console.log(1111);
    //var price = num* 25;
    var money = this.data.money;
    var price = num * this.data.money;
    // 不作过多考虑自增1  

    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      price: price,
      zongji: price,
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // var price = num * 25;
    var money = this.data.money;
    var price = num * this.data.money;
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var a = e.detail.value;
    var b = a.split("-");
    // console.log(b);
    b[0] = b[0] + "-";
    b[1] = b[1] + "-";
    b[2] = b[2];
    // console.log(b);
    var c = b.join("");
    //  console.log(c);
    this.setData({
      dates: c
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  formSubmit: function (e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    console.log(e);
    //console.log(that.data.dates,666)
    var id = e.currentTarget.dataset.id
    var a = that.data.tsaddtime;
    var b = that.data.time;
    var data_time = a + " " + b;
    console.log(data_time)
    var address = e.detail.value.address;
    var location = e.detail.value.location
    var phone = e.detail.value.phone;
    var remark = e.detail.value.remark;
    var price = this.data.price;
    var reg = /^1\d{10}$/;
    var username = e.detail.value.username;
    var cid = this.data.cid;
    var pay_price = this.data.zongji;
    if (!reg.test(phone)) {
      qq.showToast({
        title: '请填写手机号',
      })
      return false
    } if (username == "") {
      qq.showToast({
        title: '联系人不能为空',
      })
      return false
    } else {
      App._post('ajax/checkContent', { text: address + location + remark + username }, function (res) {
        console.log(res);
        App._post("water/index/qtake", {
          id: id,
          receipt_time: data_time,
          price: price,
          area: location,
          address: address,
          phone: phone,
          remark: remark,
          count: that.data.num,
          username: username,
          cid: cid,
          pay_price: pay_price,
        }, function (res) {
          console.log(that.data.num)
          console.log(res)
          qq.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            'success': function (res) {
              qq.showToast({
                title: '支付成功',
              })
              setTimeout(function () {
                qq.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000)
            },
            'fail': function (res) {
              qq.showToast({
                title: '支付失败',
              })
              setTimeout(function () {
                qq.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000)
            }
          })
        },
        )
      });

    }

  },
  openrule: function () {
    let that = this
    that.setData({ //打开规则模块
      showModal: true
    });
    App._post('coupon/index/getCoupon2', {
      id: App.globalData.userInfo.id,
      type: "0,3",
      price: that.data.price
    }, function (res) {
      that.setData({
        list1: res.data,
      })
    })
  },

  radioChange: function (e) {
    var d = JSON.parse(e.detail.value)
    console.log("cid=", d)
    var cid = d.id;
    var youhui = d.amount;
    this.setData({
      youhui: -youhui,
      cid: cid,
      showModal: false,
    })
    this.zongji();
  },
  zongji: function () {
    var zongji = parseFloat(this.data.price) + parseFloat(this.data.youhui);
    this.setData({
      zongji: Math.round(zongji * 100) / 100
    })
  },
  closerule: function () {
    this.setData({ //关闭规则模块
      showModal: false,
      youhui: 0,
      cid: '',
    });
    this.zongji();
  },
})