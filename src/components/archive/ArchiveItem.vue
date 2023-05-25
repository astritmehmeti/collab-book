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
    <td class="text-center align-middle">{{ archivedDate }}</td>
    <td>
      <base-button link :to="restoreContact"
        >Restore <i class="mdi mdi-backup-restore text-info"></i
      ></base-button>
      <base-button link :to="viewContact"
        >View <i class="mdi mdi-eye-outline text-info"></i
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
    "archivedDate",
  ],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    restoreContact() {
      if (this.$route.path.includes("/restore/")) {
        return;
      }

      return this.$route.path + "/restore/" + this.id;
    },
    viewContact() {
      if (this.$route.path.includes("/view/")) {
        return;
      }

      return this.$route.path + "/view/" + this.id;
    },
  },
};
</script>