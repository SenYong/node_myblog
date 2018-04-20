<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';  
export default {
  name: 'App',
  created () {
     this.newArt();
     this.newLog();
     this.newSay();
     this.getinfo();
     this.getArtComment();
     this.getsayImg();
  },
  methods: {
    ...mapActions(['newArt', 'newLog', 'newSay', 'getinfo', 'getArtComment', 'getsayImg'])
  }
}
</script>
