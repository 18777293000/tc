// pages/user/orders/orderCloth/orderCloth.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    navbar: ["全部", "已支付", "已收件"],
    dataType: 0,
    order: [],
    pay_type: '',
    goods: [
      {
        id: 0,
        name: "Fei语纪",
        state: "待发货",
        pic: '../../food/image/foods_05.png',
        decoration: "Fei家丝绸100cm大方巾搭旅游保暖围巾女百搭秋季",
        color: '白色',
        price: "￥23",
        count: "x1",
        num: "1",
        total: "￥23",
        res: "确认收货"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    console.log(dataType)
    App._get('center/order/drylists', { dataType }, function (result) {
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
      App._post('center/order/pays', { type: 2, id: e.currentTarget.dataset.orderid}, function (res) {
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
      App._post('center/order/receipt', { type: 2, id: e.currentTarget.dataset.orderid }, function (res) {
        console.log(res)
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
      App._post('center/order/refund', { type: 2, id: e.currentTarget.dataset.orderid }, function (res) {
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
    App._post('/center/order/cancel', { type: 2, id: e.currentTarget.dataset.orderid }, function (res) {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: '取消成功',
        })
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
    let types = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/user/orders/orderCloth/xiang/xiang?id=' + id + "&types=2",
    })
  },
})
