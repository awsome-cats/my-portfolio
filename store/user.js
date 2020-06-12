import Cookie from 'js-cookie'
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

  setUser(state, account) {
   state.user = account
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
 * @login: ログイン機能
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
      console.log(error)
    }
  },

  


  login ({ commit }, account) {
    const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.FB_API_KEY

    return this.$axios.$post(authUrl, {
      email: account.email,
      password: account.password,
      returnSecureToken: true
    })
    .then((result) => {
     
      Cookie.set('access_token', result.idToken)
      Cookie.set('expirationData', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)

      localStorage.setItem('access_token', result.idToken)
      localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
      
      const { email, displayName, idToken } = result
      
      commit('setUser', { email, displayName, idToken })
      commit('setToken', result.idToken)
      
    })
    .catch((error) => {
      console.log(error)
    })
  },

  async logout({ commit }) {
    commit('clearToken')
      await Cookie.remove('access_token')
      await Cookie.remove('expirationData')
    if(process.client) {
      await localStorage.removeItem('access_token')
      await localStorage.removeItem('tokenExpiration')
    }
    

  },

  async editedPost(vuexContext, editedPost ) {
    try {
      await this.$axios.$put(process.env.FB_URL + '/post/' + editedPost.id + '/.json?auth=' + vuexContext.state.token, editedPost)
      vuexContext.commit('editPost', editedPost)
    }catch(error) {
      console.log(error)
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
 
  setUser(state) {
   return state.user
  },
 
  setToken (state) {
    return state.token
  },
  setUid (state) {
   if(state.user && state.user.uid) {
     return state.user.uid
    }
  },
  loadedContents(state) {
    return state.loadedContents
  }
}