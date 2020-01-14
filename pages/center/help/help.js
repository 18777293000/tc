// pages/help/help.js
let App = getApp();
Page({
  data: {
    source: '',
    roasttitle: '',
    showView: true,
    t_length: 0,
    roascounts: ""
  },
  roasttitle: function(e) {
    var that = this;
    var roasttitle = e.detail.value;
    this.setData({
      roasttitle: roasttitle
    })
  },
  uploadimg: function() {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this;
    qq.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        if (res.tempFiles[0].size < 6000) {
          qq.showToast({
            title: "图片格式错误！",
            icon: 'success',
            image: '../../img/xx.jpg',
            duration: 2000
          })
          return;
        }
        that.setData({
          showView: false,
          pic: "",
          source: res.tempFilePaths
        })
        var tempFilePaths = res.tempFilePaths
        let images = that.data.images;
        console.log(25252545)
        console.log(App.Domain + '/api/ajax/upload')
        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload',
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            console.log(res.data)
            var data = JSON.parse(res.data)
            console.log(data.data)
            that.setData({
              source: App.Domain + data.data
            })
          }
        })
      }
    })
  },
  bindText: function(e) {
    var t_text = e.detail.value.length;
    this.setData({
      t_length: t_text
    })
  },
  roascounts: function(e) {
    var that = this;
    var roascounts = e.detail.value;
    this.setData({
      roascounts: roascounts
    })
  },
  formSubmit: function(e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this;
    var source = that.data.source;
    var roasttitle = that.data.roasttitle;
    var roascounts = that.data.roascounts;
    console.log(source, roasttitle, roascounts)
    App._get("release/index", {
      type: 4,
      title: roasttitle,
      content: roascounts,
      image: source
    },function(res){
        qq.showToast({
          title: '发布成功',
        })
      setTimeout(function () {
        qq.navigateBack({
          delta: 1
        })
      }, 3000)
    })
  }
})