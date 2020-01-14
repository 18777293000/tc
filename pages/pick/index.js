const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // click:0
    sizes: [
      { 'id': '1', 'name': '小' },
      { 'id': '2', 'name': '中' },
      { 'id': '3', 'name': '大' },
      { 'id': '4', 'name': '特大' }
    ],

    station: [],
    indexs: 0,
    index: 0,
    size: '1',
    floor: '1',
    fastMail: '1',
    filePath: '',
    time: '12:01',//时间
    tsaddtime: '',//日期;  
    current: null,
    floors: [],
    findex: 0,
    fname: '',//楼层名称
    fprice: "",//楼层价格
    size: [],
    sindex: 0,
    sname: "",//尺寸名称
    size_price: "",//尺寸价格
    stations: [],
    kindex: 0,
    kname: "",
    station_price: "",//快递价格
    total: "",//总价
    card: '',
    id: '',
    youhui: 0,
    zongji: '',
    cid: '',
  },
  change: function () {
    console.log(1);
  },
  //计算佣金
  total: function () {
    var total = parseFloat(this.data.fprice) + parseFloat(this.data.size_price) + parseFloat(this.data.station_price);

    this.setData({
      total: total
    })
  },
  zongji: function () {
    var zongji = parseFloat(this.data.total) + parseFloat(this.data.youhui);

    this.setData({
      zongji: Math.round(zongji * 100) / 100
    })
  },

  bindTimeChange: function (e) {
    console.log(e.detail.value)
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

  bindtsaddtime(e) {
    console.log(e.detail.value)
    this.setData({
      tsaddtime: e.detail.value
    })
  },
  bindChoice(e) {
    console.log(e)
    // this.setData({
    //   click:1
    // }
    var btnId = e.currentTarget.dataset.id;
    qq.setStorage({
      key: 'itemId',
      data: btnId,
    })
    this.setData({
      size: btnId
    })
  },
  //请选择楼层
  bindFloorChange(e) {
    this.setData({
      findex: e.detail.value,
      fprice: this.data.floors[e.detail.value].price,
      fname: this.data.floors[e.detail.value].name,
    })
    console.log(this.data.fprice)
    this.total();
    this.zongji();
  },
  //选择尺寸
  bindSizeChange(e) {
    this.setData({
      sindex: e.detail.value,
      size_price: this.data.size[e.detail.value].price,
      sname: this.data.size[e.detail.value].name,
    })
    this.total();
    this.zongji();
  },
  //选择快递
  bindPickerChange(e) {
    console.log(e, 777)
    this.setData({
      kindex: e.detail.value,
      station_price: this.data.stations[e.detail.value].price,
      kname: this.data.stations[e.detail.value].name,
    })
    this.total();
    this.zongji();
  },
  aaa(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexs: e.detail.value
    })
  },
  bindChoice1(e) {

    var btnId1 = e.currentTarget.dataset.id;
    qq.setStorage({
      key: 'itemId',
      data: btnId1,
    })
    this.setData({
      floor: btnId1
    })
  },

  uploadimg: function (e) {
    var that = this;
    qq.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res, 1111);
        const tempFilePaths = res.tempFilePaths
        if (res.tempFiles[0].size < 6000) {
          qq.showToast({

            title: "图片格式错误！",
            icon: 'success',//图标，支持"success"、"loading" 
            image: '../img/xx.jpg',
            duration: 2000
          })
          return;
        }
        that.setData({
          filePath: tempFilePaths
        })
        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          //   formData: formData,
          success: function (res) {
            var data = JSON.parse(res.data);
            that.setData({
              card: data.data,
            })
          },
          error: function (e) {
            console.log(e);
          }
        });
      }

    })

  },

  formSubmit(e) { //表单提交
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    let that = this;
    //上传图片
    let filePath = that.data.card;
    e.detail.value.size = that.data.size;
    e.detail.value.floor = that.data.floor;
    var sendPickGoodsNumber = e.detail.value.gsPickGoodsNumber;//取货码
    var sendName = e.detail.value.gsName;//姓名
    var sendPhone = e.detail.value.gsPhone;//电话
    var sendAddress = e.detail.value.gsAdress;//送达地址
    //  var sendTime = e.detail.value.gsTime;//送货时间
    var a = that.data.tsaddtime;
    var b = that.data.time;
    var data_time = a + " " + b;
    var size = that.data.sname;//规格
    var floor = that.data.fname;//楼层
    var fastMail = that.data.kname;//快递点
    var sendMoney = e.detail.value.gsMoney;//佣金
    var sendqian = e.detail.value.gsqian;
    var remarks = e.detail.value.remarks;
    var cid = that.data.cid;
    if (sendName == '' || sendPhone == '' || sendAddress == '' || data_time == '' || sendMoney == '' || sendPickGoodsNumber == '') {
      qq.showToast({
        title: '请填写完整信息',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } else if (!(/^1\d{10}$/.test(sendPhone))) {
      qq.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } else {
      App._post('ajax/checkContent', { text: sendPickGoodsNumber + sendName + sendAddress + remarks }, function (res) {
        console.log(res);
        App._post('express/take/qindex', {
          take_code: sendPickGoodsNumber, sendname: sendName, sendphone: sendPhone, sendaddress: sendAddress, receipt_time: data_time, card: filePath, type: size, floor: floor, dot_id: fastMail, commission: sendqian, pay_price: sendMoney, remarks: remarks, cid: cid,
        }, function (result) {
          console.log(result);
          qq.requestPayment(
            {
              'timeStamp': result.data.timestamp,
              'nonceStr': result.data.nonceStr,
              'package': result.data.package,
              'signType': 'MD5',
              'paySign': result.data.paySign,
              'success': function (res) {
                console.log(res)
                qq.showToast({
                  title: '支付成功',
                })
                setTimeout(function () {
                  qq.switchTab({
                    url: '/pages/index/index',
                  })
                }, 3000)
              },
              'fail': function (res) { },
              'complete': function (res) { }
            })
        });
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var nums = [];
    //这里获得最近的商品数据 随机商品数据
    var that = this;
    App._get('express/dot/index', {

    }, function (result) {
      if (result.data.list == "" || result.data.list == null) {
        return false;
      }
      console.log(result.data.list);
      that.setData({
        station: result.data.list,
        fastMail: result.data.list[0].id
      });

    })

    for (var i = 1; i <= 50; i++) {
      var obj = {};
      obj.id = i;
      obj.name = i;
      nums.push(obj)
    }
    this.setData({
      sizes1: nums
    });
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
    let time = (Array(2).join(0) + (date.getHours() + 1)).slice(-2) + ':' + (Array(2).join(0) + date.getMinutes()).slice(-2);
    that.setData({
      date: currentdate,
      tsaddtime: currentdate,
      current: currentdate,
      time: time,
      currenttime: time
    });
    //获取楼层、快递、佣金
    App._get('express/take/spec', {}, function (result) {
      if (result.data.list.spec == "" || result.data.list.spec == null || result.data.list.floor == "" || result.data.list.floor == null || result.data.list.site == "" || result.data.list.site == null) {
        return false;
      }
      var total = parseFloat(result.data.list.floor[0].price) + parseFloat(result.data.list.site[0].price) + parseFloat(result.data.list.spec[0].price);
      var zongji = total;
      that.setData({
        floors: result.data.list.floor,
        size: result.data.list.site,
        stations: result.data.list.spec,
        fname: result.data.list.floor[0].name,
        sname: result.data.list.site[0].name,
        kname: result.data.list.spec[0].name,
        fprice: result.data.list.floor[0].price,
        size_price: result.data.list.site[0].price,
        station_price: result.data.list.spec[0].price,
        total: total,
        zongji: zongji,
      })
    })

  },
  openrule: function() {
    let that = this
    that.setData({ //打开规则模块
      showModal: true
    });
    App._post('coupon/index/getCoupon2', {
      id: App.globalData.userInfo.id,
      type: "0,1",
      price: that.data.total
    }, function(res) {
      that.setData({
        list: res.data,
      })
    })
  },
  closerule: function() {
    this.setData({ //关闭规则模块
      showModal: false,
      youhui: 0,
      cid:'',
    });
    this.zongji();
  },
  radioChange: function(e) {
    let that = this;
    var d = JSON.parse(e.detail.value)
    console.log("cid=", d)
    var cid = d.id;
    var youhui = d.amount;
    that.setData({
      youhui: -youhui,
      cid: cid,
      showModal: false,
    })
    this.zongji();
  },



})