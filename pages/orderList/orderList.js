//logs.js
const util = require('../../utils/util.js')
var postsData = require('../../resources/localDatabase/orderList.js');
Page({
  data: {
      currentTab: 0,
      orders:[],
      loading:true,
      loadingSuccess:false,
  },
  onLoad: function () {
      this.loadingData();
  },
    onRetryClicked(e){
        this.setData({
            orders: [],
            loading: true,
            loadingSuccess: false,
        })
        this.loadingData();
    },
    loadingData(){
        setTimeout(() => {

            var orders = postsData.orders;
            var loadingSuccess=Math.random() > 0.6;
            this.setData({
                orders: orders,
                loading: false,
                loadingSuccess: true,
            })

        }, 1000)
    },
    onOrderDetailClicked(e){
        
        wx.navigateTo({
            url: '/pages/orderDetail/orderDetail?orderId='+e.currentTarget.dataset.order.id,
        })
    },
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})
