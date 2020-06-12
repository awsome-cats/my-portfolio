export default {
  methods: {
    removeErrors () {
      this.$validator.reset()
      this.$store.commit('clearError')
    }
  },
  computed: {
    error () {
      this.$store.getters.error
    },
    busy () {
      this.$store.getters.busy
    },
    jobDone () {
      this.$store.getters.jobDone
    }
  },
  watch: {
    jobDone (value) {
      if (value) {
        this.$store.commit('setJobDone')
        this.jobsDone()
      }
    }
  }
}