<template>
  <div id="app">
    <v-app>
      <b-jumbotron header="My Portfolio" lead="For more information visit website">
        <p>アプリケーションをご覧の方はこちらへどうぞ</p>
        <b-button  variant="primary" href="/">TopPage</b-button>
      </b-jumbotron>
      <!-- ここから -->
      <div class="col-lg-6 mx-auto ">
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 75%"
          />
        </div>
        <h1>Hello</h1>
        <form @submit.prevent>
          <div class="form-group">
            <input
              id="nuxt-email"
              v-model="account.email"
              type="email"
              name="email"
              placeholder="Emailを入れて下さい"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <input
              id="nuxt-password"
              v-model="account.password"
              type="password"
              name="password"
              placeholder="パスワードを入れて下さい"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <b-button @click="login" variant="primary">ログイン</b-button>
          </div>
          <div v-if="isError" class="alert alert-danger">
            {{ errMsg }}
          </div>
        <nuxt-link to="/about">
          About page
        </nuxt-link>
      </form>
      </div>
      <!-- ここまで -->
    </v-app>
  </div>
</template>


<script>

export default {
    data () {
      return {
        isLoading: false,
        isError: false,
        errMsg: '',
        account: {
          email: '',
          password: ''
        }
      }
    },
  computed: {
    // hasErrors () {
    //   return this.errors.length > 0
    // }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', this.account)
      .catch(error => {
        this.isError = true
        this.errMsg = error.message
        setTimeout(() => {
          this.isError = false
        }, 5000)
      })
      .then(() => {
         this.$router.push('/admin')
      })
    }
  }
}
</script>

<style>
</style>