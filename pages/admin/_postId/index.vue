<template>
  <div class="container">
    <div>
       <h5 class="mb-5 mt-5 text-center">更新ページ</h5>
    </div>
    <section>
      <adminPostForm
      :post="loadedContents"
      @submit="onSubmitted"
      />
    </section>
  </div>
</template>

<script>
import adminPostForm from '@/components/adminPostForm'
export default {
  layout: 'admin-page',
  components: {
    adminPostForm
  },
  async asyncData({ $axios, params}) {
    try {
      const response = await $axios.$get(process.env.FB_URL + '/post/' + params.postId + '.json')
      return {
        loadedContents: {
          ...response, 
          id: params.postId
        }
      }
    } catch(error) {
      console.log(error)
    }
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('user/editedPost', editedPost)
      .then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

