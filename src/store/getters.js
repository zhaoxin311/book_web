const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  create_time: state => state.user.create_time,
  id: state => state.user.id,
  name: state => state.user.name,
  department: state => state.user.department,
  phone: state => state.user.phone,
  roles: state => state.user.roles,
  remark: state => state.user.remark,
  email: state => state.user.email,
  address: state => state.user.address,
  last_login_time: state => state.user.last_login_time
}
export default getters
