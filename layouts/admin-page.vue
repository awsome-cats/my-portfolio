<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>管理画面</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse">
    </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="isAuthenticated">
            <b-avatar 
            :src="user.avatar"/>
            {{user.email}}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="isAuthenticated">
            <template v-slot:button-content>
              <em>Admin</em>
            </template>
            <b-dropdown-item>
              <nuxt-link 
                to="/">Top page
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link 
                to="/admin/new-post">
                new post
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <button 
              @click="logout">
              ログアウト
              </button>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated']
    }
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
/* .avatar-image {
  width: 15px;
} */
</style>
