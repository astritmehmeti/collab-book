<template>
  <button v-if="!link" class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  padding-top: 0.5rem;
  font: inherit;
  background-color: #ffff;
  border: 1px solid #11253b;
  border-radius: 5px;
  color: #11254b;
  cursor: pointer;
  margin-right: 0.5rem;
  display: inline-block;
  height: 2.4rem;
  font-weight: bold;
}
a:hover,
a:active,
button:hover,
button:active {
  background-color: #11253b;
  color: #ffff;
  border: 1px solid #ffff;
}

.flat {
  background-color: transparent;
  color: #11253b;
  border: none;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #11253b;
}
</style>