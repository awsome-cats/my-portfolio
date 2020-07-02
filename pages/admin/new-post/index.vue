<template>
  <div>
    <h4 class="mb-5 mt-5 text-center">新規作成</h4>
    <adminPostForm 
    @submit="onSubmitted"
    header="新規作成"
    />
  </div>
</template>

<script>
import adminPostForm from '@/components/adminPostForm'
export default {
  layout: 'admin-page',
  middleware: 'auth',
  components: {
    adminPostForm
  },
  methods:{
    onSubmitted(postData) {
       this.$store.dispatch('user/newPost', postData)
       .then(() => {
         alert('送信しました。')
       })
       .then(() => {
         this.$router.push('/admin')
       })
       .catch(error => {
         alert('送信できませんでした。')
       })
    }
  }
}
</script>
