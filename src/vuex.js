import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: null,
    admin: null,
    carts: [],
    favorites: [],
  },
  getters: {
    getUser: state => state.user,
    getAdmin: state => state.admin,
    carts: (state) =>  state.carts,
    favorites: (state) =>  state.favorites
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
    removeFavorite(state, item) {
      const index = state.favorites.getFavoriteItems.findIndex(favorite => favorite.product.id === item.product_id && favorite.user.id === item.user_id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    }
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
    removeProductFromFavorite(context, product) {
      context.commit('removeFavorite', product);
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
    })
  ]
});

export default store;
