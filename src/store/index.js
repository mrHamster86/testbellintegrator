import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const state = {
  users: {},
  history: [],
}

const getters = {
  users: (state) => state.users,
  userList: (state) => Object.keys(state.users),
  unselectUser: (state, getters) => [...getters.userList].filter((userId) => {
    return !state.users[userId].isSelected
  }),
  selectUser: (state, getters) => [...getters.userList].filter((userId) => {
    return state.users[userId].isSelected
  }),
  history: (state) => state.history
}

const actions = {
  async getUserList({commit}, {link}) {
    const {data} = await axios.get(link)
    const users = {}

    for (let user of data) {
      users[user._id] = user
    }

    commit('setUserList', {users})
  },
  addElement({commit}, {id}) {
    const action = {
      status: 'add',
      elementId: id,
      date: Date.now(),
    }

    commit('addHistoryPoint', {action})
    commit('selectUser', {userId: id})
  },
  removeElement({commit}, {id}) {
    const action = {
      status: 'remove',
      elementId: id,
      date: Date.now(),
    }

    commit('addHistoryPoint', {action})
    commit('unselectUser', {userId: id})
  }
}

const mutations = {
  setUserList(state, {users}) {
    state.users = users
  },
  addHistoryPoint(state, {action}) {
    state.history.push(action)
  },
  selectUser(state, {userId}) {
    state.users[userId] = {
      ...state.users[userId],
      isSelected: true,
    }
  },
  unselectUser(state, {userId}) {
    state.users[userId] = {
      ...state.users[userId],
      isSelected: false,
    }
  }
}

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
})
