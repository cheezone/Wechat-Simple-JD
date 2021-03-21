// pages/admin/admin.js
const db = wx.cloud.database();
const banners = db.collection('banners');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    fileIDs: [],
    fileList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  chooseImage: function () {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.group('选择 Image')
        console.log(res)
        console.groupEnd()
        this.setData({
          banners: res.tempFilePaths
        })
        wx.showToast({
          title:  '√'
        })

      }
    })
  },

  uploadImage: function () {
    console.group('上传 Image')
    console.log('进入函数');
    console.log('banners=>', this.data.banners);
    this.data.banners.forEach(banner => {
      console.log('进入循环',banner);

      wx.cloud.uploadFile({
        filePath: banner,
        cloudPath: banner.replace('http://tmp/', ''),
        success:(res) =>{

          let fileIDs = this.data.fileIDs
          fileIDs.push(res.fileID)
          console.log(res)
          console.log(res.fileID);
          console.log('fileIDs->', fileIDs);
          console.groupEnd()
          this.setData({
            fileIDs:fileIDs
          })

        },
        fail: console.error
      })
    });


  },

  pubImage: function () {
    wx.cloud.getTempFileURL({
      fileList: this.data.fileIDs,
      success: res => {
        // fileList 是一个有如下结构的对象数组
        // [{
        //    fileID: 'cloud://xxx.png', // 文件 ID
        //    tempFileURL: '', // 临时文件网络链接
        //    maxAge: 120 * 60 * 1000, // 有效期
        // }]
        let fileList = res.fileList
        this.setData({
          fileList
        })
        console.log('fileList=>', res.fileList)
        banners.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            url:this.data.fileList[0].tempFileURL
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          },
          fail:console.error
        })
      
      },
      fail: console.error
    })

  },
  deleteImage(){
    wx.cloud.deleteFile({
      fileList: this.data.fileList.map(o=>o.fileID),
      success: res => {
        // handle success
        wx.showToast({
          title: '删除成功',
        })
        console.log('删除后：',res.fileList)
      },
      fail: console.error
    })
 
  }
,insImage(){
 }

})