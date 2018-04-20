<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                    <h2 class="t_nav"><a href="/">网站首页</a><a href="/">慢生活</a></h2>
                    <input type="hidden" value="{$info.l_id}" id="lc_pid">
                    <input type="hidden" value="" id="lc_name">
                    <input type="hidden" value="" id="lc_img">
                    <div class="artContent">
                        <div class="artTitle">{{logData.l_name}}</div>
                        <p class="box">发布时间：{{logData.l_time}}<span>编辑：{{logData.l_root}}</span>阅读（{{logData.l_hit}}）</p>
                        <div class="info" v-html="logData.l_content"></div>
                    </div>
                    <div class="copyright_author">
                        <p>
                          <strong>版权声明：</strong>
                          本站原创文章，于{{logData.l_time}}，由
                          <a href="https://www.yezismile.com/detail/5.html" target="_blank">{{logData.l_root}}</a>
                          发表
                        </p>
                        <p class="p-hidden">
                          <strong>转载请注明：</strong>
                          <a href="https://www.yezismile.com/detail/459.html" target="_self">{{logData.l_name}}</a>
                           | 
                          <a href="https://www.fishblog.top/">小鱼博客</a>
                        </p>
                    </div>   
                    <div class="nextpage" v-if="next">
                        <b>上一篇:</b>
                        <a @click="ArtTo(next.l_id)">{{next.l_name}}</a>
                    </div>
                    <div class="nextpage" v-if="prev">
                          <b>下一篇:</b>
                          <a @click="ArtTo(prev.l_id)">{{prev.l_name}}</a>
                    </div>
                    <div class="cont">
                     <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="lc_content"></el-input>
                     <div class="icon clearfix">
                      <i class="icon iconfont icon-face" @click="showEmoji = !showEmoji"></i>
                      <el-button type="success" size="small" @click="submit" class="submit">提交</el-button>
                      <transition name="fade" mode="">
                         <div class="emoji-box" v-if="showEmoji" >
                            <el-button  class="pop-close"  :plain="true"  type="danger"  size="mini" icon="close" @click="showEmoji = false"></el-button>
                            <vue-emoji @select="selectEmoji"></vue-emoji>
                            <span class="pop-arrow arrow"></span>
                         </div>       
                      </transition>
                    </div>
                  </div>  
                  <div class="board" v-if="comment.length > 0">
                    <div class="titles">
                       <div class="lt">评论</div>
                       <div class="rt"><span>{{comment.length}}</span>人参与,<span>{{comment.length}}</span>条评论</div>
                    </div>
                      <div class="bList" v-for="(item, index) in comment">
                         <div class="lItem">
                             <img :src="baseUrl+item.lc_img" class="logo">
                             <div class="lCont">
                                <p class="p1">
                                  <span class="s1"><b class="name">{{item.lc_name}}</b>[{{item.lc_ip}}]</span>
                                  <span class="s2">{{item.lc_time}}</span>
                                </p>
                                <p class="p2" v-html="emoji(item.lc_content)"></p>
                             </div>
                         </div>
                         <div class="lItem rItem" v-if="item.lc_retime">
                           <img :src="baseUrl + item.lc_reimg" class="logo">
                           <div class="lCont">
                              <p class="p1">
                                <span class="s1"><b class="name">{{item.lc_rename}}</b>回复<b class="name1">{{item.lc_name}}</b></span>
                                <span class="s2">{{item.lc_retime}}</span>
                              </p>
                              <p class="p2" v-html="emoji(item.lc_recontent)"></p>
                           </div>
                         </div>
                      </div>
                  </div>
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
    import vueEmoji from '../components/emoji.vue';
    import { logDetail, prevLog, nextLog, getAllLogUser, addLogHit, userLogComment} from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
       data(){
          return {
             logData:{},
             prev: {},
             next: {},
             showEmoji: false,
             lc_content: '',
             data: [],
             lc_pid: '',
             comment: [],
             baseUrl
          }
       },
       components: {headTop, headRight, headFoot, vueEmoji},
       created(){
          if(this.$route.query.id){
             this.lc_pid = this.$route.query.id;
             this.getData(this.$route.query.id);
          }
       },
       methods: {
          async getData(id){
             Promise.all([ logDetail({id}), prevLog({id}), nextLog({id}), getAllLogUser({id}), addLogHit({id}) ]).then(res=>{
                for(var i = 0; i < res.length; i++){
                   res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   res[0].data.l_time = this.timestampToTime(res[0].data.l_time);
                   this.logData = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.prev = res[1].data;
                }
                if(res[2].errcode == 0){
                   this.next = res[2].data;
                }
                if(res[3].errcode == 0){
                    for(var i = 0; i < res[3].data.length; i++){
                       res[3].data[i].lc_time = this.timestampToTime(res[3].data[i].lc_time);
                       res[3].data[i].lc_retime = res[3].data[i].lc_retime ? this.timestampToTime(res[3].data[i].lc_retime) : '';
                    }
                    this.comment = res[3].data;
                }
             })
          },
          LogTo(id){
              this.$router.push({ path: '/journalInfo', query: {id}});
              Promise.all([ logDetail({id}), prevLog({id}), nextLog({id}), getAllLogUser({id}), addLogHit({id}) ]).then(res=>{
                for(var i = 0; i < res.length; i++){
                   res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   res[0].data.l_time = this.timestampToTime(res[0].data.l_time);
                   this.logData = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.prev = res[1].data;
                }
                if(res[2].errcode == 0){
                   this.next = res[2].data;
                }
                if(res[3].errcode == 0){
                    for(var i = 0; i < res[3].data.length; i++){
                       res[3].data[i].lc_time = this.timestampToTime(res[3].data[i].lc_time);
                       res[3].data[i].lc_retime = res[3].data[i].lc_retime ? this.timestampToTime(res[3].data[i].lc_retime) : '';
                    }
                    this.comment = res[3].data;
                }
             })
          },
          selectEmoji (code) {
            this.showEmoji = false
            this.lc_content += code
          },
          //提交
          async submit () {
            if(this.lc_content == ''){
               this.$message.success('回复内容不能为空');
               return false;
            }
            var data = {};
            var ran = 1 + Math.ceil(Math.random() * 199);
            data.lc_pid = this.lc_pid;
            data.lc_name = '游客';
            data.lc_img = '/public/static/default/'+ ran +'.png';
            data.lc_content = this.lc_content;
            var res = JSON.parse(await userLogComment(data));
            if(res.errcode == 0){
               var allUser = JSON.parse(await(getAllLogUser({id: this.lc_pid})));
               if(allUser.errcode == 0){
                   for(var i = 0; i < allUser.data.length; i++){
                      allUser.data[i].lc_time = this.timestampToTime(allUser.data[i].lc_time);
                      allUser.data[i].lc_retime = allUser.data[i].lc_retime ? this.timestampToTime(allUser.data[i].lc_retime) : '';
                   }
                   this.comment = allUser.data;
               }
               this.$message.success(res.msg);
            }else{
               this.$message.error(res.msg);
            }
            this.lc_content = ''
          }
       }
    }
