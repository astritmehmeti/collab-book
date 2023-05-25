export default {
  allArchivedContacts(state, payload) {
    state.archivedContacts = payload;
  },
  setMessage(state, payload) {
    state.message = payload;
  },
  clearMessage(state) {
    state.message = "";
  },
};
