// pages/food/buy/order.js
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
    texts: '',//备注
    logistics: 0,
    packing: 0,
    seller_id: '',
    time: "",
    address_id: '',
    board_id:"",

  },

  /**s
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    var that = this;
    that.setData({
      board_id: options.id
    })
    
    App._get('food/store/getLists', {}, function (res) {
      if (res.data == "" || res.data == null) {
        that.setData({
          seller_id: res.data.info.seller_id,
        })
        return false
      } else {
        that.setData({
          goods_list: res.data.goodsList,
          store: res.data.info.store_name,
        //  logistics: res.data.info.logistics,
         // packing: res.data.info.packing,
          seller_id: res.data.info.seller_id,
          //time: res.data.info.delivery
        })
       
        var price = 0;
        var lprice = 0;


        for (var i = 0; i < res.data.goodsList.length; i++) {
          price += (res.data.goodsList[i].goods_price) * (res.data.goodsList[i].count)
        }
        price = parseFloat(price)  ;
       
        that.setData({
          total: price,
          
        });
      }

    })
  },


  //加法
  addCount(e) {
    var that = this;
   
    var datas = e.currentTarget.dataset
    var count = e.currentTarget.dataset.count
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
   // var lprice = e.currentTarget.dataset.lprice
    var mprice = e.currentTarget.dataset.mprice
    var lists = that.data.goods_list;
    var spec_sku_id = e.currentTarget.dataset.spec
    App._post("food/store/add", {
      goods_count: 1,
      goods_id: id,
      goods_price: mprice,
      seller_id: that.data.seller_id,
      spec_sku_id: spec_sku_id

    }, function (res) {
      that.onShow();
    })
  },
  //减法
  minusCount(e) {
    var that = this;
    var datas = e.currentTarget.dataset
    var count = e.currentTarget.dataset.count
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var mprice = e.currentTarget.dataset.mprice
    var lists = that.data.goods_list;
    var spec_sku_id = e.currentTarget.dataset.spec
    if (count == 0) {
      var goods = that.data.goods_list.splice(index, 1);
      that.onShow();
      that.setData({
        goods_list: goods
      })
      return false
    }
    App._get("food/store/sub", {
      goods_count: 1,
      goods_id: id,
      goods_price: mprice,
      seller_id: that.data.seller_id,
      spec_sku_id: spec_sku_id
    }, function (res) {
      if (res.msg.cart_total_num == 0) {
        qq.showModal({
          title: '提示',
          content: '请前往店铺选择商品',
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
    var texts = e.detail.value;
    this.setData({
      texts: texts
    })
  },
  ///去结算
  total: function () {
    // if()
    App._post('ajax/checkContent', { text: this.data.texts}, function(res){
console.log(res);
App._get('food/store/qindex', {
      remarks: this.data.texts,        // 备注
      board_id: this.data.board_id,//桌号
    }, function (res) {
      qq.requestPayment({
        timeStamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        'success': function (res) {
          qq.showToast({
            title: '支付成功',
          });
          console.log(res)

        },
        'fail': function (res) {
          qq.showToast({
            title: '支付失败',
          })
        }
      })
    })
});
    
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
    App._get('food/store/getLists', {}, function (res) {
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
       
        }
        price = parseFloat(price);
     //   var redu = lprice - price;
        that.setData({
          total:price
         // redu: redu
        });
      }

    })
  },
})