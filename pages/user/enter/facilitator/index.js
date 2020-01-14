// pages/user/enter/facilitator/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:"",
    telephone:"",
    content:"",
    men_people:"",
  },
  formSubmit(e){
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    var names = e.detail.value.names
    var telephone = e.detail.value.telephone
    var men_people = e.detail.value.men_people
    var content = e.detail.value.content
    var reg = /^1\d{10}$/;
    if (!reg.test(telephone)) {
      qq.showToast({
        title: '请填写手机号',
      })
      return false
    } 

    if (names == '' || telephone == '' || men_people == '' || names == '' || content == '' ){
      qq.showToast({
        title: '请输入完整信息',
        icon:"none",
        duration:2000,
      })
      return false
    }else{
      App._post("center/auth/service", {
        name: names,
        tel: telephone,
        manage_content: content,
        count: men_people
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})