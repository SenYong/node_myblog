<template>
    <div>
        index
    </div>
</template>

<script>
import { getArticle } from '../api/index'
export default {
  data() {
    return {
        page: 8,
        num: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getArticle().then(response => {
         console.log(response)
      })
    }
  }
}
</script>