<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">Order Submit Success，Please Pay Now！OrderNo：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">Pay Amount：</em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">Wechat Pay</div>
        <div class="fl sao">
          <p class="red">Please Scan Using Wechat Pay.</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>Please Scan Using Wechat Pay</p>
              <p>Scan QR code to Pay</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> Other payment method</a></p> -->
        
      </div>
    </div>
  </div>
</template>
<script>
import ordersApi from '@/api/orders'
export default {
     asyncData({ params, error }) {
         return ordersApi.createNative(params.pid)
            .then(response => {
                return {
                      payObj: response.data.data
                    }
            })
     },
     data() {
         return {
             timer1:''
         }
     },
     //每隔三秒调用一次查询订单状态的方法
     mounted() {//页面渲染之后执行
        this.timer1 = setInterval(() => {
            this.queryOrderStatus(this.payObj.out_trade_no)
        },3000);
     },
     methods:{
         queryOrderStatus(orderNo) {
             ordersApi.queryPayStatus(orderNo)
                .then(response => {
                     if (response.data.success) {
                        //支付成功，清除定时器
                        clearInterval(this.timer1)
                        //提示
                        this.$message({
                            type: 'success',
                            message: 'Pay Success!'
                        })
                        //跳转回到课程详情页面
                        this.$router.push({path: '/course/' + this.payObj.course_id})
                     }
                })
         }
     }
}
</script>