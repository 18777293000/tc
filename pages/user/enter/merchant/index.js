// pages/user/enter/merchant/index.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_one: '',
    img_two: '',
    img_three: '',
    img_four: '',
    img_five: '',
    shop_img1: false,
    shop_img2: false,
    shop_img3: false,
    shop_img4: false,
    shop_img5: false,
    latitude: '',
    longitude: ''
  },
  img_one(e) {

    var that = this
    that.setData({
      shop_img1: true
    })
    qq.chooseImage({
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片

        const tempFilePaths = res.tempFilePaths;
        let images = that.data.images;
        console.log(25252545)
        console.log(App.Domain + '/api/ajax/upload')
        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            console.log(res.data)
            var data = JSON.parse(res.data)
            console.log(data.data)
            that.setData({
              img_one: App.Domain + data.data
            })

          }
        })
      }
    })
  },
  img_two(e) {

    var that = this
    that.setData({
      shop_img2: true
    })
    qq.chooseImage({
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths;
        let images = that.data.images;
        console.log(App.Domain + '/api/ajax/upload')
        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            //console.log(2222)
            // console.log(res)
            var data = JSON.parse(res.data)
            that.setData({
              img_two: App.Domain + data.data
            })
          }
        })

      }
    })
  },
  img_three(e) {

    var that = this
    that.setData({
      shop_img3: true
    })
    qq.chooseImage({
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        let images = that.data.images;
        const tempFilePaths = res.tempFilePaths
        console.log(App.Domain + '/api/ajax/upload'),
          qq.uploadFile({
            url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: "file",
            success(res) {
              // console.log(2222)
              var data = JSON.parse(res.data)
              // console.log(data)
              that.setData({
                img_three: App.Domain + data.data
              })
            }
          })
      }
    })
  },
  img_four(e) {

    var that = this
    that.setData({
      shop_img4: true
    })
    qq.chooseImage({
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
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
              img_four: App.Domain + data.data
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
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片

        const tempFilePaths = res.tempFilePaths

        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {

            var data = JSON.parse(res.data)
            that.setData({
              img_five: App.Domain + data.data
            })

          }
        })
      }
    })
  },
  getlocation(e) {
    var _that = this
    qq.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        _that.setData({
          address: res.address,
          longitude: res.longitude,
          latitude: res.latitude

        })
      },
      fail: function (res) {
        console.log(res)
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
    var designation = res.detail.value.designation
    var address = res.detail.value.address
    var legal = res.detail.value.legal
    var telephone = res.detail.value.telephone
    var img_one = that.data.img_one
    var img_two = that.data.img_two
    var img_three = that.data.img_three
    var img_four = that.data.img_four
    var img_five = that.data.img_five
    var images = that.data.images
    var longitude = that.data.longitude
    var latitude = that.data.latitude
    var reg = /^1\d{10}$/;
    if (!reg.test(telephone)) {
      qq.showToast({
        title: '请填写手机号',
      })
      return false
    }
    console.log(img_one, img_two, img_three, img_four, img_five)
    if (designation == '' || address == '' || legal == '' || telephone == '' || img_one == '' || img_two == '' || img_three == '' || img_four == '' || img_five == '' || longitude == '' || longitude == '') {
      qq.showToast({
        title: '请输入完整信息',
        icon: "none",
        duration: 2000,
      })
    } else {
      App._post("center.auth/store", {
        name: designation,
        address: address,
        tel: telephone,
        bus_image: img_four,
        food_image: img_five,
        real_name: legal,
        img1: img_one,
        img2: img_two,
        img3: img_three,
        store_lat: latitude,
        store_lng: longitude
      }, function (res) {
        if (res.code == 1) {
          console.log(res.msg)
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

          console.log(res.msg)
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