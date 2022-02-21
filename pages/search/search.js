// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputTxt: "",
    placeholder: "",
    suggest: [],
    hotSearchTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      placeholder: options.kw || "点击搜索按钮开始搜索"
    })

    let hotSearchURL = 'https://wq.jd.com/bases/searchhotword/GetHotWords?_=1616914779430&sceneval=2&callback=jsonpCBKB'
    wx.request({
      url: hotSearchURL,
      success: res => {
        console.log("热门搜索=>", res.data);
        let jsonp = res.data.match(/jsonpCBK.\((.+)\)/s)[1].replace(/\,+/g, ',')
        console.log("jsonp=>", jsonp);
        let data = JSON.parse(jsonp)
        let hotSearchTags = data.owner
        this.setData({
          hotSearchTags
        })
      },
      fail: console.error
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTap: function (e) {
    let inputTxt = e.currentTarget.dataset['keyword'];
    if (this.data.inputTxt != inputTxt) {
      this.setData({
        inputTxt
      })
      this.onSuggest({
        detail: {
          value: inputTxt
        }
      })
    }
  },
  onSuggest: function (e) {
    var kw = e.detail.value;
    console.log("kw=>", kw);
    if (kw) {

      let jdurl = `https://wq.jd.com/bases/searchdropdown/getdropdown?terminal=m&zip=1&key=${kw}&newjson=1&_=1616308685242&sceneval=2&callback=jsonpCBKC`
      wx.request({
        url: jdurl,

        success: res => {
          if (!kw) {
            return
          }
          console.log(res.data);
          let jsonp = res.data.match(/jsonpCBK.\((.+)\)/s)[1]
          let data = JSON.parse(jsonp)
          this.setData({
            suggest: data.filter(o => o.key)
          })


        },
        fail: console.error
      })

    } else {
      this.setData({
        suggest: []
      })
    }

  }
})