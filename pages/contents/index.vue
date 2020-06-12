<template>
  <v-container>
  <div>
    <h1>pages</h1>
    <Articles :posts="loadedContents"/>
  </div>
  </v-container>
</template>

<script>
import Articles from '@/components/Articles'
import { mapGetters } from 'vuex'
export default {
   components: {
    Articles
  },
  computed: {
    ...mapGetters('user', ['loadedContents'])
  }

 
}
</script>
