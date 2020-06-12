export default function ({ store, route, redirect }) {
  const user = store.state.user.user
  const blockRoute = /\/admin\/*/g
  const loginRoute = '/auth/login'
  if (!user && route.path.match(blockRoute)) {
    redirect('/')
  }
  if (user && route.path === loginRoute) {
    return redirect('/admin')
  }
}
