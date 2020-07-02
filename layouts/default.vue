<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    userLogin() {
      return this.$store.getters['user/loginStatus']
    }
  },
  // created () {
  //   this.$store.dispatch('setAuthStatus')
  // }
}
</script>