</script>

<style lang="scss">
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.cont {
  .icon {
    position: relative;
    margin-top: 20px;
    .iconfont {
      cursor: pointer;
      color: #F7BA2A;
    }
    .emoji-box {
      position: absolute;
      z-index: 10;
      left: -10px;
      top: 24px;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;
      .el-button {
        position: absolute;
        border: none;
        color: #FF4949;
        right: 12px;
        top: 12px;
        z-index: 10;
      }
      .arrow {
        left: 10px;
      }
    }
    .submit {
      float: right;
    }
  }
  .comment {
    margin-top: 20px;
    .item {
      margin-top: 20px;
      padding: 10px;
      margin: 0;
      border-top: 1px solid #bfcbd9;
    }
  }
}

.clearfix {
  &:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }

.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}
h2.t_nav { border-bottom: #247979 3px solid; font-size: 12px; font-weight: normal; line-height: 48px; height: 40px }
h2.t_nav a { padding: 10px; }
h2.t_nav a:first-child { background: #247979; color: #fff; }
h2.t_nav a:last-child { background: #59BCBC; color: #fff; }
.box { border: #ccc 1px dashed; text-align: center; padding: 5px 0; margin: 0 30px 10px 30px; color: #666 }
.box span { margin: 0 10px }
.l_box .info{width: 670px;}
</style>
