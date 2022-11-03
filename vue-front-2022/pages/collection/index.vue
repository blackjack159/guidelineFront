<template>
    <div class="Page Confirm">


        
        <form name="flowForm" id="flowForm" method="post" action="">

            <aside class="h-r-search">

              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="Course Title..."
                  v-model="collection.courseId"
                  value
                />
               <a @click="search()" href="#" class="s-btn" >
                <em class="icon18">&nbsp;</em>
              </a>
                <!-- <button @click="search()" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button> -->
                
              </label>

          </aside>

        <div class="Title">

            <h1 class="fl f18">Course Collection </h1>
            <!-- <img src="~/assets/img/cart_setp2.png" class="fr" /> -->
            <div class="clear"></div>
        </div>
        


            <table class="GoodList">
                <tbody>
                    <tr>
                        <th class="name">Course</th>
                        <th class="price">Instructor</th>
                        <th class="priceNew">Price</th>

                    </tr>
                </tbody>
                

                
                <tbody v-for="collect in data.list" :key="collect.id">
                    <!-- <tr>
<td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
</tr> -->

          <!-- <section class="no-data-wrap" v-if="data.total==0"> -->
          <!-- <section v-if="data.total==0" class="no-data-wrap" >
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">There is no any course collection...</span>
          </section> -->
                    <tr>
                        <!-- <td colspan="3" class="teacher">讲师：{{ order.teacherName }}</td> -->
                         <!-- <td colspan="3" class="teacher">讲师：abc</td> -->
                    </tr>
                    <tr class="good">
                        <td class="name First">
                            <a
                               
                               :href="'/course/' + collect.id"
                               >
                                <img :src="collect.cover"
                                     /></a>
                            <div class="goodInfo">
                                <input type="hidden" class="ids ids_14502" value="14502" />
                                <a
                                    
                                   :href="'/course/' + collect.id"
                                   >{{ collect.title }}</a
                                    >
                            </div>
                                <!-- <a
                               target="_blank"
                               href="#"
                               >
                                <img src=""
                                     /></a>
                            <div class="goodInfo">
                                <input type="hidden" class="ids ids_14502" value="14502" />
                                <a
                                   target="_blank"
                                   href="#"
                                   >Good</a
                                    >
                            </div> -->
                        </td>
                        <td class="price">
                            <p>
                                <strong>{{ collect.teacherName }}</strong>
                                
                               <!-- <strong>abc</strong> -->
                            </p>
           
                        </td>

                        <td class="price">
                            <p>
                                $<strong>{{ collect.price }}</strong>
                            </p>
           
                        </td>

                    </tr>

                </tbody>
            </table>
          <section v-if="data.total==0" class="no-data-wrap" >
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">There is no any course collection...</span>
          </section>
        </form>
    </div>
</template>

<script>
import collection from '@/api/collection'
export default {
    data(){
        return {
            data:{},
            content:"",
            collection:{
                courseId: "",
            }
        }
    },
    created(){
        this.initCourseCollection();
    },
    methods:{
        initCourseCollection() {
            collection.getCollectionList()
                .then(response =>{
                    this.data = response.data.data;
                })
                
        },
        search(){
            collection.searchCollect(this.collection)
                .then(response =>{
                if(response.data.success) {
                    this.$message({
                        message: "Search Success!",
                        type: "success",
                    });
                }
                    this.data = {};
                    this.data = response.data.data;
                })
        }
    }
}
</script>