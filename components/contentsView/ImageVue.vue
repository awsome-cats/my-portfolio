<template>
  <div>
    <div class="mx-auto text-center ">
      <b-img class="post-image" fluid alt="responsive image" :src="loadedContents.imageUrl" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadedContents: {
      type: Object,
      required: false
    }
  }
}
</script>

<style>

</style>