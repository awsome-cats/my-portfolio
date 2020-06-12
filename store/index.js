import JWTDecode from 'jwt-decode'
import cookieParser from 'cookieParser'
import Cookie from 'js-cookie'

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    try {
      const response = await context.$axios.$get(process.env.FB_URL + '/post.json')
      let newPosts = []
      for (const key in response) {
        newPosts.push({ ...response[key], id: key})
      }
      vuexContext.commit('user/setPosts', newPosts)
      
    } catch(error) {
      console.log(error)
    }

    if (process.server && process.static) { return }
    if (!context.req.headers.cookie) { return }
    
    const parsed = cookieParser.parse(context.req.headers.cookie)
   
    const accessTokenCookie = parsed.access_token
    
    if (!accessTokenCookie) { return }
    const decoded = JWTDecode(accessTokenCookie)

    
    if (decoded) {
      vuexContext.commit('user/setUser', {
        uid: decoded.user_id,
        email: decoded.email
      })
    }
  }
  

}
