<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                  <h2><a href="{:U('/say')}">畅所欲言</a></h2>
                  <div id="list" v-if="list.length > 0"> 
                     <div class="mood" v-for="(item, index) in list">
                        <span class="tutime">{{timestampToTime(item.s_time)}}</span>
                        <p class="p1"><a style="cursor:pointer" @click="sayTo(item.s_id)" class="cont" v-html="emoji(item.s_content)"></a></p>
                        <img :src="baseUrl+item.s_img" class="sayImg" v-if="item.s_img">
                        <p class="p2"><a class="span1" href="">浏览({{item.s_hit}})</a><a class="span2" href="">评论({{item.s_num}})</a></p>
                      </div>
                  </div>
                  <div class="more" v-else>暂无说说</div>
                  <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
               </div><!--topnews-->
            </div><!--l_box f_l-->
            <head-right></head-right>
        </article>
        <div class="clear"></div>
        <head-foot></head-foot>
    </div>
</template>

<script type="text/javascript">
    import { getSayList } from '@/api/say'
    import { baseUrl } from '@/config/env';
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import vPagination from './public/pagination';
   
    export default{
        data(){
            return {
                list: [],
                baseUrl,
                total: 0,     
                page: 0,  
                num: 7,
                current: 1,   // 当前的页数
            }
        },
        components: {headTop, headRight, headFoot, vPagination},
        created(){
            this.init(this.page, this.num)
        },
        methods: {
            init(page, num){
               getSayList(page, num).then(res => {
                  if(res.code == 0){
                     this.total = res.data[1][0].num;
                     this.list = res.data[0];
                  }
               }).catch(err => {
                  this.$message.error(err)
               })
            },
            pagechange(current){
               this.init(current-1, this.num)
            },
            sayTo(id){
               this.$router.push({path: '/sayInfo', query:{id}})
            }
        }
    }
</script>

<style>
    .sayImg{
      width:150px;
      height:150px;
      margin-bottom:20px;  
    }
</style>