<template>
  <contacts-form @save-data="submitData" class="contacts-form"></contacts-form>
</template>

<script>
import ContactsForm from "../../components/contacts/ContactsForm.vue";
export default {
  components: {
    ContactsForm,
  },
  methods: {
    submitData(payload) {
      this.$store.dispatch("contacts/newContact", payload);
      this.$router.replace("/contacts");
    },
  },
};
</script>

<style scoped>
.contacts-form {
  padding-top: 10rem;
}
</style>