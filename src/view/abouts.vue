<template>
    <div class="abouts">
        <head-top></head-top> 
        <div class="main">
            <div class="lt">
                <div class="avatar">
                   <a href="#"><span>江湖之养马人</span></a>
                </div>
                <div class="topspaceinfo">
                  <h1>执子之手，与子偕老</h1>
                  <p>于千万人之中，我遇见了我所遇见的人..</p>
                </div>
                <div class="userinfo"> 
                  <p class="q-fans"> 浏览量：<a>220</a></p>   
                </div>
                <div class="newpic">
                    <h2>{{info.title}}描述</h2>
                    <p>{{info.desc}}</p>
                </div>
                <div class="newpic">
                    <h2>关于{{info.username}}</h2>
                    <div class="userinfo">
                       <div><span>网名:</span>{{info.netname}}</div>
                       <div><span>QQ:</span>{{info.qq}}</div>
                       <div><span>职业:</span>{{info.profession}}</div>
                       <div><span>爱好:</span>{{info.hobby}}</div>
                    </div>
                </div>
            </div>
            <div class="rt">
               <h2 class="title">关于我</h2>
               <ul class="text">
                  <p><span>个人资料</span>：男，活泼的90后，射手座，IT界中打着瞌睡敲代码且最不着调的程序员~W_W~</p>
                  <p><span>爱好</span>：发呆、睡觉、打游戏、敲代码</p>
                  <p><span>个人简介</span>：90后，IT boy，手机控、电脑控、游戏控、仙侠小说控，喜欢自嘲、喜欢嘲讽、喜欢开玩笑、喜欢敲代码(此处省略一万字...)，业余时间唱歌、吃饭、看电影都是我的最爱，从业IT行业已经2年多了。从搬砖一样的生活方式换成了现在有"单"而居的日子。跟我的职业相比，告别了朝九晚五，躲过了风吹日晒，虽然不再有阶梯式的工资，但是偶尔可以给自己放放假，一起轻装旅行。人生就是一个得与失的过程，而我却是一个幸运者，得到的永远比失去的多。虽然刚开始入行时很辛苦，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习html、css、js、php...中激发了兴趣，然后越走越远...始终坚持原则问题，喜欢一句话"冥冥中该来则来，无处可逃"。。。</p>
                  <p><span>关于程序</span>: {{info.program}}</p>
                </ul>
            </div>
        </div>
        <head-foot></head-foot>
    </div>
</template>
<script type="text/javascript">
    import {mapGetters} from 'vuex'
    import headTop from './public/HeadTop';
    import headFoot from './public/HeadFoot';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                baseUrl,
            }
        },
        computed:{
            ...mapGetters(['info'])
        },
        components: {headTop, headFoot}
    }
</script>