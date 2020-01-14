// pages/cloth/details/details.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // input默认是1  
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    total: 0,
    // multiIndex: [0, 0, 0],
    tsaddtime: '',
    time: '20:00',
    list: [],
    datas: [],
    data: {},
    youhui: 0,
    zongji: '',
    cid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var data = JSON.parse(options.model);
    this.setData({
      list: data,
    })
    var totals = 0;
    var total2 = 0;
    var lists = this.data.list;
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
    for (var i = 0; i < lists.length; i++) {
      totals += (parseFloat(lists[i].price)) * (parseInt(lists[i].count))
    }
    total2 = totals.toFixed(2)
    console.log(totals);
    this.setData({
      total: total2,
      zongji: total2,
      tsaddtime: currentdate
    })
    console.log(this.data.list);
  },
  /* 点击减号 */
  bindMinus: function(e) {
    console.log(e);
    let datas = e.currentTarget.dataset;
    var count = datas.count;
    var index = datas.index;
    var list = this.data.list;
    console.log(list);
    var c = "list[" + index + "].count";
    console.log(count);
    if (count > 0) {
      var counts = Number(count);
      var counted = --counts;
      console.log(index, 888)
      this.setData({
        [c]: counted
      })
    } else if (count == 0) {
      return false;
    };
    // var totals = 0;
    // for (var i = 0; i < list.length; i++) {
    //   totals += (parseFloat(list[i].price).toFixed(2)) * (parseInt(list[i].count).toFixed(2))
    // }
    // this.setData({
    //   total: totals
    // })
    var totals = 0;
    var total2 = 0;
    var goods_id = this.data.data.goods_id

    var goods_num = this.data.data.goods_num
    var goods_price = Math.pow((parseFloat(this.data.data.goods_price).toFixed(2)), 1);

    var arrs = {};
    for (let i = 0; i < list.length; i++) {
      totals += (parseFloat(list[i].price).toFixed(2)) * (parseInt(list[i].count).toFixed(2))
      goods_id = list[i].goods_id
      goods_num = list[i].count
      goods_price = parseFloat(list[i].price).toFixed(2)
      console.log(goods_id, goods_num, goods_price)
    }
    total2 = totals.toFixed(2);
    arrs = {
      'goods_id': goods_id,
      'goods_num': goods_num,
      'goods_price': goods_price,
    };

    this.setData({
      total: total2,
      zongji: total2,
      data: arrs
    })
    console.log(totals);
    if (this.data.total == 0) {
      qq.showModal({
        title: '提示',
        content: '请请前往店铺选择衣物',
        success: function(res) {
          if (res.confirm) {
            qq.navigateTo({
              url: '/pages/cloth/cloth',
            })
          } else {
            console.log('弹框后点取消')
          }
        }
      })
    }
  },
  /* 点击加号 */
  bindPlus: function(e) {
    console.log(e);
    let datas = e.currentTarget.dataset;
    var count = datas.count;
    if (count == "undefined") {
      count = 1;
    }
    var index = datas.index;
    var list = this.data.list;
    console.log(list);
    var counts = Number(count);
    var counted = ++counts;
    let c = "list[" + index + "].count";
    console.log(counted)
    console.log(c);
    this.setData({
      [c]: counted
    })
    var totals = 0;
    var total2 = 0;
    var goods_id = this.data.data.goods_id

    var goods_num = this.data.data.goods_num
    // var goods_price = Math.round((parseFloat(this.data.data.goods_price).toFixed(2))*10)/10;
    var goods_price = (parseFloat(this.data.data.goods_price).toPrecision(12))
    var arrs = {};
    for (let i = 0; i < list.length; i++) {
      totals += (parseFloat(list[i].price).toFixed(2)) * (parseInt(list[i].count).toFixed(2));
      goods_id = list[i].goods_id;
      goods_num = parseInt(list[i].count);
      goods_price = parseFloat(list[i].price).toFixed(2);
      console.log(goods_id, goods_num, goods_price)

    }
    total2 = totals.toFixed(2);
    arrs = {
      'goods_id': goods_id,
      'goods_num': goods_num,
      'goods_price': goods_price,
    };
    this.setData({
      total: total2,
      zongji: total2,
      data: arrs
    })
  },
  /* 输入框事件 */
  bindManual: function(e) {
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
  bindtsaddtime(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tsaddtime: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function(e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    
    // var id = e.currentTarget.dataset.id
    var a = that.data.tsaddtime;
    // console.log(a)
    var b = that.data.time;
    var data_time = a + " " + b;
    var data_time = a + " " + b;
    var address = e.detail.value.address;
    var location = e.detail.value.location
    var phone = e.detail.value.phone;
    var username = e.detail.value.username
    var remark = e.detail.value.remark;
    var price = e.detail.value.price;
    var data = this.data.list;
    var total = this.data.total;
    var cid = this.data.cid;
    var pay_price = this.data.zongji;
    console.log(data)
   
    var arrsd = {
      'receipt_time': data_time,
      'total_price': total,
      'area': location,
      'address': address,
      'phone': phone,
      'username': username,
      'remark': remark,
      'data': data,
      'cid': cid,
      'pay_price': pay_price,
    }
    console.log(arrsd)
    var arrs = JSON.stringify(arrsd);
    var reg = /^1\d{10}$/;
    if (this.data.total == 0) {
      qq.showModal({
        title: '提示',
        content: '请前往店铺选择衣物',
        success: function(res) {
          if (res.confirm) {
            qq.navigateTo({
              url: '/pages/cloth/cloth',
            })
          } else {

          }
        }
      })
    } else if (this.data.tsaddtime == '20xx年xx月xx日') {
      qq.showToast({
        title: '请选择正确时间',
      })
      return false
    } else if (!reg.test(phone)) {
      qq.showToast({
        title: '请填写手机号',
      })
      return false
    } else {
      console.log(arrs)
      App._post('ajax/checkContent', { text: arrs}, function(res){
console.log(res);
App._post("dry/index/qtake",{arrs:arrs}, function(res) {
        console.log(res);
        qq.requestPayment({
           timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          'success': function(res) {
            qq.showToast({
              title: '支付成功',
            })
            setTimeout(function(){
              qq.switchTab({
                url: '/pages/index/index',
              })
            },1000)
          },
          'fail': function(res) {
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
      })
});
      
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
onShareAppMessage: function() {

  },
  openrule: function() {
    let that = this
    that.setData({ //打开规则模块
      showModal: true
    });
    App._post('coupon/index/getCoupon2', {
      id: App.globalData.userInfo.id,
      type: "0,2",
      price: that.data.total
    }, function(res) {
      that.setData({
        list1: res.data,
      })
    })
  },

  radioChange: function(e) {
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
  zongji: function() {
    var zongji = parseFloat(this.data.total) + parseFloat(this.data.youhui);
    this.setData({
      zongji: Math.round(zongji * 100) / 100
    })
  },
  closerule: function() {
    this.setData({ //关闭规则模块
      showModal: false,
      youhui: 0,
    });
    this.zongji();
  },
})