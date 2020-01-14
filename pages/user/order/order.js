// pages/user/order/order.js
const App=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    navbar: ["全部","待付款","待收货","待评价"],
    dataType:0,
    order:[],
    pay_type:'',
    goods: [
      {
        id: 0,
       name: "Fei语纪",
       state:"待发货",
        pic: '../../food/image/foods_05.png',
        decoration:"Fei家丝绸100cm大方巾搭旅游保暖围巾女百搭秋季",
        color:'白色',
        price:"￥23",
        count:"x1",
        num: "1",
        total: "￥23",
        res: "确认收货"
      }
    ],
  },
  onLoad: function (options) {
    
    this.data.dataType = options.type || '0';
    this.setData({ dataType: this.data.dataType });
  },
  /** * 点击tab切换 */
  swichNav: function (e) {
    var that = this;
    let currentTab = that.data.currentTab;
    console.log(currentTab);
    console.log(e.target.dataset.type );

    that.setData({
      currentTab : e.currentTarget.dataset.current,
      dataType: e.currentTarget.dataset.current,
    })
    // 获取订单列表
    this.getOrderList(e.currentTarget.dataset.current,);
  },
  /**
  * 获取订单列表
  */
  getOrderList: function (dataType) {
    let _this = this;
    console.log(dataType)
    App._get('center/order/lists', { dataType }, function (result) {
      console.log(result);
      _this.setData({
        order:result.data,
      });
      console.log(11111)
      console.log(result.data)
    });
  },

//点击确认收货按钮
sure:function(e){
  console.log(e.currentTarget.dataset.name);
},
click:function(e){
  console.log(e);
  var order_id = e.currentTarget.dataset.orderid;
  var name = e.currentTarget.dataset.name;
  console.log(e)
  if(name=="去付款"){
    App._post('center/order/qpay', {order_id}, function (res) {
      console.log(res)
      qq.requestPayment({
        timeStamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
      })
    })
  }
  else if (name == "确认收货") {
    App._post('center/order/receipt',{order_id},function(res){
        console.log(res)
    })
  } else if (name == "去评论") { 
     console.log("tiaozhuan")
    qq.navigateTo({
      url: "/pages/user/assess/assess?id=" + order_id
    })
  }
},
  onShow: function () {
    // 获取订单列表
    this.getOrderList(this.data.dataType);
  },
})