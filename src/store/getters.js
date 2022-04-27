const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  create_time: state => state.user.create_time,
  name: state => state.user.name,
  department: state => state.user.department
}
export default getters
