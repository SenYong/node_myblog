<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                  <h2><a href="{:U('/say')}">畅所欲言</a></h2>
                  <div id="list" v-if="list.length > 0"> 
                     <div class="mood" v-for="(item, index) in list">
                        <span class="tutime">{{item.s_time}}</span>
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
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import vPagination from './public/pagination';
    import { getSayList } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                list: [],
                baseUrl,
                total: 0,     // 记录总条数
                page: 7,   // 每页显示条数
                current: 1,   // 当前的页数
            }
        },
        components: {headTop, headRight, headFoot, vPagination},
        created(){
           this.getData(this.current - 1, this.page);
        },
        methods: {
            async getData(num,page){
                var res = JSON.parse(await getSayList({num,page}));
                if(res.errcode == 0){
                  if(res.data.length > 0){
                    for(var i = 0; i < res.data.length; i++){
                       res.data[i]['s_time'] = this.timestampToTime(res.data[i]['s_time']);
                    }
                    this.list = res.data;
                    this.total = res.total;
                  }
                }else{
                  this.$message.error(res.msg);
                }
            },
            sayTo(id){
               this.$router.push({ path: '/sayInfo', query: {id}});
            },
            //查看更多
            getMore(){
               this.num += 1;
               this.getData(this.num * this.page, this.page);
            },
            async pagechange (currentPage){
               this.getData((currentPage - 1) * this.page, this.page);
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