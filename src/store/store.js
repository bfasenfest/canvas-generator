import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import _throttle from 'lodash/throttle';

import defaults from './components/defaults';
import theme from './components/theme';
import cases from './components/cases';


// import Vuex elements
import state from './main/state';
import actions from './main/actions';
import getters from './main/getters';
import mutations from './main/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    defaults,
    theme,
    cases
  },
  plugins: [
    createPersistedState({
      setState: _throttle((key, state, storage) => {
        storage.setItem(key, JSON.stringify(state));
      }, 100),
    }),
  ]
});
