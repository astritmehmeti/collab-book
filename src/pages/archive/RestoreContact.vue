<template>
  <div class="container">
    <base-dialog :show="showModal" @close="cancel" title="Restore contact">
      <h4>Please confirm if you want to restore this contact</h4>
      <div class="mt-5">
        <base-button @click="restoreContact"
          >Restore <i class="mdi mdi-restore text-success"></i
        ></base-button>
        <base-button @click="cancel"
          >Cancel <i class="mdi mdi-cancel text-danger"></i
        ></base-button>
      </div>
    </base-dialog>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    restoreContact() {
      this.$store.dispatch("archive/restoreContact", this.id);
      this.showModal = false;
      this.$router.replace("/archive");
    },
    cancel() {
      this.showModal = false;
      this.$router.replace("/archive");
    },
  },
};
</script>