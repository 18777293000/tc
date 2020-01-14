// pages/food/order/order.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    tel: "",
    addr: "",
    goods_list: [],
    store: "",
    total: 0,
    redu: 0,
    texts: '', //备注
    logistics: 0,
    packing: 0,
    seller_id: '',
    time: "",
    address_id: '',
    youhui: 0,
    zongji: '',
    cid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("aaaaaaaaaaaaa");
    App._get('food/take/address', {}, function (res) {
      console.log(res);
      if (res.data.detail == "" || res.data.detail == null) {
        qq.showToast({
          title: '请先设置收货地址',
        })
        qq.navigateTo({
          url: "/pages/user/address/add/index",
        })
      } else {
        that.setData({
          name: res.data.detail.name,
          tel: res.data.detail.mobile,
          addr: res.data.detail.area + res.data.detail.detail,
          address_id: res.data.detail.id
        })
      }
    })
    App._get('food/take/getLists', {}, function (res) {
      if (res.data == "" || res.data == null) {
        return false
      } else {
        that.setData({
          goods_list: res.data.goodsList,
          store: res.data.info.store_name,
          logistics: res.data.info.logistics,
          packing: res.data.info.packing,
          seller_id: res.data.info.seller_id,
          time: res.data.info.delivery
        })
        var price = 0;
        var lprice = 0;
        for (var i = 0; i < res.data.goodsList.length; i++) {
          price += (res.data.goodsList[i].goods_price) * (res.data.goodsList[i].count)
          lprice += (res.data.goodsList[i].line_price) * (res.data.goodsList[i].count)
        }
        console.log(lprice);
        var redu = lprice - price;
        var prices = parseFloat(price) + parseFloat(res.data.info.logistics) + parseFloat(res.data.info.packing);

        console.log(redu);
        that.setData({
          total: prices.toFixed(2),
          zongji: prices.toFixed(2),
          redu: redu
        });
      }

    })
  },


  //加法
  addCount(e) {
    var that = this;
    console.log(e)
    var datas = e.currentTarget.dataset
    var count = e.currentTarget.dataset.count
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var lprice = e.currentTarget.dataset.lprice
    var mprice = e.currentTarget.dataset.mprice
    var lists = that.data.goods_list;
    var spec_sku_id = e.currentTarget.dataset.spec
    App._get("food/take/add", {
      goods_count: 1,
      goods_id: id,
      goods_price: mprice,
      line_price: lprice,
      seller_id: this.data.seller_id,
      spec_sku_id: spec_sku_id

    }, function (res) {
      that.onShow();
    })
  },
  //减法
  minusCount(e) {
    var that = this;
    console.log(e)
    var datas = e.currentTarget.dataset
    var count = e.currentTarget.dataset.count
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var lprice = e.currentTarget.dataset.lprice
    var mprice = e.currentTarget.dataset.mprice
    var lists = that.data.goods_list;
    var spec_sku_id = e.currentTarget.dataset.spec
    console.log(lists);
    console.log(this.data.goods_list);

    if (count == 0) {
      console.log("kosdkao")
      var goods = that.data.goods_list.splice(index, 1);
      this.onShow();
      console.log(goods);
      that.setData({
        goods_list: goods
      })
      return false
    }
    App._get("food/take/sub", {
      goods_count: 1,
      goods_id: id,
      goods_price: mprice,
      line_price: lprice,
      seller_id: that.data.seller_id,
      spec_sku_id: spec_sku_id
    }, function (res) {
      console.log(res);
      console.log(res);
      if (res.msg.cart_total_num == 0) {
        console.log("已经没有数据了")
        qq.showModal({
          title: '提示',
          content: '请请前往店铺选择商品',
          success: function (res) {
            if (res.confirm) {
              qq.navigateTo({
                url: '/pages/food/details/details?id=' + that.data.seller_id,
              })
            } else {
              qq.navigateTo({
                url: '/pages/food/details/details?id=' + that.data.seller_id,
              })
            }
          }
        })
      } else {
        that.onShow();
      }
    })
  },

  //文本域失焦事件
  change: function (e) {
    console.log(e);
    var texts = e.detail.value;
    this.setData({
      texts: texts
    })
  },
  ///去结算
  total: function () {
    //App._get('food/take/clear')
    let that = this;
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    console.log(this.data.texts);
    // if()
    if (this.data.address_id == "" || this.data.address_id == null) {
      qq.showToast({
        title: "地址不能为空",
      })
      return false
    }
    App._post('ajax/checkContent', {
      text: this.data.texts
    }, function (res) {
      App._get('food/take/qindex', {
        remarks: that.data.texts, // 备注
        packing: that.data.packing, // 包装费
        delivery: that.data.logistics, // 配送费  //
        address_id: that.data.address_id,
        cid: that.data.cid,
      }, function (res) {
        console.log(res, 3333338)
        qq.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          'success': function (res) {
            App._get('food/take/clear')
            qq.showToast({
              title: '支付成功',
            })
            setTimeout(function () {
              qq.navigateBack({
                delta: 1
              })
            }, 1000)

          },
          'fail': function (res) {
            App._get('food/take/clear')
            qq.showToast({
              title: '支付失败',
            })
            setTimeout(function () {
              qq.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      })
    });
  },
  jump(e) {
    qq.navigateTo({
      url: '/pages/user/address/index?flag=1',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    App._get('food/take/getLists', {}, function (res) {
      if (res.data == "" || res.data == null) {
        return false
      } else {
        that.setData({
          goods_list: res.data.goodsList,
        })
        var price = 0;
        var lprice = 0;
        for (var i = 0; i < res.data.goodsList.length; i++) {
          price += (res.data.goodsList[i].goods_price) * (res.data.goodsList[i].count)
          lprice += (res.data.goodsList[i].line_price) * (res.data.goodsList[i].count)
        }
        var redu = lprice - price;
        var prices = parseFloat(price) + parseFloat(res.data.info.logistics) + parseFloat(res.data.info.packing);

        console.log(redu, 55656);
        that.setData({
          total: prices.toFixed(2),
          zongji: prices.toFixed(2),
          redu: redu
        });
      }

    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  openrule: function () {
    let that = this
    that.setData({ //打开规则模块
      showModal: true
    });
    App._post('coupon/index/getCoupon2', {
      id: App.globalData.userInfo.id,
      type: "0,4",
      price: that.data.total
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
      youhui: youhui,
      cid: cid,
      showModal: false,
    })
    this.zongji();
  },
  zongji: function () {
    var zongji = parseFloat(this.data.total) - parseFloat(this.data.youhui);
    this.setData({
      zongji: (Math.round(zongji * 100) / 100).toFixed(2)
    })
  },
  closerule: function () {
    this.setData({ //关闭规则模块
      showModal: false,
      youhui: 0,
      cid:'',
    });
    this.zongji();
  },
})