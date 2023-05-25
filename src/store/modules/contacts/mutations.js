export default {
  addContactToList(state, contact) {
    state.contacts.push(contact);
  },
  allContacts(state, payload) {
    state.contacts = payload;
  },
  setMessage(state, payload) {
    state.message = payload;
  },
  clearMessage(state) {
    state.message = "";
  },
};
