<template>
  <div>
    <b-jumbotron header="My Portfolio" lead="For more information visit website">
      <p>アプリケーションをご覧の方はこちらへどうぞ</p>
      <b-button  variant="primary" href="/">TopPage</b-button>
    </b-jumbotron>
    <div class="container">
      <!-- ここから -->
      <div class="col-lg-6 mx-auto ">
        <div class="text-center">
          <b-spinner 
          v-if="loading"
          variant="primary" 
          type="grow" 
          label="Spinning"
          >
          </b-spinner>
        </div>
      </div>
      <h1>Hello</h1>
      <!-- FORM -->
      <form @submit.prevent>
        <div class="form-group">
          <input
            id="nuxt-email"
            v-model="account.email"
            v-validate="'required|email'"
            type="email"
            name="email"
            placeholder="Emailを入れて下さい"
            class="form-control"
            :class="{'text-danger': errors.has('email')}"
          >
          <p v-show="errors.has('email')" class="text-danger">
            {{ errors.first('email') }}
          </p>
        </div>
        <div class="form-group">
          <input
            id="nuxt-password"
            v-model="account.password"
            v-validate="'required|min:6'"
            type="password"
            name="password"
            placeholder="パスワードを入れて下さい"
            class="form-control"
            :class="{'text-danger': errors.has('password')}"
          >
          <p v-show="errors.has('password')" class="text-danger">
            {{ errors.first('password') }}
          </p>
        </div>
        <div 
        class="form-group">
          <b-button @click="login" :disabled="loading" variant="primary">ログイン</b-button>
        </div>
        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        <nuxt-link to="/about">
          About page
        </nuxt-link>
      </form>
    </div>
      <!-- ここまで -->
  </div>
</template>


<script>

export default {
  middleware: 'auth',
    data () {
      return {
        account: {
          email: '',
          password: ''
        }
      }
    },
  computed: {
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated']
    },
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch:{
    isAuthenticated(value) {
      setTimeout(() => {
        this.$router.push('/admin')
      },2000)
    }
  },
  methods: {
    login() {
      this.$validator.validateAll()
      .then(result => {
        if (result) {
           this.$store.dispatch('user/login', this.account)
        }
      })
      .catch(error => {
        setTimeout(() => {
          console.log(error)
        }, 5000)
      })
    }
  }
}
</script>

<style>
</style>