<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <router-link to="/home">
          <img src="../../assets/CollabBook.png" alt="Logo" height="96" />
        </router-link>

        <div class="navbar-text display-5 gradient-text">COLLAB BOOK</div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item d-flex flex-column align-items-end">
              <div class="d-flex align-items-center">
                <i
                  class="mdi mdi-account-circle fs-2"
                  style="color: #11253b"
                ></i>
                <span class="nav-link text-dark">{{ loggedUser }}</span>
              </div>
              <v-btn append-icon="mdi-logout" @click="logout">Logout</v-btn>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    loggedUser() {
      return this.$store.getters.userLogged;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 6rem;
  background-color: white;
  position: fixed;
  z-index: 1000;
}
img {
  padding-bottom: 9px;
  height: 96px;
  margin-top: 0px;
}
.v-btn {
  color: #ffff;
  background: #12253b;
  font-weight: 200;
  font-size: 14px;
}
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.navbar-text {
  flex-grow: 1;
  text-align: right;
  font-weight: bolder;
  color: #12253b;
}
.gradient-text {
  background: linear-gradient(0deg, #010203, #4dc1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
