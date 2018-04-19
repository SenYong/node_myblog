<template>
    <div>
        <div class="mainbody">
          <div class="info">
              <figure> <img src="../images/index.png"  alt="Panama Hat">
              <figcaption><strong>致我们终将逝去的青春</strong> 这个世界上总有那么一个人，是你的念想，是你的温暖。就算她不远不近，只要想到她，就永远会觉得安定，觉得踏实，觉得心里有底。甚至连周围的空气，都变得笃定。世界只是一些影影绰绰的温柔。河还是原来的河，人还是原来的人。我仍然为你守候，那些小幸福，我认真，你随意。</figcaption>
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
           </div>
        </div>
    </div>
</template>

<script>
import { getArticle } from '../api/index';
import { baseUrl } from '../config/env';
export default {
  data() {
    return {
        page: 0,
        num: 8,
        list: [],
        info: {},
        baseUrl
    }
  },
  created() {
    this.fetchData(this.page,this.num)
  },
  methods: {
    fetchData(page, num) {
      getArticle(page, num).then(res => {
         if(res.code == 0){
            for(let i = 0; i < res.data.length; i++){
              res.data[i]["a_time"] = this.timestampToTime(res.data[i]["a_time"]);
            }
            this.list = res.data;
         }
      })
    }
  }
}
</script>