// components/retry/retry.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        errorMessage:String,
        visibility:Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        errorMessage: "网络不给力?",
        visibility: Boolean
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onRetryClicked(e) {
            const myEventDetail = {} // detail对象，提供给事件监听函数
            const myEventOption = {} // 触发事件的选项
            this.triggerEvent('onRetryClicked', myEventDetail, myEventOption)
        }
    },
    
})
