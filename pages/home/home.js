// pages/home/home.js
const db = wx.cloud.database();
const banners = db.collection('banners');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    banners.get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      this.setData({
        banners: res.data.map((item) => item.url)
      })
    })
    let qqurl="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923"
    let jdurl="https://wq.jd.com/bases/searchpromptwords/searchpromptwords?_=1616296742666&sceneval=2&callback=jsonpCBKA"
    wx.request({
      url: qqurl,

      success: res => {
        console.log(res)

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

  }
})