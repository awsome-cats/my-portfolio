
export const state = () => ({
  loading: false,
  error: null
})

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state, payload) {
    state.error = payload
  }
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    try {
      vuexContext.commit('setLoading', true)
      vuexContext.commit('clearError', null)
      const response = await context.$axios.$get(process.env.FB_URL + '/post.json')
      let newPosts = []
      for (const key in response) {
        newPosts.push({ ...response[key], id: key})
      }
      vuexContext.commit('user/setPosts', newPosts)
      vuexContext.commit('setLoading', false)
      
    } catch(error) {
      vuexContext.commit('setError', error)
      vuexContext.commit('setLoading', false)
    }
  }
}

export const getters = {
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}
