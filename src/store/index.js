import { createStore } from "vuex";
import contactsModule from "./modules/contacts/index.js";
import archiveModule from "./modules/archive/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    contacts: contactsModule,
    archive: archiveModule,
    auth: authModule,
  },
});

export default store;
