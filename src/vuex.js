// import Vue from "vue";
import {createStore} from 'vuex';

// Vue.use(Vuex);

const state = {
    user: null
};
const store = createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        }
    },
    mutations:{
        user(state, user) {
            state.user = user
        }
    },
});


export default store;
