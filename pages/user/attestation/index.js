// pages/user/attestation/index.js
const App = getApp()
Page({
  data: {
    name:"",
    num:"",
    major:"",
    yuanxi:""
  },
  onLoad: function (options) {
   // console.log(options)
   var that=this
    App._get("center/profile/major", {},function (res) {
     console.log(res)
   
      if(res.data.info.realname!=""||undefined){
        that.setData({
          name: res.data.info.realname
        })
      }
      if (res.data.info.name != "" || undefined) {
        that.setData({
          name: res.data.info.name
        })
      }
      if (res.data.info.major != "" || undefined) {
        that.setData({
          major: res.data.info.major 
        })
      }
      if (res.data.info.sno!= "" || undefined) {
        that.setData({
          num: res.data.info.sno
        })
      }
      if (res.data.info.faculty!= "" || undefined) {
        that.setData({
          yuanxi: res.data.info.faculty
        })
      }

    })

  },
  formSubmit(e){
    var names = e.detail.value.names
    var s_number = e.detail.value.s_number
    var major = e.detail.value.major
    var yuanxi=e.detail.value.yuanxi
    App._post('ajax/checkContent', { text: names + major + s_number}, function(res){
console.log(res);
App._post("center/profile/auth",{
      name:names,
      major: major,
      sno: s_number,
      faculty:yuanxi,
    },function(e){
       //console.log(e)
        qq.showToast({
          title: '添加成功',
        })
        setTimeout(function(){
          qq.navigateBack({
            delta: 2
          })
        },2000)
        
    })
});
    
  },
})