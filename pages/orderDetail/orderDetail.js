// pages/orderDetail/orderDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartMap: {},
        pickupTime: '00:00',
        phoneInputFocus: false,
        showTimePicker: true,
        wayOfEating: 'takeAway',
        phone: '',
        loading:true,
        loadingSuccess:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onRetryClicked(e) {
        this.setData({
            orders: [],
            loading: true,
            loadingSuccess: false,
        })
        this.loadingData(this.data.orderId);
    },
    onLoad: function (options) {
      /*  var whenToEat= options.whenToEat;
        var pickupTime =options.pickupTime;
        var wayOfEating =options.wayOfEating;
        var phone =options.phone;
        var orderId =options.orderId;
        var totalPrice = options.totalPrice;
        var totalCount = options.totalCount;*/

        var  orderId=options.orderId;
          //TODO 1. send request to server to get order detail.
         //2.success: loading detail
        //3. failed: retry
        this.setData({
            orderId: orderId
        })
        //TODO 页面编辑, 调用微信支付功能.
        //从订单列表页面点进来的与从商品列表点进来的不同.
        this.loadingData(orderId);
      /*  
        var pages = getCurrentPages()

        var menu = pages[pages.length - 2];
        console.log(menu.data);
        var showTimePicker = true;
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
            pickupTime: formattedHour + ":" + min,
            showTimePicker: showTimePicker
        });*/
    },

    loadingData(orderId){
     
        setTimeout(() => {
            this.setData({
                wayOfEating:'TAKE_AWAY',
                loading: false,
                loadingSuccess: true,
            })
        }, 1000)
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

    onPaymentClicked(e){
        //todo 生成订单.
        wx.requestPayment(
            {
                'timeStamp': '',
                'nonceStr': '',
                'package': '',
                'signType': 'MD5',
                'paySign': '',
                'success': function (res) {
                    console.log("success" + res);

                },
                'fail': function (res) {

                    console.log("fail" + res);
                },
                'complete': function (res) {
                    console.log("complete" + res);
                }
            })

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