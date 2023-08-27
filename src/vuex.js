import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: null,
    admin: null,
    carts: [],
    favorites: [],
    productBuyNow: null,
  },
  getters: {
    getUser: state => state.user,
    getAdmin: state => state.admin,
    carts: (state) =>  state.carts,
    favorites: (state) =>  state.favorites,
    productBuyNow: (state) => state.productBuyNow,
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
    addToFavorite(state, items) {
      state.favorites = items;
    },
    addBuyNow(state, items) {
      state.productBuyNow = items; 
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
    addProductToFavorite(context, product) {
      context.commit('addToFavorite', product);
    },
    removeProductBuyNow(context, data) {
      context.commit('addBuyNow', data);
    }
  },
  plugins: [
    createPersistedState({
      key: 'user',
      paths: ['user']
    }),
    createPersistedState({
      key: 'admin',
      paths: ['admin']
    }),
    createPersistedState({
      key: 'productBuyNow',
      paths: ['productBuyNow']
    }),
  ]
});

export default store;
