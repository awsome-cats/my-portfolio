<template>
  <article class="col-6 col-sm-6">
    <nuxt-link :to="postLink" class="image fit thumb">
      <p>{{ title }}</p>
       <div class="img" :style="{backgroundImage: 'url(' + imageUrl + ')'}" />
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props:{
    id: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: false
    },
    imageUrl: {
      type: String,
      required: false
    },
    previewText: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
    
  },
  computed: {
    postLink() {
      return this.isAdmin ? '/admin/' + this.id : '/contents/' + this.id
    }
  }
}
</script>

<style scoped>
.img {
 width: 100%;
  height: 240px;
  background-position: center;
  background-size: cover;
}
</style>