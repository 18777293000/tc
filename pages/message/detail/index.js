// pages/message/detail/index.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifGood: true,
    ifShow: false,
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    content: '',
    releaseFocus: false,
    commandTab: '', //绑定当前评论者的id
    textarea_val: '',
    even: '',
    heart_id: '',
    input_val: '',
    list: "",
    type: "", //判断类型
    is_type: '', //1单选 2 多选
    listtou: "", //投票内容
    danxuan: '',
    duoxuan: [],
    yestou: false,
    end_time: '',
    isReply: 0
  },

  /**点赞事件 */
  good: function (e) {
    let that = this;
    that.setData({
      // ifShow: false,
      ifGood: true
    })
  },
  // 用户点击显示弹窗
  clickPup: function () {
    let _that = this;
    _that.anim();
  },
  dblick() {
    let _that = this;
    _that.anim();
  },

  anim() {
    let _that = this;
    if (!_that.data.click) {
      _that.setData({
        click: true,
      })
    }

    if (_that.data.option) {
      _that.setData({
        option: false,
      })

      // 关闭显示弹窗动画的内容，不设置的话会出现：点击任何地方都会出现弹窗，就不是指定位置点击出现弹窗了
      setTimeout(() => {
        _that.setData({
          click: false,
        })
      }, 500)


    } else {
      _that.setData({
        option: true
      })
    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      danxuan: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      duoxuan: e.detail.value
    })
  },
  //
  toupiao() {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this;
    if (that.data.is_type == 1) {
      if (that.data.danxuan == '') {
        qq.showToast({
          title: '请选择投票内容',
          duration: 2000
        })
      } else {
        qq.showModal({
          title: '提示',
          content: '确定投票',
          success(res) {
            if (res.confirm) {
              App._post("circle/vote/vote", {
                voteId: that.data.danxuan
              }, function (res) {
                console.log(res)
                qq.showToast({
                  title: '投票成功',
                })
                qq.navigateBack({
                  delta: 1
                })

              })
            } else if (res.cancel) {

            }
          }
        })
      }
    } else if (that.data.is_type == 2) {
      if (that.data.duoxuan == '') {
        qq.showToast({
          title: '请选择你要投票的内容',
          icon: 'none',
          duration: 2000
        })
      } else {
        qq.showModal({
          title: '提示',
          content: '确定投票',
          success(res) {
            if (res.confirm) {
              var aaa = that.data.duoxuan;
              App._post("circle/vote/vote", {
                voteId: aaa
              }, function (res) {
                qq.showToast({
                  title: '投票成功',
                })
                qq.navigateBack({
                  delta: 1
                })
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      heart_id: options.id
    })
    App._get("circle/comments/detail", {
      id: options.id
    }, function (res) {
      console.log(res)
      that.setData({
        content: res.data,
        type: res.data.type,
        is_type: res.data.is_type
      })
      if (res.data.type == 1) {
        App._get("circle/vote/index", {
          circleId: options.id
        }, function (res) {
          console.log(res)
          var aaa = res.data.list;
          for (var i = 0; i < aaa.length; i++) {
            if (aaa[i].valid == 1) {
              that.setData({
                yestou: true
              })
            }
          }
          that.setData({
            listtou: res.data.list
          })
        })
      }
    })
    App._get("circle/comments/commentList", {
      id: options.id
    }, function (res) {
      that.setData({
        list: res.data.list
      })
    })
  },
  bindReply: function (e) {
    var that = this
    console.log(e, 5959)
    var id = e.currentTarget.dataset.id;
    that.setData({
      commandTab: id,
      isReply: 1
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      textarea_val: e.detail.value,
    })
    console.log(this.data.textarea_val)
  },
  /**点击发送 */
  send: function (e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    that.setData({
      releaseFocus: false,
      isReply: 0
    })
    console.log(e)
    console.log(that.data.textarea_val)
    var commandTab = that.data.commandTab
    var id = e.currentTarget.dataset.id
    console.log(commandTab)
    if (commandTab == id) {
      App._post("circle/comments/comment", {
        cid: e.currentTarget.dataset.id,
        content: that.data.textarea_val,
        type: 2,
        id: that.data.heart_id
      }, function (res) {       
        that.setData({
          textarea_val: '',
          list: res.data.list,
        })
        
      })
    }
  },
  //跳转到详情页
  heart(e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    console.log(that.data.heart_id)
    App._post('circle/index/praise', {
      id: that.data.heart_id,
      type: 1,
    }, function (result) {
      console.log(result)
      if (result.code == 1) {
        that.setData({
          ifShow: true,
          ifGood: false
        })
        qq.showToast({
          title: '点赞成功',
        })
      } else if (result.code == 2) {
        that.setData({
          ifShow: false,
          ifGood: true
        })
        qq.showToast({
          title: '取消成功',
        })
      }
    })
  },
  input_val(e) {
    console.log(e)
    var that = this
    var input_val = e.detail.value
    that.setData({
      input_val: input_val
    })
  },
  reply(e) {
    if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
      return;
    }
    var that = this
    var content = that.data.input_val
    App._post("circle/comments/comment", {
      id: that.data.heart_id,
      content: content,
      type: 1
    }, function (res) {
      console.log(res)
      that.setData({
       list:res.data.list,
      
      })
      if (res.code == 1) {
        console.log(res)
        qq.showToast({
          title: res.msg,
        })
        setTimeout(function () {
          that.setData({
            input_val: ''
          })
        }, 200)
      }
    })
  },

})