<template>
    <div>
        <head-top></head-top>
        <div id="mainbody">
          <div class="info">
            <figure> <img src="../images/log.png"  alt="Panama Hat">
              <figcaption><strong>幸福原来离你不远</strong> 人生并不在于获取，更在于放得下。放下一粒种子，收获一棵大树;放下一处烦恼，收获一个惊喜;放下一种偏见，收获一种幸福;放下一种执著，收获一种自在。放下既是一种理性抉择，也是一种豁达美。只要看得开、放得下，何愁没有快乐的春莺在啼鸣，何愁没有快乐的泉溪在歌唱，何愁没有快乐的鲜花绽放</figcaption>
            </figure>
            <div class="card">
              <h1>我的名片</h1>
              <p>姓名：{{info.username}}</p>
              <p>网名：{{info.netname}}</p>
              <p>职业：{{info.profession}}</p>
              <p>QQ：{{info.qq}}</p>
              <ul class="linkmore">
                <li><a @click="pageTo('/board')" class="talk" title="给我留言"></a></li>
                <li><a @click="pageTo('/abouts')" class="address" title="关于我"></a></li>
                <!--<li><a href="/" class="email" title="给我写信"></a></li>-->
                <!--<li><a href="/" class="photos" title="生活照片"></a></li>-->
                <li><a href="/" class="heart" title="关注我"></a></li>
              </ul>
            </div>
          </div>
          <!--info end-->
          <div class="blank"></div>
          <div class="blog">
                <ul class="bloglist">
                  <li v-for="(item, index) in list">
                    <div class="arrow_box">
                      <div class="ti"></div>
                      <div class="ci"></div>
                      <h2 class="titles"><a @click="logTo(item.l_id)" target="_blank">{{item.l_name}}</a></h2>
                      <ul class="textinfo">
                        <a href="/"><img :src="baseUrl+item.l_img"></a>
                        <p>{{item.l_desc}}</p>
                      </ul>
                      <ul class="details">
                        <li class="likes"><a href="#">{{item.l_hit}}</a></li>
                        <li class="comments"><a href="#">{{item.l_num}}</a></li>
                        <li class="icon-time"><a href="#">{{item.l_time}}</a></li>
                      </ul>
                    </div>
                  </li>
                  <li><v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination></li>
                </ul>
                <!--bloglist end-->
                <head-right></head-right>
            </div>
        </div>
        <head-foot></head-foot>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import vPagination from './public/pagination';
    import { getLogList, getInfo } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
       data(){
         return {
            list: [],
            baseUrl,
            isShow: true,
            info: "",
            total: 0,     // 记录总条数
            page: 7,   // 每页显示条数
            current: 1,   // 当前的页数
         }
       },
       components: {headTop, headRight, headFoot, vPagination},
       created(){
          this.getData(this.current - 1, this.page);
       },
       methods:{
          async getData(num, page){
            Promise.all([getLogList({num,page}), getInfo()]).then(res => {
                for(let i = 0; i < res.length; i++){
                    res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                    if(res[0].data.length > 0){
                        for(var i = 0; i < res[0].data.length; i++){
                           res[0].data[i]['l_time'] = this.timestampToTime(res[0].data[i]['l_time']);
                        }
                        this.isShow = true;
                        this.list = res[0].data;
                        this.total = res[0].total;
                    }else{
                        this.isShow = false;
                    } 
                }
                if(res[1].errcode == 0){
                    this.info = res[1].data[0];
                }
            })
          },
          logTo(id){
             this.$router.push({ path: '/journalInfo', query: {id}});
          },
          async pagechange (currentPage){
             var res = JSON.parse(await getLogList({num: (currentPage - 1) * this.page, page: this.page}));
             if(res.errcode == 0){
                for(var i = 0; i < res.data.length; i++){
                  res.data[i]['l_time'] = this.timestampToTime(res.data[i]['l_time']);
                }
                this.list = res.data;
             }
          }
       }
    }
</script>