<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                  <h2><a href="{:U('/say')}">留言</a></h2>
                  <div class="cont" style="margin-top:20px;">
                    <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="b_content"></el-input>
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
                             <img :src="baseUrl+item.b_img" class="logo">
                             <div class="lCont">
                                <p class="p1">
                                  <span class="s1"><b class="name">{{item.b_name}}</b>[{{item.b_ip}}]</span>
                                  <span class="s2">{{item.b_time}}</span>
                                </p>
                                <p class="p2" v-html="emoji(item.b_content)"></p>
                             </div>
                         </div>
                         <div class="lItem rItem" v-if="item.b_retime">
                            <img :src="baseUrl + item.b_reimg" class="logo">
                            <div class="lCont">
                               <p class="p1">
                                 <span class="s1"><b class="name">{{item.b_rename}}</b>回复<b class="name1">{{item.b_name}}</b></span>
                                 <span class="s2">{{item.b_retime}}</span>
                               </p>
                               <p class="p2" v-html="emoji(item.b_recontent)"></p>
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

<script>
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import vueEmoji from '../components/emoji.vue';
    import {getUserComment, userBoardComment} from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                b_content: '',
                showEmoji: false,
                comment: [],
                num: 0,
                page: 10,
                baseUrl,
                b_content: ''
            }
        },
        components:{headTop, headRight, headFoot, vueEmoji},
        created(){
            this.getData(this.num, this.page);
        },
        methods: {
            async getData(num, page){
               var res = JSON.parse(await getUserComment({num, page}));
               if(res.errcode == 0){
                  for(var i = 0; i < res.data.length; i++){
                    res.data[i]['b_time'] = this.timestampToTime(res.data[i]['b_time']);
                    res.data[i]['b_retime'] = res.data[i]['b_retime'] ? this.timestampToTime(res.data[i]['b_retime']) : '';
                  }
                  this.comment = res.data;
               }else{
                  this.$message.error(res.msg);
               }
            },
            selectEmoji (code) {
               this.showEmoji = false
               this.b_content += code
            },
            async submit(){
               if(this.b_content == ''){
                   this.$message.success('回复内容不能为空');
                   return false;
                }
                var data = {};
                var ran = 1 + Math.ceil(Math.random() * 199);
                data.b_name = '游客';
                data.b_img = '/public/static/default/'+ ran +'.png';
                data.b_content = this.b_content;
                var res = JSON.parse(await userBoardComment(data));
                if(res.errcode == 0){
                   var res = JSON.parse(await getUserComment({num:0, page:10}));
                   if(res.errcode == 0){
                      for(var i = 0; i < res.data.length; i++){
                        res.data[i]['b_time'] = this.timestampToTime(res.data[i]['b_time']);
                        res.data[i]['b_retime'] = res.data[i]['b_retime'] ? this.timestampToTime(res.data[i]['b_retime']) : '';
                      }
                      this.comment = res.data;
                   }else{
                      this.$message.error(res.msg);
                   }
                }else{
                   this.$message.error(res.msg);
                }
                this.b_content = ''
            }
        }
    }
</script>