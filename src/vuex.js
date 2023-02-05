// import Vue from "vue";
import {createStore} from 'vuex';

// Vue.use(Vuex);

const state = {
    user: null,
    userId: null
};
const store = createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        userId: (state) => {
            return state.userId;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        userId(context, userId) {
            context.commit('userId', userId);
        },
    },
    mutations:{
        user(state, user) {
            state.user = user
        },
        userId(state, userId) {
            state.userId = userId
        }
    },
});


export default store;
