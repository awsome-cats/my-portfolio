<template>
  <div>
    <adminPostForm @submit="onSubmitted"/>
  </div>
</template>

<script>
import adminPostForm from '@/components/adminPostForm'
export default {
  layout: 'admin',
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
