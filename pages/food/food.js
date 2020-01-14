// pages/foods/food.js
const App = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: 0,
    two: 1,
    three: 3,
    /*轮播图*/
    swiperCurrent: 0,

    indicatorDots: true,

    autoplay: true,

    interval: 3000,

    duration: 800,

    circular: true,

    imgUrls: [
      'image/foods_02.png',
      'image/foods_02.png',

    ],
    /**选项卡 */
    current: "",
    keyword: '',
    dataType: 0,

    currentTab: 0,

    navbar: ["综合排序", "销量最高", "距离最近"],
    /*产品展示*/
    listData: [

    ],

    storeDate: '',

    lat: '',
    lng: '',
  },
  //轮播图的切换事件

  swiperChange: function (e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击图片触发事件

  swipclick: function (e) {

    qq.switchTab({

      url: this.data.links[this.data.swiperCurrent]

    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取数据列表
    qq.getLocation({ //没有特别说明的都是固定写法
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        that.data.dataType = options.type || '0';
        that.setData({ dataType: that.data.dataType });
        App._get('food/index/index', {
          dataType: 0,
          name: that.data.keyword,
          location_x: res.latitude,
          location_y: res.longitude
        }, function (resault) {
          that.setData({
            storeDate: resault.data.list
          })
        })
      }

    });
    // this.data.dataType = options.type || '0';
    // this.setData({ dataType: this.data.dataType });
    // App._get('food/index/index', {
    //   dataType: 0,
    //   name: that.data.keyword,
    //   location_x: location_x,
    //   location_y: location_y
    // }, function (res) {
    //   that.setData({
    //     storeDate: res.data.list
    //   })
    // }) 

  },

  keyword(e) {
    var that = this
    that.setData({
      keyword: e.detail.value
    })
  },

  /** * 点击tab切换 */
  swichNav: function (e) {
    var that = this;
    var cur = e.currentTarget.dataset.current;
    if (cur == that.data.current) {
      return false;
    } else {
      that.setData({
        current: cur,
        currentTab: cur,
      })
    }
    App._get('food/index/index', {
      dataType: cur,
      name: that.data.keyword
    }, function (res) {
      console.log(res)
      that.setData({
        storeDate: res.data.list
      })
      //console.log(that.data.storeDate)
    })
  },
  /**进入详情页 */
  next: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    qq.navigateTo({
      url: "../food/details/details?id=" + id,
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    App._get('food/index/bannerList', {}, function (result) {

      that.setData({
        banner: result.data.bannerList,
      })
    })
  },




  //判断是否经纬度存在
  check: function (cb) {
    var that = this;
    App._post('food/index/location', {
      location_x: that.data.lat,
      location_y: that.data.lng
    }, function (res) {

      console.log(res);
    })

  },



})