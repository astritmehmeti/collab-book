import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ContactsList from "./pages/contacts/ContactsList.vue";
import ArchiveList from "./pages/archive/ArchiveList.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const ContactRegistration = () => import("./pages/contacts/ContactRegistration.vue"); // prettier-ignore
const EditContact = () => import("./pages/contacts/EditContact.vue");
const DeleteContact = () => import("./pages/contacts/DeleteContact.vue");
const RestoreContact = () => import("./pages/archive/RestoreContact.vue");
const ViewContact = () => import("./pages/archive/ViewContact.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth" },
    { path: "/home", component: HomePage },
    {
      path: "/contacts",
      component: ContactsList,
      meta: { requiresAuth: true },
      children: [
        {
          path: "edit/:id",
          component: EditContact,
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "delete/:id",
          component: DeleteContact,
          props: true,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/archive",
      component: ArchiveList,
      meta: { requiresAuth: true },
      children: [
        {
          path: "restore/:id",
          component: RestoreContact,
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "view/:id",
          component: ViewContact,
          props: true,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/register",
      component: ContactRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/contacts");
  } else {
    next();
  }
});

export default router;
