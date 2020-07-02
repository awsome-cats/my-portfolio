import md5 from 'md5'
import {db} from '@/services/firebase'
import { saveUserData, clearUserData } from '@/utils'
/**
 * --state--
 * @ user
 * @ token
 * @ loadedContents
 * 
*/

export const state = () => ({
   user: null,
   token: null,
   loadedContents: []
})

/**
 * --mutations--
 * @ setUser
 * @ setToken
 * @ clearToken
 * @ setposts
 * @ addPost
 * @ editPost
 * 
*/

export const mutations = {

  setUser(state, payload) {
   state.user = payload
  },
  clearUser(state) {
   state.user = null
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  addPost(state, post) {
    state.loadedContents.push(post)
  },
  setPosts(state, post) {
    state.loadedContents = post
  },
  editPost(state, editedPost ) {
    const postIndex = state.loadedContents.findIndex(post => post.id === editedPost.id)
    state.loadedContents[postIndex] = editedPost
  }
}

/**
 * --Actions--
 * @newPost: 新規投稿
 * @editedPost: 編集、更新機能
 * @login: ログイン機能 realTime database
 * @logout: ログアウト機能
 * @initAuth: tokenをgetしてmiddlewareで使用
 * 
*/

export const actions = {

  async newPost(vuexContext, post) {
    try {
      
      const data = await this.$axios.$post(process.env.FB_URL + '/post.json?auth=' + vuexContext.state.token, post)
      
      vuexContext.commit('addPost', { ...post, id: data.name })

    }catch(error) {
      commit('setError', error)
    }
  },
  async login ({ commit }, account) {
    try {
      
      commit('setLoading', true, { root: true })
      
      const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.FB_API_KEY

      const authUserData = await this.$axios.$post(authUrl, {
        email: account.email,
        password: account.password,
        returnSecureToken: true
      })
      
      let user
      const avatar = `http://gravatar.com/avatar/${ md5(authUserData.email) }?d=identicon`
        user = { email: authUserData.email, avatar}
        // const loginRef = await db.ref(`users/${authUserData.localId}`)
        // const  loggedInUser = await loginRef.get()
        // user = loggedInUser.data()
        commit('setUser', user)
        commit('setToken', authUserData.idToken)
        commit('setLoading', false, { root: true })
        saveUserData(authUserData, user)
    } catch(error) {
      commit('setError', error, { root: true })
      commit('setLoading', false, { root: true })
    }
  },
  setLogoutTimer ({ dispatch}, interval) {
    setTimeout(() => dispatch('logout'), interval)
  },

  async logout({ commit }) {
    commit('clearToken')
    commit('clearUser')
    clearUserData()
  },

  async editedPost(vuexContext, editedPost ) {
    try {
      await this.$axios.$put(process.env.FB_URL + '/post/' + editedPost.id + '/.json?auth=' + vuexContext.state.token, editedPost)
      vuexContext.commit('editPost', editedPost)
    }catch(error) {
      commit('setError', error, { root: true })
    }
  }
}


/**
 * --getters--
 * @ setUser
 * @ setToken
 * @ setUid
 * @ loadedContents
*/

export const getters = {
 
  user (state) {
   return state.user
  },
 
  setToken (state) {
    return state.token
  },
  isAuthenticated(state) {
    return !!state.token
  },
  setUid (state) {
   if(state.user && state.user.uid) {
     return state.user.uid
    }
  },
  loadedContents(state) {
    return state.loadedContents
  },
  loginStatus (state) {
    return state.user !== null && state.user !== undefined
  }
}