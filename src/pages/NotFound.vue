<template>
  <div class="not-found d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div class="mb-4">
        <h1 class="colorize-red custom-font">404</h1>
      </div>
      <div>
        <h4>
          <i class="mdi mdi-alert-outline colorize-red mr-2"></i>Oops! Page not
          found.
        </h4>
        <p>The page you ara looking for was not found</p>
        <p>You may return to <router-link to="/">home page</router-link>.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h4 {
  color: #4b5563;
}
.colorize-red {
  color: #ef4444;
}
.not-found {
  max-width: 600px;
  margin: 0 auto;
  padding: 50px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.custom-font {
  font-size: 8rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.mr-4 {
  margin-right: 1.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
