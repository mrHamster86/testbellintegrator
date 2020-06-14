import Vue from 'vue'
import App from './App.vue'
import Store from './store/index'
import Router from './router/index'

Vue.config.productionTip = false

const init = async function() {
  const SERVER_LINK = 'http://localhost:1337'
  await Store.dispatch('getUserList', {link: SERVER_LINK})

  new Vue({
    render: h => h(App),
    store: Store,
    router: Router,
  }).$mount('#app')
}

init()
