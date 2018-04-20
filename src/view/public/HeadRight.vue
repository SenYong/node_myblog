<template>
    <div>
        <aside>
              <div class="tuijian">
                <h2>最新文章</h2>
                <ol>
                  <li v-for="(item, index) in art"><span><strong>{{index+1}}</strong></span><a @click="navTo('/artInfo', item.a_id)" class="cur">{{item.a_name}}</a></li>
                </ol>
              </div>
             <div class="toppic">
                <h2>最新说说</h2>
                <ul>
                  <li v-for="(item, index) in say">
                     <!--<a class="cur" @click="navTo('/sayInfo', item.s_id)"><img :src="baseUrl+item.s_img" class="sayImg"><span v-html="emoji(item.s_content)"></span><p>伤不起</p></a>-->
                     <a class="cur" @click="navTo('/sayInfo', item.s_id)"><img :src="baseUrl+item.s_img" class="sayImg"><span></span><p>伤不起</p></a>
                  </li>
                </ul>
              </div>
              <div class="clicks">
                <h2>最新日志</h2>
                <ol>
                  <li v-for="(item, index) in log"><span><a class="cur" @click="navTo('/journalInfo', item.l_id)">慢生活</a></span><a class="cur">{{item.l_name}}</a></li>
                </ol>
              </div>
              <!--  <div class="search">
                <form class="searchform">
                   <input type="text" v-model="search" @focus="onfocus" @blur="onblur">
                </form>
              </div>
              <div class="viny">
                <dl>
                  <dt class="art"><img :src="songInfo.songImgUrl" alt="专辑"></dt>
                  <dd class="icon-song"><span></span>{{songInfo.title}}</dd>
                  <dd class="icon-artist"><span></span>歌手：{{songInfo.author}}</dd>
                  <dd class="icon-album"><span></span>所属专辑：《赵小雷》</dd>
                  <dd class="icon-like"><span></span><a href="/">喜欢</a></dd>
                  <dd class="music">
                    <audio :src="songInfo.audioUrl" controls autoplay></audio>
                  </dd>
                </dl>
              </div>
              -->
        </aside>
    </div>
</template>

<script type="text/javascript">
   import {mapGetters} from 'vuex'
   import { baseUrl } from '@/config/env';
   export default{
      data(){
        return{
            baseUrl
        }
      },
      computed:{
        ...mapGetters(['art', 'log', 'say', 'rank', 'info'])
      }
   }
</script>