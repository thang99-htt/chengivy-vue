import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: null,
    admin: null,
    carts: []
  },
  getters: {
    getUser: state => state.user,
    getAdmin: state => state.admin,
    carts: (state) =>  state.carts
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setAdmin: (state, admin) => {
      state.admin = admin;
    },
    clearAdmin: (state) => {
      state.admin = null;
    },    
    addToCart(state, items) {
      state.carts = items;
    },
  },
  actions: {
    updateUser: ({ commit }, user) => {
      commit('setUser', user);
    },
    logoutUser: ({ commit }) => {
      commit('clearUser');
    },
    updateAdmin: ({ commit }, admin) => {
      commit('setAdmin', admin);
    },
    logoutAdmin: ({ commit }) => {
      commit('clearAdmin');
    },    
    addProductToCart(context, product) {
      context.commit('addToCart', product);
    },
  },
  plugins: [
    createPersistedState({
      key: 'user',
      paths: ['user']
    }),
    createPersistedState({
      key: 'admin',
      paths: ['admin']
    })
  ]
});

export default store;
