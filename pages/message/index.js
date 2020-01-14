
let App = getApp();
//引入文件
Page({
  data: {    
    banner: [],
    listData:[
    ],
    textarea_val:''
  },
  onLoad: function (options) {
    let that = this;
    ///加载轮播图
    App._get('circle/index/bannerList', {}, function (result) {
      that.setData({
        banner: result.data.bannerList,
      });
    });
  },
  onShow:function(){
    let that = this;
    /*if (!App.globalData.userInfo) {
      App.showError("请登录后再操作", function () {
        App.login();
      });
    }else{*/
      App._get('circle/index/index', {}, function (result) {
        that.setData({
          listData: result.data.list,
        });
      });
    // }
  },
 //跳转到详情页
  heart(e) {
    console.log(e)
    const vm = this;
    const _index = e.currentTarget.dataset.index;

    let _msg = [...vm.data.listData]; // msg的引用
    _msg[_index]['show'] = !vm.data.listData[_index]['show'];
    console.log(vm.data.listData[_index]['show']);
    if (vm.data.listData[_index]['show'] == true) {
      console.log(vm.data.listData[_index].likes++);
    } else {
      console.log(vm.data.listData[_index].likes--);
    }
    vm.setData({
      listData: _msg,
    })
    var id = e.currentTarget.dataset.id
    App._post('circle/index/praise', {
      id:id,
      type:1,
    }, function (result) {
      console.log(result)
    })
  },
/**页面跳转 */
go:function(e){
  var id = e.currentTarget.dataset.id
  qq.navigateTo({
    url: './detail/index?id='+id,
     })
},})