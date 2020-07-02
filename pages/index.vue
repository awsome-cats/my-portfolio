<template>
  <div id="main">
    <section id="one">
			<header class="major">
				<h2>Webサイトの設計、開発をおこないます</h2>
        <!--font awesome test -->
        <!-- <i class="fa fa-camera"></i> -->
			</header>
      <p>Zoomを使ったリモートでのご提案、企画、設計なども積極的に行います。Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet praesentium earum consequuntur corrupti aut placeat cum adipisci officiis aspernatur quis! Tempore officia recusandae, tenetur illo ab sit dicta. Voluptatibus, aut.</p>
			<ul class="actions">
				<li><nuxt-link to="about" class="button">詳しくはこちら</nuxt-link></li>
			</ul>
      <b-spinner 
      v-if="loading"
      variant="primary" 
      type="grow" 
      label="Spinning"
      >
    </b-spinner>
		</section>
    <Articles :posts="loadedContents" />
     <ul class="actions">
      <li><nuxt-link to="/contents" class="button">Full Portfolio</nuxt-link></li>
    </ul>
    <Contact/>
    <Footer/>
  </div>
 
</template>

<script>
import Articles from '@/components/Articles'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import {db} from '@/services/firebase'
import { mapGetters } from 'vuex'
export default {
  layout: 'homeLayout',
  components: {
    Articles,
    Contact,
    Footer
  },
  data () {
    return {
      posts: []
    }
  },
  computed: {
    ...mapGetters('user', ['loadedContents']),
        loading () {
        this.$store.getters.loading
      }
    }
}
</script>


<style scoped>

</style>