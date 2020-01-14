// pages/cloth/cloth.js
let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // aaa:true,
    banner: "",
    //types:['洗衣服','洗鞋','洗家纺','其他'],
    types: "",
    currentTab: 0,
    dataType: 1,
    /**两个小圆点 */
    ifCloth: false, //衣物
    ifTotal: false, //总价
    total_price: 0, //总价
    /**衣物的假数据 */
    cloth: "",
    goods: {
      id: '',
      count: "",
    },
    goodsId: [],
    dataList: [],
    /****初始化购物车数量为0 */
    total: 0, //总数
    num: 0, //点击的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.dataType = options.type || '1';
    that.setData({
      dataType: this.data.dataType
    });
    App._get('dry/index/bannerList', {}, function(result) {
      console.log(result)
      that.setData({
        banner: result.data.bannerList
      })
    });
    /**请求页面数据 */
    App._get('dry/index/index', {
      dataType: 1
    }, function(result) {
      that.setData({
        types: result.data.list
      })
      console.log(result);
    })
  },
  /** * 点击tab切换 */
  swichNav: function(e) {
    var that = this;
    let currentTab = that.data.currentTab;
    that.setData({
      currentTab: e.currentTarget.dataset.current,
      dataType: e.currentTarget.dataset.type,
    })
    // 获取订单列表
    that.getOrderList(e.currentTarget.dataset.type);
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
    this.getOrderList(this.data.dataType);
  },
  /**
   *检查购物车中是否有本商品id
   */
  checkGoods: function(data) {
    var that = this;
    var list = this.data.dataList;
    if (list === undefined || list.length == 0) {
      list.push(data);
    } else {
      let res = this.checkGoodsId(data.goods_id);

      if (res == 2) {
        for (var i = 0; i < list.length; i++) {

          if (list[i].goods_id == data.goods_id) {
            list[i].count = list[i].count + 1;
            break;
          }
        }

      } else {
        list.push(data);

      }
    }
    return list;
  },
  /**
   *检查是否存在id
   */
  checkGoodsId: function(goods_id) {
    var that = this;
    var list = this.data.dataList;
    var result = '';
    let item = list.find(item => {
      return item.goods_id == goods_id;
    });

    if (item === undefined) {
      result = 1;
    } else {
      result = 2;
    }

    return result;

  },
  /*******************算加法 */
  addCount: function(event) {
    console.log(event);
    let datas = event.currentTarget.dataset;
    var index = event.currentTarget.dataset.index;
    var id = event.currentTarget.dataset.id;
    console.log(id);
    if (id == "" || id == undefined) return;
    let c = "cloth[" + index + "].count";
    let cloth = this.data.cloth;
    let item = cloth.find(function(v) {
      return v.id == datas.id
    })
    let countd = ++item.count;
    console.log(c);
    var totalPrice = parseInt(countd) * parseInt(event.currentTarget.dataset.price);
    console.log(countd, 333);
    console.log(event.currentTarget.dataset.price, 666);
    console.log(totalPrice, 999);
    // let that=this;
    var data = {
      'goods_id': event.currentTarget.dataset.id,
      'count': 1,
      'img': event.currentTarget.dataset.img,
      'price': event.currentTarget.dataset.price,
      "name": event.currentTarget.dataset.name,
      "totalPrice": totalPrice
    };
    var total = 0;
    let cart = this.checkGoods(data);
    console.log(cart);
    for (var i = 0; i < cart.length; i++) {

      total += parseInt(cart[i].count);
      //  console.log(cart[i].count);
    }
    //   console.log(total);
    this.setData({
      total: total,
      ifTotal: true,
      count: countd,
      [c]: countd,
      goodsId: cart,
    })
  },
  ///点击购物车
  shopping: function() {
    var model = JSON.stringify(this.data.goodsId);
    //  console.log(model)

    if (this.data.total == 0) {
      qq.showToast({
        title: '请选择物品',
      })
    } else {
      qq.navigateTo({
        url: 'details/details?model=' + model,
      })
    }


  },
  /**
   * 获取订单列表
   */
  getOrderList: function(dataType) {
    let that = this;
    App._get('dry/index/index', {
      dataType
    }, function(result) {
      console.log(result);
      //console.log(result.data.list[that.data.dataType - 1].child ,88888)
      if (result.data.list[that.data.dataType - 1].child !== "" && result.data.list[that.data.dataType - 1].child !== null && result.data.list[that.data.dataType - 1].child !== undefined){
        that.setData({
          cloth: result.data.list[that.data.dataType - 1].child
        })

      }else{
        that.setData({
          cloth: ""
        })

      }
     
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})