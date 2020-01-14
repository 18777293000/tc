// pages/details/details.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_id: '',
    bottom_id: '',
    currentTab: 0,
    idx: 0,
    navbar: ["外卖", "评价", "详情","预约"],
    //navbar: ["外卖", "评价", "详情"],
    /**左侧导航栏 */
    selectMenu: 0,
    ifCarOne: true,
    ifShowCar: false,
    // 选规格
    // spec_attr: '',
    cakes: '',
    size: '',
    test: '',
    idxx: '',
    cake_id: 0,
    idxs: 0,
    ids: "",
    goods_id: "",
    types_id: '', //商品id
    group_id: '', //类型id
    /*title商家信息 */
    specList: [],
    priceList: [],
    name: "",
    spec: "",
    option: "", //参数
    store_money: [], //
    spec_sku_id:"",



    /********************外卖数据 */
    // 左侧点击类样式
    curNav: 'A',
    /************* */
    /**隐藏蛋糕选规格框 */
    ifShow: false,
    /***控制+-的显示和隐藏 */
    ifShowAdd: false,
    //ifShowAdd:true,
    ifShowNum: true,
    /***购物车的显示和隐藏 */
    /*** 加载外卖页面*/
    menus: '',
    selectedMenuId: "",
    totals: {
      count: 0,
      money: 0,
      lmoney: 0
    },
    shops: {
      shop_count: '',
      shop_id: '',
      shop_name: ''
    },
    shops_arr: [],
    shop_list: false,
    goods_count: 0,
    goods_id: "",
    goods_price: "",
    line_price: '',

    bang: "",
    fen: "",
    cake: "",
    indexed: 0,
    total: {
      count: 0,
      money: 0,
      lmoney: 0
    },
    seller_id: '',
    assess_list: '',
    particulars: '',
    kitid: '',
    toView: 'order0',
    //scrollTop:500,
    goods: [], //添加购物车
    shopsarr: [],
    /***购物车显示图片 */
    listShoping: [{
      pic: './image/car.png',
      "text": "支持预定/自取",
    }],
    /***后端写的**** */
    /****商品规格 */
    showView: true, // 显示商品规格

    detail: {}, // 商品详情信息
    goods_price: 0, // 商品价格
    line_price: 0, // 划线价格
    stock_num: 0, // 库存数量

    goods_num: 1, // 商品数量
    goods_sku_id: 0, // 规格id
    cart_total_num: 0, // 购物车商品总数量
    specData: {}, // 多规格信息
    specList: [],
    priceList: [],
    sku: [],
    /**常规设置*/
    seller_id: '',
    chooseId:"",

    // goods_spec_arr: [],
   
    //预约
    time: '10:00',
    tsaddtime: '',
    peopels: [{ id: 1, names: "1人" }, { id: 2, names: "2人" }, { id: 3, names: "4人" }, { id: 4, names: "4-6人" }, { id: 5, names: "6-8人" }, { id: 6, names: "8-10人" }, { id: 7, names: "2人10以上"}],//选人数
    peoplenum:"1人",
    pindex:0,
    tables: ['1-2人桌位', '1人-4人', '6-8人',  "10人以上"],//选桌位类型
    tindex:0,
    desk: ['1-2人桌位', '1人-4人', '6-8人', "10人以上"],//选桌位
    tindexs:0,
    table_id:1,//桌位id
    table_price:0,//餐桌服务费
    sexs: 2,
    deskid:1,//选择桌位id
    items: [
      { name: '1', value: '先生' },
      { name: '2', value: '女士', checked: 'true' },//性别
    ]
  },
  goods_spec_arr: [],

  /**********进入物品详情*************** */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var options = options
    App._get('food/take/clear')
    that.setData({
      seller_id: options.id,
      option: options
    })
    //获取餐桌类型
    App._get('food/reserve/category', {
      seller_id: options.id
    }, function (res) {
      if (res.data.list == "" || res.data.list ==null){
        // if (res.data.list[0].charge == undefined || res.data.list[0].id == undefined) {
        //   return false
        // }
        return false
      }
      else{
        that.setData({
          tables: res.data.list,
          table_price: res.data.list[0].charge,
          table_id: res.data.list[0].id
        })
        //下面选择桌位
        App._get('food/reserve/board', {
          seller_id: options.id, category_id: res.data.list[0].id
        }, function (res) {
          that.setData({
            desk: res.data.list,
            deskid: res.data.list[0].id
          })
        })
      }
     
      


    })
 
    qq.setNavigationBarTitle({
      title: '商品列表' //修改title
    })
    App._get('food/shop/store', {
      sellerId: options.id
    }, function(res) {
      console.log(res)
      that.setData({
        info: res.data.info,
        store_money: res.data.info.discount
      })

    })
    App._get("food/shop/index", {
      sellerId: that.data.seller_id
    }, function(res) {
      console.log(res)
      console.log(that.data.seller_id)
      that.setData({
        menus: res.data.list
      })
    })
    //获取订单列表，看看之前购物车里是否添加东西
    // App._get('food/take/getLists', {}, function (res) {
    //      console.log(res)
    //   if (res.data == "" || res.data ==null){
    //     return
    //   }else{
    //     that.setData({
    //       shops_arr: res.data.goodsList,
    //       //shop_list: true
    //     })
    //     var mon = 0;//初始化页面值  总价
    //     var lmon = 0;//初始化页面值  原总价
    //     var num = 0; //初始化页面值  总数
    //     for (var i = 0; i < that.data.shops_arr.length; i++) {
    //       num += parseInt(that.data.shops_arr[i].count)
    //       mon += (that.data.shops_arr[i].count) * (that.data.shops_arr[i].goods_price)
    //       lmon += (that.data.shops_arr[i].count) * (that.data.shops_arr[i].line_price - that.data.shops_arr[i].goods_price)
    //     }
      
    //     var total = that.data.total;
    //     total.count = num;
    //     total.money = mon;
    //     total.lmoney = -lmon;
    //     that.setData({
    //       total: total,
    //       ifShowCar: true,
    //       ifCarOne: false
    //     })
    //   }


 
    // })


    //购物车隐藏
    if (that.data.total.count !== 0) {
      that.setData({
        ifShowCar: true,
        ifCarOne: false
      });
    } else {
      that.setData({
        ifShowCar: false,
        ifCarOne: true
      });
    }
    //获取当前系统时间，添加到页面
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
    that.setData({
      tsaddtime: currentdate
    })
  },
  //改变日期
  bindtsaddtime(e) {
  
    this.setData({
      tsaddtime: e.detail.value
    })
  },
  //改变时间
  bindTimeChange(e) {
   
    this.setData({
      time: e.detail.value
    })
  },

  
    selectMenu: function(e) {

    var index = e.currentTarget.dataset.itemIndex;
    var list_idx = e.currentTarget.dataset.idx
    this.setData({
      toView: 'order' + index.toString(),
      idx: list_idx,
      selectMenu: index
    })


  },


  addCount: function(event) {

    var that = this
    let data = event.currentTarget.dataset
    let total = that.data.total
    let menus = that.data.menus;
    let menu = menus.find(function(v) {
      return v.id == data.cid
    })

    var index = event.currentTarget.dataset.index
    var count = menu.child[index].count
    var goodsId = menu.child[index].id
    var goods_price = menu.child[index].goods_price
    var line_price = menu.child[index].line_price
    // menu.child[index].count += 1;

    var counts = menu.child[index].count += 1;
    total.count += 1
    total.money += parseInt(menu.child[index].goods_price)
    total.lmoney -= parseInt(menu.child[index].line_price)
    var shops = that.data.shops
    shops.shop_count = counts
    shops.shop_id = event.currentTarget.dataset.count
    shops.shop_name = event.currentTarget.dataset.name
    var shopsarr = that.data.shopsarr;


    that.setData({
      'menus': menus,
      'total': total,
      shops: shops,
      ifCarOne: false,
      ifShowCar: true,
      good_id: goodsId,
      goods_price: goods_price,
      line_price: line_price,
      top_id: goodsId,
      
    })
   
    if (total.count == 0) {
      that.setData({
        ifCarOne: true,
        ifShowCar: false
      })
    }

 
    App._get("food/take/add", {
      goods_count: 1,
      goods_id: goodsId,
      goods_price: goods_price,
      line_price: line_price,
      seller_id: that.data.seller_id,
      spec_sku_id: 0,
    }, function(res) {
      that.onShow();
    })
    /////////
    // App._get('food/take/getLists', {}, function(res) {
    //   if (res.data == "" || res.data == null) {
    //     return false
    //   }else{
    //     that.setData({
    //       shops_arr: res.data.goodsList,
    //       //shop_list: true
    //     })
    //   }
     

    // })

  },
  /**********选规格弹框********* */
  /**
   * 初始化商品多规格
   */
  initManySpecData(data) {

    var that = this;
    var sku = [];
    for (let i in data.spec_attr) {
      for (let j in data.spec_attr[i].spec_items) {
        if (j < 1) {
          data.spec_attr[i].spec_items[0].checked = true;
          this.goods_spec_arr[i] = data.spec_attr[i].spec_items[0].item_id;
        }
      }
      sku.push(data.spec_attr[i].spec_items[0].spec_value);
    }
    that.setData({
      goods_sku_id: data.price_list[0].spec_sku_id,
      goods_price: data.price_list[0].goods_price,
      line_price: data.price_list[0].line_price,
      sku: sku,
    });

    return data;
  },

  /**
   * 点击切换不同规格
   */
  changespec: function(e) {

    let attrIdx = e.currentTarget.dataset.attr_idx,
      itemIdx = e.currentTarget.dataset.index,
      specData = this.data.specData;

    for (let i in specData.spec_attr) {
      for (let j in specData.spec_attr[i].spec_items) {
        if (attrIdx == i) {
          specData.spec_attr[i].spec_items[j].checked = false;
          if (itemIdx == j) {
            specData.spec_attr[i].spec_items[itemIdx].checked = true;
            this.goods_spec_arr[i] = specData.spec_attr[i].spec_items[itemIdx].item_id;
          }
        }
      }
    }

    this.setData({
      specData: specData,
      specList: specData.spec_attr,
      priceList: specData.price_list,
    });
    // 更新商品规格信息
    this.updateSpecGoods();

  },

  /**
   * 更新商品规格信息
   */
  updateSpecGoods() {
    var spec = this.data.specData.spec_attr;

    let spec_sku_id = this.goods_spec_arr.join('_');
    var sku = [];
    // 查找skuItem
    let spec_list = this.data.specData.price_list;

    let skuItem = spec_list.find((val) => {
      return val.spec_sku_id == spec_sku_id;
    });

    for (let i in spec) {
      for (let j in spec[i].spec_items) {
        for (let m in this.goods_spec_arr) {
          if (spec[i].spec_items[j].item_id == this.goods_spec_arr[m]) {
            sku.push(spec[i].spec_items[j].spec_value);
          }
        }
      }
    }

    // 记录goods_sku_id
    // 更新商品价格、划线价、库存
    if (typeof skuItem === 'object') {
      this.setData({
        goods_sku_id: skuItem.spec_sku_id,
        goods_price: skuItem.goods_price,
        line_price: skuItem.line_price,
        sku: sku,
      });
    }
  },


  choose: function(e) {
    var chooseId=e.currentTarget.dataset.id;
    var that = this;
    let data = this.initManySpecData(e.currentTarget.dataset.specdata);
    var datas = JSON.stringify(data);
    let specList = data.spec_attr;
    let priceList = data.price_list;
    var spec_sku_id=priceList[0].spec_sku_id;
  //  let spec_sku_id=
    this.setData({
      ifShow: true,
      name: e.currentTarget.dataset.name,
      specList: specList,
      priceList: priceList,
      specData: data,
      goods_sku_id:spec_sku_id,
      chooseId: chooseId,
    })


  },

  /***关闭选蛋糕规格框 */
  close: function(e) {
    var that = this;
    that.setData({
      ifShow: false
    })
  },
  /**************后端写的************** */
  minusCount: function(event) {
    var that=this;
    let data = event.currentTarget.dataset
    let total = that.data.total
    let menus = that.data.menus
    var index = event.currentTarget.dataset.index
    let menu = menus.find(function(v) {
      return v.id == data.cid
    })
 

    if (menu.child[index].count <= 0)
      return
    var goodsId = menu.child[index].id
    var goods_price = menu.child[index].goods_price
    var line_price = menu.child[index].line_price
    // menu.child[index].count -= 1;
    total.count -= 1
    total.money -= parseInt(menu.child[index].goods_price)
    total.lmoney -= parseInt(menu.child[index].line_price)
    var counts = menu.child[index].count -= 1;

    that.setData({
      'menus': menus,
      'total': total,
    })
    if (total.count == 0) {
      that.setData({
        ifCarOne: true,
        ifShowCar: false,
      })
    }
    App._get("food/take/sub", {
      goods_count: 1,
      goods_id: goodsId,
      goods_price: goods_price,
      line_price: line_price,
      seller_id: that.data.seller_id,
      spec_sku_id:0,

    }, function(res) {

      that.onShow();
    })
  },
  /**横向导航栏 */
  /** * 滑动切换tab */
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });


  },
  /** * 点击tab切换 */
  swichNav: function(e) {

    var that = this;


    that.setData({
      currentTab: e.currentTarget.dataset.type
    })
    var currentTab = that.data.currentTab
    if (currentTab == 0) {
      App._get("food/shop/index", {
        sellerId: that.data.seller_id
      }, function(res) {

        that.setData({
          menus: res.data.list
        })
      })
    } else if (currentTab == 1) {
      // 综合评分
      App._get("food/shop/score", {
        sellerId: that.data.seller_id
      }, function(res) {

        that.setData({
          info: res.data.info
        })
      })
      // 全部评分
      App._get("food/shop/comments", {
        sellerId: that.data.seller_id
      }, function(res) {

        that.setData({
          assess_list: res.data.list
        })


      })

    } else if (currentTab == 2) {
      App._get("food/shop/detail", {
        sellerId: that.data.seller_id
      }, function(res) {

        var ambient = res.data.info.ambient
        var ambients = []
        for (let i in ambient) {
          ambients.push(ambient[i]); //属性 //arr.push(obj[i]); //值 } 
        }
        that.setData({
          particulars: res.data.info
        })
      })
    }

    that.onLoad(that.data.option)
  },
  /**************动态获取元素的值 */
  /*****蛋糕选规格弹框 */
  choose11: function(e) {

    var that = this;
    let data = e.currentTarget.dataset
    let total = this.data.total
    let menus = this.data.menus
    var idx = that.data.idx
    var ids = data.index
    var index = e.currentTarget.dataset.index
    var indexed = that.data.indexed;
    let cakes = menus[idx].child[ids].name;
    let specData = menus[idx].child[ids].specData;
    let types_id = menus[idx].child[ids].id;


    let group_id = menus[idx].child[ids].specData.spec_attr[index].group_id;
    let spec_attr = menus[idx].child[ids].specData.spec_attr;
    that.setData({
      ifShow: true,
      size: spec_attr[0],
      cakes: cakes,
      test: spec_attr[1],
      ids: ids,
      types_id: types_id,
      group_id: group_id,
      goods_sku_id:spec_sku_id
    })


  },

  choose8: function(e) {

    var specdata = (e.currentTarget.dataset.specdata);
    var that = this;


    this.setData({
      ifShow: true,
      name: e.currentTarget.dataset.name,
      specList: specdata.spec_attr,
      priceList: specdata.price_list,

    })


  },
  /**
   * 改变属性规格
   */
  changeSpec: function(e) {
  
    this.setData({
      spec: e.currentTarget.dataset.spec
    })
  },
  /***关闭选蛋糕规格框 */
  close: function(e) {
    var that = this;
    that.setData({
      ifShow: false
    })
  },
  /****计算加、减法 */
  /* 点击减号 */
  reduce: function(e) {

    var num = this.data.num;
    // 如果大于1时，才可以减 
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态 
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回 
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    // 将数值与状态写回 
    this.setData({
      num: num
    });
  },
  //去结算
  account: function(e) {

    if (e.currentTarget.dataset.count == 0) {
      qq.showToast({
        title: '请先选择商品',
      })
      return

    } else {
      var lmoney = e.currentTarget.dataset.lmoney
      var money = e.currentTarget.dataset.money
      qq.redirectTo({
        url: '../../food/order/order?lmoney' + lmoney + '&money' + money,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }


  },


  godIndex(e) {
    var that = this;

    //食品的份数
    var types_id = that.data.types_id //列表id
    var group_id = that.data.group_id //类型id
    var item_id = e.currentTarget.dataset.id // item ID

    var goodsval = e.currentTarget.dataset.value;
    let index = e.currentTarget.dataset.index;

    var meaus = that.data.menus[that.data.idx].child[that.data.ids];

    var price = meaus.goods_price * parseInt(goodsval);
    var lprice = meaus.line_price * parseInt(goodsval);
    var money = that.data.total.money + price;
    var count = that.data.total.count + 1;
    var lmoney = that.data.total.lmoney + lprice;
    var total = that.data.total;
    total.count = count;
    total.money = money;
    total.lmoney = lmoney;
    that.setData({
      kitid: index,
      idxx: index,
      price: price,
      // prices: price,
      bang: goodsval,
      lprice: lprice,
      totals: total
    })
    App._get("food/shop/spec", {
      goods_id: types_id,
      specId: group_id,
      itemId: item_id
    }, function(res) {

    })
  },
  gosIndex(e) {
    let index = e.currentTarget.dataset.index;

  },
  gosIndex(e) {
    let index = e.currentTarget.dataset.index;
    var kwval = e.currentTarget.dataset.value;

    this.setData({
      idxs: index,
      fen: kwval
    })
  },
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function(e) {
    var id = e.target.id;

    this.setData({
      // 动态把获取到的 id 传给 scrollTopId 
      scrollTopId: id,
      // 左侧点击类样式 
      curNav: id
    })
  },

  changeprice: function(e) {
    var that = this;
    var totals = that.data.total;
   
    console.log(totals)
    var ifCarOne = false;
    var ifShowCar = true;
    var total = that.data.total;
    var price = that.data.goods_price;
    console.log(price)
    total.money = parseInt(totals.money) + parseInt(price);
    console.log(total.money)
    total.count = totals.count + 1;
    total.lmoney = totals.lmoney;
    var money = that.data.total.money;
    // var price = that.data.prices;
    var count = that.data.total.count;
    var lmoney = that.data.total.lmoney;
    // var bang = that.data.bang;
    // var fen = that.data.fen;
  
    that.setData({
      ifCarOne: ifCarOne,
      ifShowCar: ifShowCar,
      'total': total,
      ifShow: false,
    })
    
    App._get("food/take/add", {
      goods_count: 1,
      goods_id: that.data.chooseId,
      goods_price:price,
      line_price: that.data.line_price,
      seller_id: that.data.seller_id,
      spec_sku_id: that.data.goods_sku_id

    }, function (res) {
      that.onShow();
     })
  },

  shop_list(e) {
    var that = this

    var shop_list = that.data.shop_list
    if (that.data.total.count == 0) {
      that.setData({
        shop_list: true
      })
    } else {
      that.setData({
        shop_list: !shop_list
      })

    }
    // if (that.data.shop_list)
    //请求订单接口
    App._get('food/take/getLists', {}, function(res) {

      that.setData({
        shops_arr: res.data.goodsList,
      })

    })
  },
  //底部弹框购物车加法
  addCar: function(e) {
    var that = this

    var shop_id = that.data.shops.shop_id


    App._get("food/take/add", {
      goods_count: 1,
      goods_id: shop_id,
      goods_price: that.data.goods_price,
      line_price: that.data.line_price,
      seller_id: this.data.seller_id,
      spec_sku_id: this.data.goods_sku_id

    }, function(res) {

    })
  },
  //清空购物车
  delete: function(e) {
    var that = this
    App._get('food/take/clear', {}, function(res) {
      var total = that.data.total;
      total.money = 0;
      total.count = 0;
      that.setData({
        shops_arr: "",
        total: total,
        menus: that.data.menus,
        shop_list: false
      })
      getCurrentPages()[getCurrentPages().length - 1].onLoad(that.data.option) //刷新页面


    })
  },
  //跳转到详情页面
  next: function(e) {
    var id = e.currentTarget.dataset.id

    qq.navigateTo({
      url: '../../food/goods/goods?id=' + id,
    })
  },
  onShow:function(){
    var that=this;
    //获取订单列表，看看之前购物车里是否添加东西
    App._get('food/take/getLists', {}, function (res) {
  
      if (res.data == "" || res.data == null) {
        return
      } else {
        that.setData({
          shops_arr: res.data.goodsList,
          //shop_list: true
        })
       
        var mon = 0;//初始化页面值  总价
        var lmon = 0;//初始化页面值  原总价
        var num = 0; //初始化页面值  总数
        for (var i = 0; i < that.data.shops_arr.length; i++) {
          num += parseInt(that.data.shops_arr[i].count)
          mon += (that.data.shops_arr[i].count) * (that.data.shops_arr[i].goods_price)
          lmon += (that.data.shops_arr[i].count) * (that.data.shops_arr[i].line_price - that.data.shops_arr[i].goods_price)
        }
     
        var total = that.data.total;
        total.count = num;
        total.money = mon;
        total.lmoney = -lmon;
        that.setData({
          total: total,
          ifShowCar: true,
          ifCarOne: false
        })
      }



    })
  },
  //预约选择人数
   bindPickerChange(e) {
  
    this.setData({
      pindex: e.detail.value,
      peoplenum: e.currentTarget.dataset.peoplenum

    })
  },
  //预约桌位类型
  bindTableChange(e) {
    let tindex = e.detail.value, that = this;
    this.setData({
      tindex: e.detail.value,
      //table_price:e.currentTarget.dataset.money,
      table_price: this.data.tables[tindex].charge,
      table_id: this.data.tables[tindex].id
    })
    App._get('food/reserve/board', {
      seller_id: this.data.option.id, category_id: this.data.tables[tindex].id
    }, function (res) {
      that.setData({
        tindexs:0,
        desk: res.data.list,
        deskid: res.data.list[0].id
      })
    })
    console.log(this.data.table_id);
  },

  //预约桌位
  bindDeskChange(e) {
    this.setData({
      tindexs: e.detail.value,
      deskid: e.currentTarget.dataset.deskid
    })
  },
  //选择性别
  radioChange: function (e) {
  
    this.setData({
      sexs: e.detail.value
    })
  },
  //预约表单提交
  formSubmit: function (e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    console.log(e.detail.value.mobile);
    if (e.detail.value.mobile == "" || e.detail.value.mobile == " " || e.detail.value.mobile == null) {
      qq.showToast({
        title: '手机号不能为空',
      })
      return false
    }
    //console.log(that.data.dates,666)
    var number = that.data.peoplenum;
    var category_id = that.data.table_id;
    var board_id = that.data.deskid;
    var a = that.data.tsaddtime;
    var b = that.data.time;
    var data_time = a + " " + b;
    var sexs = that.data.sexs;
    var phone = e.detail.value.mobile;
    var remark = e.detail.value.remark;
    var reg = /^1\d{10}$/;
    if (!reg.test(phone)) {
      qq.showToast({
        title: '手机号有误',
      })
      return false
    }else {
      App._post('ajax/checkContent', { text: e.detail.value.username + remark}, function(res){
console.log(res);
App._post("food/reserve/qindex", {
        category_id: category_id,//餐桌类型id
        board_id: board_id,//餐桌id
        fixed_time: data_time,//预定时间
        number: number, //人数
        username: e.detail.value.username, //联系人
        mobile: phone, //联系电话
        sex:sexs,   //性别
        remarks:remark, // 备注

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
            })
            setTimeout(function () {
              qq.navigateTo({
                url: '/pages/food/food',
              })
            }, 3000)
           
          },
          'fail': function (res) {
            qq.showToast({
              title: '支付失败',
            })
          }
        })
      },
      )
});
      
    }

  },
  //调手机摄像头
  scanCode: function (e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this;
    qq.scanCode({ //扫描API
      success(res) { //扫描成功
     
        console.log(res.result) //输出回调信息
        var buy = res.result.toString();
      

        //获取页面url传过来的参数
        var strs = '';
     //   var url = 'http://tc.commonts.cn/api/food/Qrshop/index?seller_id=1&board_id=1'; //获取url中"?"符后的字串
        var theRequest = new Object();
        var str = buy.substr(0);
        strs = str.split("?");
        var strd = strs[1];
        console.log(strd);
        var a = strd.split("&");
        for (var i = 0; i < a.length; i++) {
          theRequest[a[i].split("=")[0]] = unescape(a[i].split("=")[1]);
        }
      

       
        qq.navigateTo({
          url: '/pages/food/buy/buy?seller_id=' + theRequest.seller_id + '&board_id=' + theRequest.board_id + '&urls=' + strs[0],
         
        })
        qq.showToast({
          title: '成功',
          duration: 1000
        })
        
      }
    })
    // qq.navigateTo({
    //   url: '/pages/food/buy/buy?id=' + that.data.seller_id,
    // })
  },
})