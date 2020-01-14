// pages/user/enter/index.js
Page({
  skip(e){
    let page = e.currentTarget.dataset.page;
    let pad = this.data.pad;
    var id = this.data.id
    let url;
    switch(page){
      case "merchant":
        url = "/pages/user/enter/merchant/index";
       break;
      case "staff":
        url = "/pages/user/enter/staff/index";
        break;
      case "jump":
        url = "/pages/user/enter/errand/index";
        break;
      case "facilitator":
        url = "/pages/user/enter/facilitator/index";
        break;
    }
    qq.navigateTo({ url })
  },
})