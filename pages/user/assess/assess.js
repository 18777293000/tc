const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: '',
    roasttitle: '',
    showView: true,
    roascounts: "",
    order_id:'',
    stars: [
      {
        flag: 1,
        bgfImg: "../../food/details/image/foods_08.png",
        bgImg: "../../food/details/image/foods_10.png"
      },
      {
        flag: 1,
        bgfImg: "../../food/details/image/foods_08.png",
        bgImg: "../../food/details/image/foods_10.png"
      },
      {
        flag: 1,
        bgfImg: "../../food/details/image/foods_08.png",
        bgImg: "../../food/details/image/foods_10.png"
      },
      {
        flag: 1,
        bgfImg: "../../food/details/image/foods_08.png",
        bgImg: "../../food/details/image/foods_10.png"
      },
      {
        flag: 1,
        bgfImg: "../../food/details/image/foods_08.png",
        bgImg: "../../food/details/image/foods_10.png"
      }
    ],
    star_num:'',
    img_one:''
  },
  onLoad:function(options){
    var that = this
    that.setData({
      order_id:options.id
    })

  },
  roasttitle: function (e) {
    var that = this;
    var roasttitle = e.detail.value;
    this.setData({
      roasttitle: roasttitle
    })
    // console.log(roasttitle);
  },
  uploadimg: function () {

    var that = this;
    qq.chooseImage({

      count: 1,

      sizeType: ['original', 'compressed'],

      sourceType: ['album', 'camera'],

      success: function (res) {

        that.setData({
          showView: false,
          pic: "",
          source: res.tempFilePaths
        })

        const tempFilePaths = res.tempFilePaths

        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            console.log(2222)
            console.log(res)
            var data = JSON.parse(res.data)
            that.setData({
              img_one: App.Domain + data.data
            })
          }
        })

      }

    })

  },

  score: function (e) {
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 1,
        star_num: e.currentTarget.dataset.index
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 2,
        star_num: e.currentTarget.dataset.index
      })
    }
  },

  roascounts: function (e) {
    var that = this;
    var roascounts = e.detail.value;
    this.setData({
      roascounts: roascounts
    })
    // console.log(roascounts);
  },

  formSubmit: function (e) {
    var that = this;
    var source = that.data.source;
    var roasttitle = that.data.roasttitle;
    var roascounts = that.data.roascounts;
    var star_num = that.data.star_num
    console.log(star_num)
    // var roascounted = roascounts.substring(3);
    console.log(source, roasttitle, roascounts)
    App._post("center/order/evaluate",{
      id: that.data.order_id,
      comments: star_num,
      image: that.data.img_one,
      content: roascounts
    },function(res){
      console.log(res)
      if(res.code==1){
        qq.showToast({
          title: '评论成功',
        })
        qq.navigateTo({
          url: '/pages/user/orders/orderFood/orderFood',
        })

      }
    })

  }
})