export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutologout = false;
  },
  setAutoLogout(state) {
    state.didAutologout = true;
  },
  userLogged(state, payload) {
    state.userLogged = payload;
  },
};
