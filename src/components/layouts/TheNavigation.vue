<template>
  <div class="container">
    <nav class="navbar-expand-lg navigation">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link to="/home" class="nav-link" exact>Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contacts" class="nav-link">Contacts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/archive" class="nav-link">Archive</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/help" class="nav-link">Help</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>


<style scoped>
.navigation {
  width: 101.9%;
  margin-left: -12.3px;
  background-color: #ffff;
  padding-top: 10rem;
  padding-bottom: 1rem;
  z-index: 1001;
}
</style>
