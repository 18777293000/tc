let App = getApp();
Page({
  data: {
    list:'',
   // id:0
  },
  onLoad: function (options) {
    console.log(App.globalData.userInfo);
    var that = this;
    App._get("job/job/index",{},function(res){
      console.log(res)
      that.setData({
        list:res.data.list
      })
    })
    
  },
  money(e){
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that=this;
    var id = e.currentTarget.dataset.id;
    App._post("/job/job/sign", {id:id}, function (res) {
     
      App.showError(res.msg); 
      that.onLoad(); 
    })
    
  },

})