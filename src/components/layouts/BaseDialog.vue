<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog" mode="in-out" appear>
      <dialog open v-if="show" :style="dialogStyle">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions"></slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    position: {
      type: String,
      required: false,
      default: "absolute",
    },
  },
  computed: {
    dialogStyle() {
      return {
        position: this.position,
      };
    },
  },
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  position: fixed;
  top: 40vh;
  left: 10%;
  width: 100%;
  z-index: 100;
  border-radius: 12px;
  box-shadow: 0 2px 8px #11254b;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #11253b;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
  background-color: #11253b;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.6s ease-in-out;
}

.dialog-leave-active {
  transition: all 0.6s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>