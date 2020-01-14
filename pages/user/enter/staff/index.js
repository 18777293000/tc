// pages/user/enter/merchant/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_one: '',
    img_two: '',
    img_five: '',
    shop_img1: false,
    shop_img2: false,
    shop_img5: false,
  },
  img_one(e) {
    console.log(e)
    var that = this
    that.setData({
      shop_img1: true
    })
    qq.chooseImage({
      count: 1,   // 上传1张图片
      sizeType: ['original', 'compressed'],   //图片类型：原图或压缩图
      sourceType: ['album', 'camera'],     //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
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
  img_two(e) {
    console.log(e)
    var that = this
    that.setData({
      shop_img2: true
    })
    qq.chooseImage({
      count: 1,   // 上传1张图片
      sizeType: ['original', 'compressed'],   //图片类型：原图或压缩图
      sourceType: ['album', 'camera'],     //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
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
              img_two: App.Domain + data.data
            })
          }
        })

      }
    })
  },

  img_five(e) {
    console.log(e)
    var that = this
    that.setData({
      shop_img5: true
    })
    qq.chooseImage({
      count: 1,   // 上传1张图片
      sizeType: ['original', 'compressed'],   //图片类型：原图或压缩图
      sourceType: ['album', 'camera'],     //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
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
              img_five: App.Domain + data.data
            })
          }
        })
      }
    })
  },
  formSubmit(res) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    let that = this
    var names = res.detail.value.names
    var identity = res.detail.value.identity
    var major = res.detail.value.major
    var telephone = res.detail.value.telephone
    var img_one = that.data.img_one
    var img_two = that.data.img_two
    var img_five = that.data.img_five
    console.log(img_one, img_two, img_five)
    var reg = /^1\d{10}$/;
    if (!reg.test(telephone)) {
      qq.showToast({
        title: '填写正确手机号',
      })
      return false
    }
    if (names == '' || identity == '' || major == '' || telephone == '' || img_one == '' || img_two == '' || img_five == '') {
      qq.showToast({
        title: '请输入完整信息',
        icon: "none",
        duration: 2000,
      })
      return false
    } else {
      App._post("center.auth/staff", {
        name: names,
        tel: telephone,
        card_number: identity,
        card_front: img_one,
        card_back: img_two,
        major: major,
        resume: img_five
      }, function (res) {
        if (res.code == 1) {
          setTimeout(() => {
            qq.showToast({
              title: "上传成功",
              icon: 'none'
            });
            setTimeout(() => {
              qq.switchTab({
                url: '/pages/user/index',
              })
            }, 1000)
          }, 0);

        } else {
          setTimeout(() => {
            qq.showToast({
              title: res.msg,
              icon: 'none'
            });
            setTimeout(() => {
              qq.switchTab({
                url: '/pages/user/index',
              })
            }, 1000)
          }, 0);
        }
      })
    }
  },
})