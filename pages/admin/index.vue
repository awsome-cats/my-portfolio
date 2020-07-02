<template>
  <b-container>
    <h4>投稿した記事</h4>
    <Articles is-admin :posts="loadedContents"/>
  </b-container>
</template>

<script>
import Articles from '@/components/Articles'
import { mapGetters } from 'vuex'

export default {
  layout: 'admin-page',
  middleware: 'auth',
  components: {
    Articles
  },
  computed: {
    ...mapGetters('user',['loadedContents'])
  }
  
}

</script>

<style scoped>
h4 {
  margin-bottom:40px;
}

</style>
