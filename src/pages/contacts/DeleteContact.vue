<template>
  <div class="container">
    <base-dialog :show="showModal" @close="cancel" title="Delete contact">
      <h4>Please confirm if you want to delete this contact</h4>
      <div class="mt-5">
        <base-button @click="deleteContact"
          >Delete <i class="mdi mdi-delete text-danger"></i
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
    deleteContact() {
      this.$store.dispatch("contacts/deleteContact", this.id);
      this.showModal = false;
      this.$router.replace("/contacts");
    },
    cancel() {
      this.showModal = false;
      this.$router.replace("/contacts");
    },
  },
};
</script>