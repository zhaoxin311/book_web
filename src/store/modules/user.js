import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    department: '',
    create_time: ''
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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_CREATETIME: (state, create_time) => {
    state.create_time = create_time
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

        commit('SET_NAME', response.result[0].account)
        commit('SET_DEPARTMENT', response.result[0].department)
        commit('SET_CREATETIME', response.result[0].create_time)
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

