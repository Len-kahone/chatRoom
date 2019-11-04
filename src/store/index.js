import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});
export default new Vuex.Store({
  state: {
    user:[],
    users:[],
    rooms:[],
    activeRoom:null,
    messages:[],
    currentUser:"",
    reconnect: false,
    userTyping: null,
    isLoading:false
  },
  mutations,
  actions,
  plugins: [vuexLocal.plugin],
  modules: {
  }
})
