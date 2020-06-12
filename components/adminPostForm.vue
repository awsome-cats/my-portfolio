<template>
  <v-app container>
  <v-card class="mx-auto mt-6"
    max-width="600">
    <v-card-text>
      <div>投稿フォーム</div>
      <p class="display-1 text--primary">
        Portfolio 作品
      </p>
    </v-card-text>
    <v-form ref="form" @submit.prevent="onSave">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
            v-model.trim="editedPost.author"
            color="purple darken-2"
            label="著者"
            required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
            v-model.trim="editedPost.title"
              color="blue darken-2"
              label="タイトル"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
            auto-grow
            filled
            v-model.trim="editedPost.content"
              color="teal"
              label="概要"
            >
            </v-textarea>
            <pre>{{editedPost.content}}</pre>
          </v-col>
          <v-col cols="12">
            <v-textarea
            auto-grow
            filled
            v-model.trim="editedPost.previewText"
              color="teal"
              label="概要"
            >
            </v-textarea>
            <pre>{{editedPost.previewText}}</pre>
          </v-col>
          <v-col cols="12">
            <v-text-field
            label="画像URL"
            v-model="editedPost.imageUrl"
            />
            <v-text-field
            label="画像URL"
            v-model="editedPost.imageUrl2"
            />
            <v-text-field
            label="画像URL"
            v-model="editedPost.imageUrl3"
            />
            <v-text-field
            label="画像URL"
            v-model="editedPost.imageUrl4"
            />
            <v-text-field
            label="画像URL"
            v-model="editedPost.imageUrl5"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
            label="画像ファイル名"
            v-model="editedPost.fileName"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <input type="reset" @click="onCancel" value="リセット"/>
        <v-spacer></v-spacer>
        	<input type="submit" value="送信する"/>
      </v-card-actions>
    </v-form>
    </v-card>
  </v-app>
</template>

<script>
import { firebase } from '@/services/firebase'
import {v4 as uuidv4} from 'uuid'
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post? { ...this.post }:{
        author: '',
        title: '',
        file: null,
        fileName: '',
        imageUrl: '',
        imageUrl2: '',
        imageUrl3: '',
        imageUrl4: '',
        previewText: '',
        content: '',
        updatedDate: new Date().toLocaleString()
      },
      error: '',
    }
  },
    methods: {
     onSave() {
       this.$emit('submit',this.editedPost)
     },

     onCancel() {
       this.$router.push('/admin')
     }
    }
}
</script>
