// pages/menu/menu.js
var menuList = require("../../resources/localDatabase/menuList.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        toView: "content_title",
        scrollTop: 0,
        totalPrice: 0,
        cartMap: {},
        loading: true,
        selectedCategory: null,
        whenToEat: 'now',
        showShoppingCart: false,
        packageFee: 3,
        loadingSuccess:false,
        categories: [

        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000
    },
    changeIndicatorDots(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    onRetryClicked(e){
        this.setData(
            {
                categories: [],
                loading: true,
                loadingSuccess: false
            });
        this.loadingData(this.data.whenToEat);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.loadingData(options.whenToEat);
    },
    loadingData(whenToEat){
        setTimeout(() => {
            this.setData(
                {
                    categories: menuList.categories,
                    loading: false,
                    selectedCategory: menuList.categories[0],
                    whenToEat: whenToEat,
                    loadingSuccess: Math.random()>0.6
                });
        }, 1000);
    },
    tap(e) {
        for (let i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    onSubingDishClicked(e) {
        const product = e.currentTarget.dataset.product;

        let totalPrice = this.data.totalPrice;
        const cartMap = this.data.cartMap;
        let productStored = cartMap[this.getHashKey(product)];
        if (productStored === null || productStored === undefined || productStored.quantity === 0) {
            delete cartMap[this.getHashKey(product)];
        } else {
            const price = parseFloat(Number(product.price).toFixed(2));
            const calcQuantity = productStored.quantity - 1;
            if (calcQuantity === 0) {
                delete cartMap[this.getHashKey(product)];
            } else {
                const subTotal = (calcQuantity * price).toFixed(2);
                cartMap[this.getHashKey(product)] = {
                    product: product,
                    quantity: calcQuantity,
                    subTotal: subTotal
                }
            }

            totalPrice = parseFloat(Number(this.data.totalPrice - price).toFixed(2));
        }
        if (Object.keys(this.data.cartMap).length === 0) {
            this.setData({
                showShoppingCart: false
            });
        }
        this.setData({
            totalPrice: totalPrice,
            cartMap: cartMap
        });

    },
    onAddingDishClicked(e) {
        const product = e.currentTarget.dataset.product;

        const price = parseFloat(Number(product.price).toFixed(2));
        const totalPrice = parseFloat(Number(this.data.totalPrice + price).toFixed(2));
        const cartMap = this.data.cartMap;
        let productStored = cartMap[this.getHashKey(product)];
        if (productStored === null || productStored === undefined) {
            cartMap[this.getHashKey(product)] = {
                product: product,
                quantity: 1,
                subTotal: price
            }
        } else {
            const calcQuantity = productStored.quantity + 1;
            const subTotal = (calcQuantity * price).toFixed(2);

            cartMap[this.getHashKey(product)] = {
                product: product,
                quantity: calcQuantity,
                subTotal: subTotal,
            }
        }
        this.setData({
            totalPrice: totalPrice,
            cartMap: cartMap
        });

    },
    onShoppingCartContentClicked(e) {

    },
    onCheckoutClicked(e) {
        if (Object.keys(this.data.cartMap).length === 0) {
            wx.showToast({
                title: '购物车还是空的哦.',
                icon: 'none',
                duration: 1000
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/checkout/checkout'
        });
    },
    onMenuLeftClicked(e) {
        const category = e.currentTarget.dataset.category;
        this.setData({
            toView: "cate_" + category.id,
            selectedCategory: category
        })

    },

    getHashKey(product) {
        // some unique object-dependent key
        return product.id;
    },
    onCloseShoppingCart(e) {
        this.setData({
            showShoppingCart: false
        });
    },
    onShowShoppingCart(e) {

        if (Object.keys(this.data.cartMap).length === 0) {
            return;
        }
        this.setData({
            showShoppingCart: !this.data.showShoppingCart,
        });
    },

    onEmptyCartClicked(e) {
        this.setData({
            cartMap: {},
            showShoppingCart: false,
            totalPrice: 0
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