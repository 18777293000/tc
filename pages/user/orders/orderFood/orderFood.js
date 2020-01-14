// pages/user/orders/orderFood/orderFood.js
const App = getApp();
Page({
  data: {
    currentTab: 0,
    navbar: ["全部", "待支付", "已支付", "待收货", "待评价"],
    dataType: 0,
    order: [],
    pay_type: '',
    goods: [
     
    ],
  },
  onLoad: function (options) {

    this.data.dataType = options.type || '0';
    this.setData({ dataType: this.data.dataType });
    this.getOrderList(this.data.dataType);
  },
  /** * 点击tab切换 */
  swichNav: function (e) {
    var that = this;
    let currentTab = that.data.currentTab;
    console.log(currentTab);
    //this.setData({ dataType: e.target.dataset.type });
    console.log(e.target.dataset.type);

    that.setData({
      currentTab: e.currentTarget.dataset.current,
      dataType: e.currentTarget.dataset.current,
    })
    // 获取订单列表
    this.getOrderList(e.currentTarget.dataset.current);
  },
  /**
  * 获取订单列表
  */
  getOrderList: function (dataType) {
    let _this = this;
    App._get('center/order/goodslists', { dataType }, function (result) {
      console.log(result);
      _this.setData({
        order: result.data,
      });
      console.log(11111)
      console.log(result.data);
      console.log(_this.data.order)
    });
  },

  //点击确认收货按钮
  sure: function (e) {
    console.log(e.currentTarget.dataset.name);

  },
  click: function (e) {
    var that = this;
    console.log(e);
    var order_id = e.currentTarget.dataset.orderid;
    var name = e.currentTarget.dataset.name;
    console.log(e)
    if (name == "去付款") {
      App._post('center/order/pays', { type: 4, id: order_id }, function (res) {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
        })
      })
    }
    else if (name == "确认收货") {
      App._post('center/order/receipt', { type: 4,id: order_id }, function (res) {
        console.log(res)
        that.onShow();
      })
    } else if (name == "去评论") {
      console.log("tiaozhuan")
      wx.navigateTo({
        url: "/pages/user/assess/assess?id=" + order_id
      })
    } else if (name == "申请退款") {
      wx.showLoading({
        title: '退款中',
        mask: true
      });
      App._post('center/order/refund', { type: 4, id: e.currentTarget.dataset.orderid }, function (res) {
        wx.hideLoading();
        if (res.code == 1) {
          setTimeout(() => {
            wx.showToast({
              title: '退款成功',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 2000)
          }, 200);
          that.onShow();
        }
      })
    }
  },
  //取消订单
  reset: function (e) {

    var that = this;
    console.log(e);
    App._post('/center/order/cancel', { type: 4, id: e.currentTarget.dataset.orderid }, function (res) {
      console.log(res)
      if (res.code == 1) {
        setTimeout(() => {
          wx.showToast({
            title: '取消成功',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 200);
        that.onShow();
      }
    })
  },
  onShow: function () {
    // 获取订单列表
    this.getOrderList(this.data.dataType);
  },
  xiang: function (e) {
    // 获取订单列表
    let id = e.currentTarget.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/user/orders/orderFood/xiang/xiang?id=' + id + "&types=4",
    })
  },
})