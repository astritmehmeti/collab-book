<template>
  <tr>
    <td class="text-info text-center align-middle">{{ id }}</td>
    <td class="text-center align-middle">{{ fullName }}</td>
    <td class="text-center align-middle">{{ email }}</td>
    <td class="text-center align-middle">{{ phone }}</td>
    <td class="text-center align-middle">{{ position }}</td>
    <td class="text-center align-middle">{{ selectedCity }}</td>
    <td class="text-center align-middle">{{ birthDate }}</td>
    <td class="text-center align-middle">{{ additionalInformation }}</td>
    <td>
      <base-button link :to="editContact"
        >Edit <i class="mdi mdi-account-edit text-info"></i
      ></base-button>
      <base-button link :to="deleteContact"
        >Delete <i class="mdi mdi-delete text-danger"></i
      ></base-button>
    </td>
  </tr>
</template>

<script>
import BaseButton from "../layouts/BaseButton.vue";
export default {
  components: { BaseButton },
  props: [
    "id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "position",
    "selectedCity",
    "birthDate",
    "additionalInformation",
  ],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    editContact() {
      if (this.$route.path.includes("/edit/")) {
        return;
      }

      return this.$route.path + "/edit/" + this.id;
    },
    deleteContact() {
      if (this.$route.path.includes("/delete/")) {
        return;
      }

      return this.$route.path + "/delete/" + this.id;
    },
  },
};
</script>