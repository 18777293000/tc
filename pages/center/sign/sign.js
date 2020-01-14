let App = getApp();
var that;
Page({

  data: {
    source: '',
    address: '添加定位',
    texts: '',
    showView: true,
    pic: 'img/banner.jpg'

  },
  uploadimg: function () {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this;
    qq.chooseImage({
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(res)
        if (res.tempFiles[0].size < 5000) {
          qq.showToast({

            title: "图片格式错误！",
            icon: 'success',//图标，支持"success"、"loading" 
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
        let images = that.data.images;
        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            var data = JSON.parse(res.data)
            that.setData({
              source: App.Domain + data.data
            })
          }
        })
      }
    })
  },
  onLoad() {
    that = this;
  },
  maps: function (e) {
    var address = that.data.address;
    qq.chooseLocation({
      success: function (res) {
        console.info(res.address);
        that.setData({
          address: res.address
        });
      },
    })
  },
  publish: function (e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this;
    console.log(e);
    var source = that.data.source;
    var address = that.data.address;
    var texts = e.detail.value.textareas;
    console.log(source, address, texts)
    App._post("release/index", {
      image: source,
      area: address,
      content: texts,
      type:5
    }, function (res) {
      console.log(res)
      qq.showToast({
        title: '签到成功',
      })
      setTimeout(function () {
        qq.navigateBack({
          delta: 1
        })
      }, 3000)
    })
  }
})