<template>
  <div>
    <header>
      <nav id="nav">
        <ul class="right">
          <li v-for="(item, index) in header" @click="navBarTo(item.navTo,index)" class="pointer" ><a :class="item.bool ? 'active' : '' ">{{item.content}}</a></li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script type="text/javascript">
   export default{
      data(){
        return {
           header: [ {navTo: '/index', content: '首页', bool:true}, {navTo: '/abouts', content: '关于我', bool:false}, {navTo: '/article', content: '技术心得', bool:false}, {navTo: '/journal', content: '抚今追昔', bool:false}, {navTo: '/say', content: '畅所欲言', bool:false}, {navTo: '/board', content: '留言', bool:false}],
           index: ""
        }
      },
      created(){
        this.header[this.$route.meta[0]].bool = true;
        for(var i = 0; i < this.header.length; i++){
          this.header[i].bool = false;
        }
        this.header[this.$route.meta[0]].bool = true;
      },
      methods:{
        navBarTo(path,index){
          this.$router.push({path})
        }
      }
   }
</script>
