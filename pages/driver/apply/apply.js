// pages/driver/apply/apply.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    sexs:2,
    items: [
      { name: '1', value:'男'},
      { name: '2', value: '女', checked: 'true' },
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
      console.log(options)
      that.setData({
        id:options.id
      })
  },
  radioChange: function (e) {

    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      sexs:e.detail.value
    })
  },
  formSubmit:function(e){
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
      console.log(e)
      var username = e.detail.value.username
      var idCard = e.detail.value.idCard
      var sex = e.detail.value.sex
      var tel = e.detail.value.tel
      var sexs =this.data.sexs;
     
    if (tel == "" || tel == null || username == "" || idCard == "" || username == "") {
      qq.showToast({
        title: '请填写完整信息',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(idCard)){
          qq.showToast({
            title: '身份证号有误',
          })
      return false;
      }
    
    if (!(/^1\d{10}$/).test(tel)) {
      qq.showToast({
        title: '手机号有误',
      })
      return false;
    }else{
      App._post('ajax/checkContent', { text: username }, function(res){
console.log(res);
App._post("driver/index/signup", {
        school_id: this.data.id,
        name: username,
        sex: sexs,
        card: idCard,
        phone: tel

      }, function (res) {
        //console.log(res)
        qq.showToast({
          title: '提交成功！',
        })
        setTimeout(function () {
          qq.navigateBack({
            datel: 1
          })
        }, 3000)
      })
});
    }
  },
})