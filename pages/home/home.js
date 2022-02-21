// pages/home/home.js
const db = wx.cloud.database();
const bannersDb = db.collection('banners');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    searchword: '',
    boxs: [{
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp",
        "name": "京东超市"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp",
        "name": "数码电器"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp",
        "name": "京东服饰"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp",
        "name": "京东生鲜"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/116602/7/11200/3796/5efbf375Ebba41029/f07cc166f368fa05.png.webp",
        "name": "京东到家"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/146390/3/1846/4909/5efbf39aEe5f5f797/300071558a9ab078.png.webp",
        "name": "充值缴费"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/150351/19/14167/6853/5fed882dE195ef673/b2aa7d67e675baf8.png.webp",
        "name": "9.9元拼"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/113589/24/11332/4897/5efbf3feE705d87db/e5c12d5e943266b9.png.webp",
        "name": "领券"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129184/28/5977/3711/5efbf53aE2c2e6a07/7db529ce0e00838f.png.webp",
        "name": "借钱"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/123730/37/5924/4189/5efbf567E0a226121/d04df7c74c87cf68.png.webp",
        "name": "PLUS会员"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/142596/7/1864/4759/5efbf5a9E60c62b8a/49cdd24cb2bfecf5.png.webp",
        "name": "京东国际"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/125193/15/5993/3443/5efbf5dbEa3327124/a4282d5cb2879c8b.png.webp",
        "name": "京东拍卖"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/133947/24/3428/4213/5efbf625E7e1b4e98/95fda84d8748f88d.png.webp",
        "name": "唯品会"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/145692/9/1817/4493/5efbf652E61c4f3ec/722840c121d67fc6.png.webp",
        "name": "玩3C"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/118396/30/11271/2692/5efbf680Eb3a3cf32/c3e85c4d99746400.png.webp",
        "name": "沃尔玛"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/123571/19/6008/3747/5efbf6b2E03153a36/9ddc9036ba1c11a1.png.webp",
        "name": "美妆馆"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/115003/18/11199/3519/5efbf6eaEe59cb7f6/dab44230606cd112.png.webp",
        "name": "京东旅行"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/142258/17/1800/4509/5efbf70aEb23e164e/61aaea8fe5221081.png.webp",
        "name": "拍拍二手"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/116056/30/11288/4223/5efbf753Ee7cf2cd7/3977b5fe42b136e4.png.webp",
        "name": "物流查询"
      },
      {
        "url": "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/112559/35/11283/3523/5efbf774E285d108b/c0fa626df4979a21.png.webp",
        "name": "全部"
      }
    ],
    computedBoxs: [],
    skus: [],
    pi: 1
  },
  group(array, subGroupLength) {
    var index = 0;
    var newArray = [];

    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }

    return newArray;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      computedBoxs: this.group(this.data.boxs, 10)
    })
    let banners = wx.getStorageSync('banners')
    if (!banners) {
      bannersDb.get().then(res => {
        // res.data 包含该记录的数据
        console.log('获取数据库数据 =>', res.data)
        this.setData({
          banners: res.data.map((item) => item.url)
        })
        wx.setStorage({
          key: "banners",
          data: JSON.stringify(this.data.banners)
        })

      })

    } else {
      banners=JSON.parse(banners)
      this.setData({
        banners
      })
    }

    this.loadSkus();
    let jdurl = "https://wq.jd.com/bases/searchpromptwords/searchpromptwords?_=1616296742666&sceneval=2&callback=jsonpCBKA"
    wx.request({
      url: jdurl,

      success: res => {
        console.log(res.data);
        let jsonp = res.data.match(/jsonpCBKA\((.+)\)/s)[1]
        let data = JSON.parse(jsonp)
        let searchwords = data.searchwords.map(o => o.showword)
        console.log(searchwords);
        var setSearchword = () => {
          var i = searchwords.findIndex(o => this.data.searchword == o);
          if (i == searchwords.length - 1 || i == -1) {
            i = 0
          } else {
            i += 1
          };
          this.setData({
            searchword: searchwords[i]
          })
        }
        setSearchword()
        setInterval(setSearchword, 3000)

      },
      fail: console.error
    })
  },

  loadSkus() {

    let recInfoURL = `https://wq.jd.com/mcoss/reclike/getrecinfo?pi=${this.data.pi}&pc=22&recpos=6163&hi=%7Bpage%3A1%2Cpagesize%3A22%7D&callback=Zepto`
    this.setData({
      pi: this.data.pi + 1
    });
    wx.request({
      url: recInfoURL,
      success: res => {
        let data = JSON.parse(res.data.match(/Zepto\((.+)\)/s)[1])
        let skus = data.data.map((val) => {
          return {
            imgURL: `//img10.360buyimg.com/mobilecms/s372x372_${val.img}`,
            text: val.t,
            price: parseInt(val.jp) / 100,
            iconURL: {
              // 京东超市
              '1': "https://img11.360buyimg.com/jdphoto/s102x28_jfs/t14512/288/2659278877/2368/8468a10d/5aadf9daNd4909ddc.png",
              // 京东自营
              '2': 'https://img10.360buyimg.com/jdphoto/jfs/t1/67472/23/16111/1062/5dd66228Ed3249693/c561eee12d153d56.png',
              // 京东拍拍
              '3': "https://img14.360buyimg.com/jdphoto/jfs/t1/7605/21/9142/883/5c1362fdE4d010841/09f47f48c32aca13.png",
              // 京东物流
              '4': "https://img11.360buyimg.com/jdphoto/s98x28_jfs/t16411/341/2502946085/2662/c4af0771/5aadf9daN1916b3f2.png",
              // 京东精选
              '11': "https://img11.360buyimg.com/jdphoto/s100x28_jfs/t15376/77/2643750731/2688/443ac7d3/5aadf9daNc1b92ee6.png"
            } [val.icon],
            priceTag: {
              // '0':"菜辉精选",
              '1': "满减",
              // '2': "",
              '3': "闪购",
              '4': "新品"
            } [val.paicon]
          }
        })

        this.setData({
          skus: [...this.data.skus, ...skus]
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadSkus()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navTo: function () {
    wx.navigateTo({
      url: `/pages/search/search?kw=${this.data.searchword}`,
    })
  }
})