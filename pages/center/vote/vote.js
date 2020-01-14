// pages/vote/vote.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // count:[],
    array: [0],//默认显示一个
    inputVal: [],//所有input的内容
      theme:"",
      date: '2016-09-01',
      items: [
        { name: '1', value: '单选'},
        { name: '2', value: '多选', checked: ''}
      ],
    selects:''
  },
  onLoad: function () {
    var that=this;
    //获取系统时间
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();

    var month = date.getMonth() + 1; date
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    that.setData({
      date: currentdate,
    });
  },
  theme:function(e){
    var that = this;
    var theme = e.detail.value;
    console.log(theme);
    that.setData({
      theme: theme
    })
  },
  
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  } ,
  radioChange(e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      selects: e.detail.value
    })
  },

  //获取input的值
  getInputVal: function (e) {
    var nowIdx = e.currentTarget.dataset.idx;//获取当前索引
    var val = e.detail.value;//获取输入的值
    var oldVal = this.data.inputVal;
    oldVal[nowIdx] = val;//修改对应索引值的内容
    this.setData({
      inputVal: oldVal
    })
    // console.log(oldVal);
  },
  //添加input
  addInput: function () {
    var old = this.data.array;
    old.push(1);//这里不管push什么，只要数组长度增加1就行
    this.setData({
      array: old
    })
  },
  //删除input
  delInput: function (e) {
    var nowidx = e.currentTarget.dataset.idx;//当前索引
    var oldInputVal = this.data.inputVal;//所有的input值
    var oldarr = this.data.array;//循环内容
    oldarr.splice(nowidx, 1);    //删除当前索引的内容，这样就能删除view了
    oldInputVal.splice(nowidx, 1);//view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
      oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
      array: oldarr,
      inputVal: oldInputVal
    })
  },
  formSubmit:function(e){
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    // console.log(e);
    var theme = that.data.theme;
    var items = that.data.selects;
    var inputVal = that.data.inputVal;
    var date = that.data.date;
    console.log(theme, inputVal, date, items);
    App._get("release/index",{
        type:1,
      title: theme,
      selects: inputVal,
      end_time: date,
      is_type: items
    },function(res){
      console.log(res)
      qq.showToast({
        title: '发布成功',
      })
      setTimeout(function(){
        qq.navigateBack({
          delta: 1
        })
      },3000)
      
    })
  }
})