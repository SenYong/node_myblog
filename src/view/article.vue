<template>
    <div>
        <head-top></head-top>
        <div id="mainbody">
          <div class="info">
            <figure> <img src="../images/art.jpg"  alt="Panama Hat">
              <figcaption><strong>渡人如渡己，渡已，亦是渡</strong> 当我们被误解时，会花很多时间去辩白。 但没有用，没人愿意听，大家习惯按自己的所闻、理解做出判别，每个人其实都很固执。与其努力且痛苦的试图扭转别人的评判，不如默默承受，给大家多一点时间和空间去了解。而我们省下辩解的功夫，去实现自身更久远的人生价值。其实，渡人如渡己，渡已，亦是渡人。</figcaption>
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
                      <h2 class="titles"><a @click="artTo(item.a_id)" target="_blank">{{item.a_name}}</a></h2>
                      <ul class="textinfo">
                        <a href="/"><img :src="baseUrl+item.a_img"></a>
                        <p> {{item.a_desc}}</p>
                      </ul>
                      <ul class="details">
                        <li class="likes"><a href="#">{{item.a_hit}}</a></li>
                        <li class="comments"><a href="#">{{item.a_num}}</a></li>
                        <li class="icon-time"><a href="#">{{item.a_time}}</a></li>
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
    //import { getArtList, getCat, artCatList, getInfo } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
       data(){
          return {
             num: 0,
             list: [],
             cat: [],
             baseUrl,
             isShow: true,
             cid: '',
             info: "",
             total: 0,     // 记录总条数
             page: 7,   // 每页显示条数
             current: 1,   // 当前的页数
          }
       },
       components: {headTop, headRight, headFoot, vPagination},
       created(){
          this.$route.query.id ? this.catTo(this.$route.query.id) : this.getData(this.current - 1, this.page);
       },
       methods: { 
          async getData(num, page){
            Promise.all([getArtList({num, page}), getCat(), getInfo()]).then(res => {
                for(var i = 0; i < res.length; i++){
                    res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                    if(res[0].data.length > 0){
                        for(var i = 0; i < res[0].data.length; i++){
                            res[0].data[i]['a_time'] = this.timestampToTime(res[0].data[i]['a_time']);
                        }
                        this.isShow = true;
                        this.list = res[0].data;
                        this.total = res[0].total;
                    }
                }
                if(res[1].errcode == 0){
                    this.cat = res[1].data;
                }
                if(res[2].errcode == 0){
                    this.info = res[2].data[0];
                }
            })
          },
          //获取更多
          async getMore(){
             this.num += 1;
             var res = this.cid ? JSON.parse(await artCatList({id: this.cid, num: this.num * this.page, page: this.page})) : JSON.parse(await getArtList({num: this.num * this.page, page: this.page}));
             if(res.data.length > 0){
                for(var i = 0; i < res.data.length; i++){
                    res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                }
                this.list = this.list.concat(res.data); 
             }else{
                this.isShow = false;
             }
          },
          async catTo(id){
             this.num = 0;
             this.page = 10
             this.cid = id;
             var res = id ? JSON.parse(await artCatList({ id, num: this.num, page: this.page })) : JSON.parse(await getArtList({num: this.num * this.page, page: this.page}));
             if(res.errcode == 0){
                if(res.data.length > 0){
                   for(var i = 0; i < res.data.length; i++){
                      res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                   }
                   this.isShow = true 
                }else{
                   this.isShow = false 
                }
                this.list = res.data;
             }else{
                this.$message.error(res.msg);
             }
          },
          artTo(id){
             this.$router.push({ path: '/artInfo', query: {id}});
          },
          async pagechange(currentPage){
             var res = JSON.parse(await getArtList({num: (currentPage - 1) * this.page, page: this.page}));
             if(res.errcode == 0){
                for(var i = 0; i < res.data.length; i++){
                  res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                }
                this.list = res.data;
             }
          }
       }
    }
</script>