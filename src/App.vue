<template>
  <div>
    <the-header v-if="isLoggedIn"></the-header>
    <the-navigation v-if="isLoggedIn && isExcludedRoute"></the-navigation>
  </div>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import TheNavigation from "./components/layouts/TheNavigation.vue";
export default {
  name: "App",
  components: { TheHeader, TheNavigation },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isExcludedRoute() {
      const excludedRoutes = ["/register"];
      return !excludedRoutes.includes(this.$route.path);
    },
  },

  created() {
    this.$store.dispatch("autoLogin");
  },
  watch: {
    didAutoLogout(currentVal, oldVal) {
      if (currentVal && currentVal !== oldVal) {
        this.$router.replace("/auth");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
