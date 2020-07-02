import { getUserFromCookie, getUserFromLocalStorage } from '@/utils'

export default function({ store, req }) {
  if (process.server && !req) { return }

  const userData = process.server ? getUserFromCookie(req): getUserFromLocalStorage()

  if (!userData) {
    return 
  } else if (!userData.jwt || Date.now() > userData.expiresIn) {
    store.commit('user/clearToken')
    store.commit('user/clearUser')
  } else {
    store.commit('user/setToken', userData.jwt)
    store.commit('user/setUser', { email: userData.user, avatar: userData.avatar })
    const timeToLogout = userData.expiresIn - Date.now()
    store.dispatch('user/setLogoutTimer', timeToLogout)
  }
}