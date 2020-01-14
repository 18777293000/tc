// pages/reservation/reservation.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      data1: "8:00-9:00",
      data2: "已过期",
      bgc: "#e5e5e5",
    }, {
      data1: "9:00-10:00",
      data2: "预约已满",
      bgc: "#e5e5e5",
    }, {
      data1: "9:00-10:00",
      data2: "科目三",
      data3: "预约",
      // imgurl:"",
      bgc: "#e5e5e5",
    }, {
      data1: "预约",
      data2: "预约",
      data3: "预约",
      bgc: "#e5e5e5",
    }, {
      data1: "预约",
      data2: "预约",
      data3: "预约",
      bgc: "#e5e5e5",
    }, {
      data1: "预约",
      data2: "预约",
      data3: "预约",
      bgc: "#e5e5e5",
    }],
    tel: "18629766789",

    year: 0,
    month: 0,
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;

    that.dateInit();
    that.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
  },

  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                        //需要遍历的日历数组数据
    let arrLen = 0;                            //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();                  //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    that.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      that.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      that.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },

  bind(e) {
    console.log(e)
  },

  //点击拨打电话
  claaPhone(e) {
    console.log(e)
    let tel = e.currentTarget.dataset.tel;
    qq.makePhoneCall({ phoneNumber: tel });
  }
})