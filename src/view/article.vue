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
                      <h2 class="titles"><a @click="artDetail(item.a_id)" target="_blank">{{item.a_name}}</a></h2>
                      <ul class="textinfo">
                        <a href="/"><img :src="baseUrl+item.a_img"></a>
                        <p> {{item.a_desc}}</p>
                      </ul>
                      <ul class="details">
                        <li class="likes"><a href="#">{{item.a_hit}}</a></li>
                        <li class="comments"><a href="#">{{item.a_num}}</a></li>
                        <li class="icon-time"><a href="#">{{timestampToTime(item.a_time)}}</a></li>
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
    import { mapGetters } from 'vuex'
    import { getArtList } from '@/api/article' 
    import {baseUrl} from '@/config/env'
    import headTop from './public/HeadTop'
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import vPagination from './public/pagination';
    export default{
      data(){
        return {
          page: 0,
          num: 7,
          list: [],
          baseUrl,
          total: 0,
          current: 1,
        }
      },
      computed:{
        ...mapGetters(['info'])
      },
      components: {headTop, headRight, headFoot, vPagination},
      created () {
        this.init(this.page, this.num)
      },
      methods:{
        init (page, num) {
          getArtList(page, num).then(res => {
            if(res.code == 0){
              this.total = res.data[1][0].num
              this.list = res.data[0];
            }
          }).catch(err => {
              this.$message.error(err)
          })
        },
        pagechange(currentPage){
          this.init(currentPage - 1, this.num)
        },
        artDetail(id){
          this.$router.push({ path: '/artInfo', query: {id}});
        }
      }
    }
</script>