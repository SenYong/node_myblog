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
                      <h2 class="titles"><a @click="artDetail(item.a_id)" target="_blank" class="cur">{{item.a_name}}</a></h2>
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
                </ul>
                <!--bloglist end-->
                <head-right></head-right>
            </div>
        </div>
        <head-foot></head-foot>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';  
import { getArticle } from '@/api/index';
import { baseUrl } from '@/config/env';
import headTop from './public/HeadTop';
import headRight from './public/HeadRight';
import headFoot from './public/HeadFoot';
export default {
  data() {
    return {
        page: 0,
        num: 8,
        list: [],
        baseUrl
    }
  },
  components: {headRight, headTop, headFoot},
  computed:{
    ...mapGetters(['art', 'log', 'say', 'rank', 'info'])
  },
  created() {
    this.fetchData(this.page,this.num);
  },
  methods: {
    ...mapActions(['newArt']),
    fetchData(page, num) {
      getArticle(page, num).then(res => {
         if(res.code == 0){
            for(let i = 0; i < res.data[0].length; i++){
              res.data[0][i]["a_time"] = this.timestampToTime(res.data[0][i]["a_time"]);
            }
            this.list = res.data[0];
         }
      })
    },
    artDetail(id){
        this.$router.push({ path: '/artInfo', query: {id}});
    }
  }
}
</script>