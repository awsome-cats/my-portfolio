<template>
  <div class="white elevation-2 container mt-5">
    <div>
      <v-app-bar flat dense class="cyan" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <slot name="action"/>
      </v-app-bar>
      <div class="pl-4 pr-4 pt-2 pb-2">
        <slot>
          No slot content defined
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
// child
export default {
  props: ['title']
}
</script>

<style scoped>
.container {
  width: 400px;
}
</style>
