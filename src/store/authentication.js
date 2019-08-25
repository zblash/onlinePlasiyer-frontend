import { APIService } from '../services/APIService';
import { router } from '../router';
const apiService = new APIService();

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });

      let data = {
        userName: username,
        password: password
      }
      apiService.login(data)
        .then(
          response => {
            console.log(response.data)
            commit('loginSuccess', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            router.push('/');
          },
          error => {
            commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
          }
        );
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    }
  }
}
