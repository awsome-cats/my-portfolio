<template>
  <section id="two">
    <h4>Recent Work</h4>
    <div class="row">
      <ContentPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :is-admin="isAdmin"
      :title="post.title"
      :author="post.author"
      :previewText="post.previewText"
      :content="post.content"
      :imageUrl="post.imageUrl"
      :fileName="post.fileName"
      />
    </div>
  </section>
</template>

<script>
import ContentPreview from '@/components/ContentPreview'
export default {
  components: {
    ContentPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>


</style>