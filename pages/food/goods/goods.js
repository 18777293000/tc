// pages/food/goods/goods.js
const WxParse = require("../../../res/wxParse/wxParse.js");
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   goods_id:"",
   name:"",
   imange:"",
   price:"",
   content:"",
   line_price:"",
  seller_id:"",
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var options = options

    that.setData({
      goods_id: options.id,
      option: options
    })
    App._get('/food/shop/info', {
      goods_id: options.id
    }, function (res) {
      
      var name = res.data.detail.goods_name;
      var images = res.data.detail.images;
      var price = res.data.detail.spec[0].goods_price; 
     // var content = res.data.detail.content;
      //内容解析
      var content = res.data.detail.content;
      console.log(content);
      console.log(WxParse.wxParse('content', 'html', res.data.detail.content, that, 0));
      var seller_id = res.data.detail.seller_id
      var line_price= res.data.detail.spec[0].line_price;
      that.setData({
        name:name,
        images:images,
        price: price,
        //content:content,
       // content: WxParse.wxParse('content', 'html', content, that, 0),
        //content: WxParse.wxParse('content', 'html', res.data.detail.content, that, 0),
        seller_id: seller_id,
        line_price: line_price
      })
    })
  },
//加入购物车
  account: function () {
    var that = this;
    App._get("food/take/add", {     
      goods_count: 1,
      goods_id: that.data.goods_id,
      goods_price: that.data.price,
      line_price: that.data.line_price,
      seller_id: that.data.seller_id
    },function(res){
      var price = that.data.price;
      var line_price=that.data.line_price;
      qq.navigateTo({
        url: '../../food/order/order?lmoney' + line_price + '&money' +price,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
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

  }
})