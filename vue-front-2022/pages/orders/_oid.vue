<template>
    <div class="Page Confirm">
        <div class="Title">
            <h1 class="fl f18">Order Confirmation</h1>
            <img src="~/assets/img/cart_setp1.png" class="fr" />
            <div class="clear"></div>
        </div>
        <form name="flowForm" id="flowForm" method="post" action="">
            <table class="GoodList">
                <tbody>
                    <tr>
                        <th class="name">Course</th>
                        <th class="price">Unit Price</th>
                        <th class="priceNew">Price</th>
                    </tr>
                </tbody>
                <tbody>
                    <!-- <tr>
<td colspan="3" class="Title red f18 fb"><p>Discount</p></td>
</tr> -->
                    <tr>
                        <td colspan="3" class="teacher">Instructor：{{ order.teacherName }}</td>
                    </tr>
                    <tr class="good">
                        <td class="name First">
                            <a
                               target="_blank"
                               :href="'https://localhost:3000/course/' + order.courseId"
                               >
                                <img :src="order.courseCover"
                                     /></a>
                            <div class="goodInfo">
                                <input type="hidden" class="ids ids_14502" value="14502" />
                                <a
                                   target="_blank"
                                   :href="'https://localhost:3000/course/' + order.courseId"
                                   >{{ order.courseTitle }}</a
                                    >
                            </div>
                        </td>
                        <td class="price">
                            <p>
                                ￥<strong>{{ order.totalFee }}</strong>
                            </p>
                            <!-- <span class="discName red">限时8折</span> -->
                        </td>
                        <td class="red priceNew Last">
                            ￥<strong>{{ order.totalFee }}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td class="Billing tr" colspan="3">
                            <div class="tr">
                                <p>
                                    Total <strong class="red">1</strong> product，Total<span
                                                                                 class="red f20"
                                                                                 >$<strong>{{ order.totalFee }}</strong></span
                                    >
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="Finish">
                <div class="fr" id="AgreeDiv">
                    <label for="Agree"
                           ><p class="on">
                        <input type="checkbox" checked="checked" />I agree with<a
                                                                             href="javascript:"
                                                                             target="_blank"
                                                                             >《GuideLine Agreement》</a
                        >
                        </p></label
                        >
                </div>
                <div class="clear"></div>
                <div class="Main fl">
                    <div class="fl">
                        <a :href="'/course/' + order.courseId">Back To Course Detail Page</a>
                    </div>
                    <div class="fr">
                        <p>
                            Total <strong class="red">1</strong> product，Total<span
                                                                         class="red f20"
                                                                         >$ <strong id="AllPrice">{{ order.totalFee }}</strong></span
                            >
                        </p>
                    </div>
                </div>
                <input name="score" value="0" type="hidden" id="usedScore" />
                <button class="fr redb" type="button" id="submitPay" @click="toPay()">
                    Pay Now
                </button>
                <div class="clear"></div>
            </div>
        </form>
    </div>
</template>

<script>
import ordersApi from '@/api/orders'

export default {
 asyncData({ params, error }) {
    return ordersApi.getOrdersInfo(params.oid)
        .then(response =>{
            return{
                order: response.data.data.item
            }
        })
 },
 methods:{
    //payment
    toPay(){
        ordersApi.updateBuyCount(this.order.courseId)
                .then(response => {
                     if (response.data.success) {
                        this.$router.push({path:'/pay/'+this.order.orderNo})
                     }
                })
    }
 }
}
</script>
