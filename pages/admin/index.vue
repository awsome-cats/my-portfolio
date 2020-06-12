<template>
  <div class="container">
    <h1>管理画面</h1>
    <div>
      <button @click="logout">ログアウト</button>
      <nuxt-link to="/">Top page</nuxt-link>
      <nuxt-link to="/auth/login">ログイン</nuxt-link>
      <nuxt-link to="/admin/new-post">new post</nuxt-link>
    </div>
    <h2>投稿した記事</h2>
    <Articles is-admin :posts="loadedContents"/>
    <nuxt-link to="/admin/new-post">newpost</nuxt-link>
    <nuxt-link to="/">top</nuxt-link>
  </div>
</template>

<script>
import Articles from '@/components/Articles'
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',
  middleware: 'auth',
  components: {
    Articles
  },
  computed: {
    ...mapGetters('user',['loadedContents'])
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      location.href = '/'
    }
  }
}

</script>

<style scoped>
.main {
  height:200vh;
  background-color: #ccc;
}

</style>
