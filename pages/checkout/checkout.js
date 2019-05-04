// pages/checkout/checkout.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartMap: {},
        takeawayTime: '00:00',
        phoneInputFocus: false,
        showTimePicker: true,
        wayOfEating: 'takeAway',
        phone: '',
        whenToEat: 'later',
        totalPrice: 0,
        totalCount: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var pages = getCurrentPages()

        var menu = pages[pages.length - 2];
        var showTimePicker = true;
        var whenToEat = menu.data.whenToEat;
        if (menu.data.whenToEat === 'now') {
            showTimePicker = false;

        }
        var cartMap = menu.data.cartMap;
        var quantity = 0;
        for (var key in cartMap) {

            quantity += cartMap[key].quantity;
        }
        var d = new Date();
        var hour = d.getHours() + 1;
        if (hour > 23)
            hour = "00";
        var formattedHour = ("0" + hour).slice(-2);
        var min = d.getMinutes();
        this.setData({
            cartMap: cartMap,
            totalPrice: menu.data.totalPrice,
            totalCount: quantity,
            takeawayTime: formattedHour + ":" + min,
            showTimePicker: showTimePicker,
            whenToEat: whenToEat
        });

    },
    getPhoneNumber: function(e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
    },

    onEatingInClicked(e) {

        this.setData({
            wayOfEating: 'eating_in'
        })
    },

    bindKeyInput(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    onCheckoutClicked(e) {
        var mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
        // var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;  //判断是否是座机电话
        var isMobile = mobile.exec(this.data.phone);
        if (!isMobile) {
            wx.showModal({
                title: '提示！！',
                content: '你输入的电话不符，请重新检查填写',
            })
            return;
        }
        //生成订单,返回订单详情.
        wx.redirectTo({
            url: '/pages/orderDetail/orderDetail?whenToEat=' + this.data.whenToEat + "&takeawayTime=" + this.data.takeawayTime + "&wayOfEating=" +
                this.data.wayOfEating + "&phone=" + this.data.phone + "&totalCount=" + this.data.totalCount + "&totalPrice=" +      this.data.totalPrice +
                "&orderId=" + "123123"
        });


    },
    onTakeawayClicked(e) {

        this.setData({
            wayOfEating: 'takeAway'
        })
    },
    onPhoneClicked(e) {
        this.setData({
            phoneInputFocus: true
        })
    },
    onTimeChanged(e) {

        this.setData({
            takeawayTime: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})