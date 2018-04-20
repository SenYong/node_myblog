<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                  <h2><a href="{:U('/say')}">畅所欲言</a>  >  详情</h2>
                  <div class="mood">
                      <span class="tutime">{{sayData.s_time}}</span>
                      <p class="p1"><a href="#" class="cont" v-html="emoji(sayData.s_content)"></a></p>
                      <img :src="baseUrl+sayData.s_img" class="sayImg" v-if="sayData.s_img">
                      <p class="p2"><a class="span1" href="">浏览({{sayData.s_hit}})</a><a class="span2" href="">评论({{sayData.s_num}})</a></p>
                  </div> 
                  <div class="sayPage">
                     <div class="nextpage" v-if="prev">
                        <b>上一条说说:</b>
                        <a @click="LogTo(prev.s_id)" class="pointer">{{prev.s_content}}</a>
                      </div>
                       <div class="nextpage" v-if="next">
                          <b>下一条说说:</b>
                          <a @click="LogTo(next.s_id)" class="pointer">{{next.s_content}}</a>
                      </div>
                  </div>
                  <div class="cont">
                    <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="sc_content"></el-input>
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
                             <img :src="baseUrl+item.sc_img" class="logo">
                             <div class="lCont">
                                <p class="p1">
                                  <span class="s1"><b class="name">{{item.sc_name}}</b>[{{item.sc_ip}}]</span>
                                  <span class="s2">{{item.sc_time}}</span>
                                </p>
                                <p class="p2" v-html="emoji(item.sc_content)"></p>
                             </div>
                         </div>
                         <div class="lItem rItem" v-if="item.sc_retime">
                            <img :src="baseUrl + item.sc_reimg" class="logo">
                            <div class="lCont">
                               <p class="p1">
                                 <span class="s1"><b class="name">{{item.sc_rename}}</b>回复<b class="name1">{{item.sc_name}}</b></span>
                                 <span class="s2">{{item.sc_retime}}</span>
                               </p>
                               <p class="p2" v-html="emoji(item.sc_recontent)"></p>
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
    import { sayDetail, prevSay, nextSay, getAllSayUser, addSayHit, userSayComment } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
              sayData: {},
              sc_pid: '',
              baseUrl,
              next: {},
              prev: {},
              showEmoji: false,
              sc_content: "",
              comment: []
            }
        },
        components: {headTop, headRight, headFoot, vueEmoji},
        created(){
            if(this.$route.query.id){
               this.sc_pid = this.$route.query.id;
               this.getData(this.$route.query.id);
            }
        },
        methods: {
            async getData(id){
                Promise.all([sayDetail({id}), prevSay({id}), nextSay({id}), getAllSayUser({id}), addSayHit({id})]).then(res => {
                    for(var i = 0; i < res.length; i++){
                        res[i] = JSON.parse(res[i]);
                    }
                    if(res[0].errcode == 0){
                       res[0].data['s_time'] = this.timestampToTime(res[0].data['s_time']);
                       this.sayData = res[0].data;
                    }
                    if(res[1].errcode == 0){
                       this.prev = res[1].data;
                    }
                    if(res[2].errcode == 0){
                       this.next = res[2].data;
                    }
                    if(res[3].errcode == 0){
                       for(var i = 0; i < res[3].data.length; i++){
                          res[3].data[i]['sc_time'] = this.timestampToTime(res[3].data[i]['sc_time']);
                          res[3].data[i]['sc_retime'] = res[3].data[i]['sc_retime'] ? this.timestampToTime(res[3].data[i]['sc_retime']) : '';
                       }
                       this.comment = res[3].data;
                    }
                })
            },
            selectEmoji (code) {
               this.showEmoji = false
               this.sc_content += code
            },
            //提交
            async submit(){
                if(this.sc_content == ''){
                   this.$message.success('回复内容不能为空');
                   return false;
                }
                var data = {};
                var ran = 1 + Math.ceil(Math.random() * 199);
                data.sc_pid = this.sc_pid;
                data.sc_name = '游客';
                data.sc_img = '/public/static/default/'+ ran +'.png';
                data.sc_content = this.sc_content;
                var res = JSON.parse(await userSayComment(data));
                if(res.errcode == 0){
                   var allUser = JSON.parse(await(getAllSayUser({id: this.sc_pid})));
                   if(allUser.errcode == 0){
                       for(var i = 0; i < allUser.data.length; i++){
                          allUser.data[i].sc_time = this.timestampToTime(allUser.data[i].sc_time);
                          allUser.data[i].sc_retime = allUser.data[i].sc_retime ? this.timestampToTime(allUser.data[i].sc_retime) : '';
                       }
                       this.comment = allUser.data;
                   }
                   this.$message.success(res.msg);
                }else{
                   this.$message.error(res.msg);
                }
                this.sc_content = ''
            },
            LogTo(id){
               this.$router.push({ path: '/sayInfo', query: {id}});
               Promise.all([sayDetail({id}), prevSay({id}), nextSay({id}), getAllSayUser({id}), addSayHit({id})]).then(res => {
                    for(var i = 0; i < res.length; i++){
                        res[i] = JSON.parse(res[i]);
                    }
                    if(res[0].errcode == 0){
                       res[0].data['s_time'] = this.timestampToTime(res[0].data['s_time']);
                       this.sayData = res[0].data;
                    }
                    if(res[1].errcode == 0){
                       this.prev = res[1].data;
                    }
                    if(res[2].errcode == 0){
                       this.next = res[2].data;
                    }
                    if(res[3].errcode == 0){
                       for(var i = 0; i < res[3].data.length; i++){
                          res[3].data[i]['sc_time'] = this.timestampToTime(res[3].data[i]['sc_time']);
                          res[3].data[i]['sc_retime'] = res[3].data[i]['sc_retime'] ? this.timestampToTime(res[3].data[i]['sc_retime']) : '';
                       }
                       this.comment = res[3].data;
                    }
                })
            }
        }
    }
</script>

<style>
    .sayImg{
      width:100px;
      height:100px;
      margin-bottom:20px;  
    }
    .sayPage{
      padding:10px 0;
    }
</style>