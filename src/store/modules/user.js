import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    id: '',
    department: '',
    phone: '',
    roles: '',
    remark: '',
    email: '',
    address: '',
    last_login_time: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_REMARK: (state, remark) => {
    state.remark = remark
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  },
  SET_LASTTIME: (state, last_login_time) => {
    state.last_login_time = last_login_time
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      console.log('11333')
      login(userInfo).then(response => {
        console.log('4411333')
        // const { data } = response.results
        console.log(response.results, 'data')
        commit('SET_TOKEN', response.results.token)
        setToken(response.results.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    console.log(state.token, 'tan')
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log(response, 'response')
        if (!response) {
          return reject('验证失败，请重新登录')
        }

        commit('SET_ID', response.result[0].id)
        commit('SET_NAME', response.result[0].account)
        commit('SET_DEPARTMENT', response.result[0].department)
        commit('SET_PHONE', response.result[0].phone)
        commit('SET_ROLES', response.result[0].roles)
        commit('SET_REMARK', response.result[0].remark)
        commit('SET_EMAIL', response.result[0].email)
        commit('SET_ADDRESS', response.result[0].address)
        commit('SET_LASTTIME', response.result[0].last_login_time)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

