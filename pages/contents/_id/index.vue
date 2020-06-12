<template>
<div>
  <div id="main">
    <template >
      <b-img fluid alt="Fluid image"  src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-6bcd1.appspot.com/o/photos%2Falizee-baudez-QElq3IdWzlQ-unsplash-thin.jpg?alt=media&token=5137cd80-2858-4d9f-872f-75df61c82784">
      </b-img>
    </template>
        <hr>
        <div class="mx-auto text-center ">
          <h1>
            {{ loadedContents.title }}
          </h1>
        </div>
        <hr>
        <v-row>
          <v-col>
            <ImageVue :loadedContents="loadedContents"/>
          </v-col>
        </v-row>
          <v-row>
            <v-col>
               <pre>{{loadedContents.content}}</pre>
            </v-col>
         
        </v-row>
        <v-row>
          <v-col>
            <div class="mx-auto text-center">
              <b-img class="post-image" fluid alt="responsive image" :src="loadedContents.imageUrl2" />
            </div>
          </v-col>
          <v-col>
            <div class="mx-auto text-center">
              <b-img class="post-image" fluid alt="responsive image" :src="loadedContents.imageUrl3" />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="mx-auto text-center">
              <b-img class="post-image" fluid alt="responsive image" :src="loadedContents.imageUrl4" />
            </div>
          </v-col>
          <v-col>
            <div class="mx-auto text-center">
              <b-img class="post-image" fluid alt="responsive image" :src="loadedContents.imageUrl5" />
            </div>
          </v-col>
        </v-row>
        <v-row>
         <v-col>
           <pre>{{loadedContents.previewText}}</pre>
         </v-col>
        </v-row>
        
     
      <section class="post">
        <div class="post-details">
         
          <div class="post-detail">
            更新日 {{ loadedContents.updatedDate | date }}
          </div>
          <div class="post-detail">
            制作者 {{ loadedContents.author }}<br/>
            pageID:{{ $route.params.id }}
          </div>
          <div>
          </div>
        </div>
        <p>アプリケーションやサイト制作に興味がある方はこちらでご相談頂けます。<br/>
          <a href="">feedback@my-awsome-domain.com.</a>
        </p>
      </section>
      
    
      </div>
  </div>
 
</template>

<script>
import ImageVue from '@/components/contentsView/ImageVue'
export default {
  layout: 'chatApp',
  data() {
    return {}
  },
  components: {
   ImageVue
  },  
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.$get(process.env.FB_URL + '/post/' + params.id +  '.json')
     
      return {
        loadedContents: response
      }
    } catch(error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>


#main {
  background-color: rgb(248, 248, 248);
}

.post-image-high {
  width:100%;
  height:300px;
}
pre {
  white-space: pre-wrap ;
  margin-top: 12px;
}
</style>

