// pages/user/personal/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //userAvatarUrl:''
    age: "",
    avatar: "",
    gender: "",
    mobile: "",
    nickname: "",
    score: "",
    url: "",
    filePath: '',
    array: ['男', '女']
  },

  /**
   * 生命周期函数--监听页面加载
   */

  bindPickerChange: function (e) {
    let de;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value == 0) {
      de = "男"
    } else {
      de = "女"
    }
    this.setData({
      gender: de
    })

  },
  onLoad: function (options) {

    var that = this;
    App._get("center/profile/detail", {}, function (result) {

      console.log(result.data);
      // if (result.data.gender == 1) {
      that.setData({
        age: result.data.age,
        avatar: result.data.avatar,
        gender: result.data.gender,
        mobile: result.data.mobile,
        nickname: result.data.nickname,
        score: result.data.score,
        url: result.data.url
      })
    })
  },
  personal(e) {
    var that = this
    qq.chooseImage({
      count: 1, // 上传1张图片
      sizeType: ['original', 'compressed'], //图片类型：原图或压缩图
      sourceType: ['album', 'camera'], //图片来源：相册或者相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        that.setData({
          userAvatarUrl: tempFilePaths
        })
      }
    })
  },
  uploadimg: function (e) {
    var that = this;
    qq.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        // that.setData({
        //   filePath: tempFilePaths
        // })
        qq.uploadFile({
          url: 'api/center/profile/avatar',
          filePath: tempFilePaths[0],
          name: 'file',
          //   formData: formData,
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.code == 200) {
              that.setData({
                filePath: tempFilePaths,
              })
            }
          },
          error: function (e) { }
        });
      }
    })
  },
  formSubmit(res) {
    var that = this;
    var avatar = that.data.filePath;
    var age = res.detail.value.age;
    var integral = res.detail.value.integral;
    var names = res.detail.value.names;
    var sex = res.detail.value.sex;
    var telphone = res.detail.value.telphone;
    var reg = /^1\d{10}$/;
    if (!reg.test(telphone)) {
      qq.showToast({
        title: '请填写手机号',
      })
    }
    App._post('center/profile/info', { nickname: names, avatar: userAvatarUrl, mobile: telphone, gender: sex, age: age, score: integral }, function (result) {
    });
  },
  uploadimg: function (e) {
    var that = this;
    qq.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        const tempFilePaths = res.tempFilePaths
        // that.setData({
        //   filePath: tempFilePaths
        // })
        qq.uploadFile({
          url: App.Domain + '/api/ajax/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          //   formData: formData,
          success: function (res) {
            console.log(res)
            var data = JSON.parse(res.data);
            console.log(res.data)
            var data = JSON.parse(res.data)
            console.log(data.data)
            that.setData({
              avatar: App.Domain + data.data
            })
          },
          error: function (e) {
            console.log(e);
          }
        });
      }
    })
  },
  formSubmit(res) {
    var that = this;
    console.log(res);
    var avatar = that.data.avatar;
    var age = res.detail.value.age;
    var integral = res.detail.value.integral;
    var names = res.detail.value.names;
    var sex = that.data.gender;
    var telphone = res.detail.value.telphone;
    console.log(sex)
    if (sex == '女') {
      that.data.gender = 2
    } else {
      that.data.gender = 1
    }
    App._post('center/profile/info', {
      nickname: names,
      avatar: avatar,
      mobile: telphone,
      gender: that.data.gender,
      age: age,
      score: integral
    }, function (result) {
      console.log(result);
      setTimeout(() => {
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        });
        setTimeout(() => {
          qq.switchTab({
            url: '/pages/user/index',
          })
        }, 2000)
      }, 0);
    });
  },
})