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
    agree: 0,
    img: "/pages/user/enter/img/img-share-un.png",
    showModal1: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  formSubmit(res) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    console.log(res)
    let that = this
    var names = res.detail.value.names
    var identity = res.detail.value.identity
    var major = res.detail.value.major
    var stu_num = res.detail.value.stu_num
    var telephone = res.detail.value.telephone
    var img_one = that.data.img_one
    var img_two = that.data.img_two
    var agree = that.data.agree
    console.log(img_one, img_two)
    var reg = /^1\d{10}$/;
    if (!reg.test(telephone)) {
      qq.showToast({
        title: '请填写手机号',
      })
      return false
    }
    if (names == '' || identity == '' || major == '' || stu_num == '' || telephone == '' || img_one == '' || img_two == '') {
      qq.showToast({
        title: '请输入完整信息',
        icon: "none",
        duration: 2000,
      })
      return false
    }
    if (agree != 1) {
      qq.showToast({
        title: '勾选协议',
      })
      return false
    }
    else {
      App._post("center.auth/errands", {
        name: names,
        tel: telephone,
        card_number: identity,
        sno: stu_num,
        major: major,
        card_front: img_one,
        card_back: img_two
      }, function (res) {
        console.log(res)
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
  agree: function () {
    var e = this, t = e.data.agree;
    0 == t ? (t = 1, e.setData({
      img: "/pages/user/enter/img/img-share-agree.png",
      agree: t
    })) : 1 == t && (t = 0, e.setData({
      img: "/pages/user/enter/img/img-share-un.png",
      agree: t
    }));
  },
  openrule: function () {
    var that = this;
    qq.request({
      url: App.Domain + '/api/run/index/getAgree',
      data: {},
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          datas: res.data,
        })
      },
    })
    this.setData({   //打开规则模块
      showModal: true
    });
  },
  openrule1: function () {
    var that = this;
    qq.request({
      url: App.Domain + '/api/run/index/getAgree',
      data: {},
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          data1: res.data,
        })
      },
    })
    this.setData({   //打开规则模块
      showModal1: true
    });
  },
  closerule: function () {
    this.setData({   //关闭规则模块
      showModal: false
    });
  },
  closerule1: function () {
    this.setData({   //关闭规则模块
      showModal1: false
    });
  },
})