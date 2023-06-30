<template>
  <div class="container">
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div
      v-if="contacts.length > 0"
      class="d-flex justify-content-between"
      style="padding-top: 5px"
    >
      <div class="d-flex w-75" style="margin-left: -32px">
        <input
          v-show="contacts"
          class="form-control ms-5 primary"
          type="text"
          name="searchString"
          id="searchString"
          placeholder="Search for contact"
          v-model="searchString"
        />
      </div>
      <div class="controls" v-show="contacts" style="margin-right: -20px">
        <base-button id="baseButton" link to="/register"
          >Add New Contact <i class="mdi mdi-account-plus ms-1"></i
        ></base-button>
      </div>
    </div>
    <h2 v-if="contacts.length > 0" class="mt-5 contacts-list-title">
      Contacts List
    </h2>
    <h5 v-if="showMessage" class="text-success">{{ message }}</h5>
    <div v-if="isLoading"><base-spinner></base-spinner></div>
    <div v-else-if="contacts.length > 0" class="row">
      <table class="table table-light table-striped table-hover">
        <thead class="table-dark-blue text-center">
          <tr>
            <th>ID</th>
            <th @click="sortBy('firstName')">
              Full Name
              <i
                :class="[
                  'mdi',
                  'sort-icon',
                  {
                    'mdi-sort': sortColumn !== 'firstName',
                    'mdi-sort-ascending':
                      sortColumn === 'firstName' && sortDirection === 'asc',
                    'mdi-sort-descending':
                      sortColumn === 'firstName' && sortDirection === 'desc',
                  },
                ]"
              ></i>
            </th>
            <th @click="sortBy('email')">
              Email Address<i
                :class="[
                  'mdi',
                  'sort-icon',
                  {
                    'mdi-sort': sortColumn !== 'email',
                    'mdi-sort-ascending':
                      sortColumn === 'email' && sortDirection === 'asc',
                    'mdi-sort-descending':
                      sortColumn === 'email' && sortDirection === 'desc',
                  },
                ]"
              ></i>
            </th>
            <th @click="sortBy('phone')">
              Phone Number
              <i
                :class="[
                  'mdi',
                  'sort-icon',
                  {
                    'mdi-sort': sortColumn !== 'phone',
                    'mdi-sort-ascending':
                      sortColumn === 'phone' && sortDirection === 'asc',
                    'mdi-sort-descending':
                      sortColumn === 'phone' && sortDirection === 'desc',
                  },
                ]"
              ></i>
            </th>
            <th @click="sortBy('position')">
              Position or job title
              <i
                :class="[
                  'mdi',
                  'sort-icon',
                  {
                    'mdi-sort': sortColumn !== 'position',
                    'mdi-sort-ascending':
                      sortColumn === 'position' && sortDirection === 'asc',
                    'mdi-sort-descending':
                      sortColumn === 'position' && sortDirection === 'desc',
                  },
                ]"
              ></i>
            </th>
            <th @click="sortBy('selectedCity')">
              Municipality
              <i
                :class="[
                  'mdi',
                  'sort-icon',
                  {
                    'mdi-sort': sortColumn !== 'selectedCity',
                    'mdi-sort-ascending':
                      sortColumn === 'selectedCity' && sortDirection === 'asc',
                    'mdi-sort-descending':
                      sortColumn === 'selectedCity' && sortDirection === 'desc',
                  },
                ]"
              ></i>
            </th>
            <th @click="sortBy('birthDate')">
              Date of birth or age.
              <i
                :class="[
                  'mdi',
                  'sort-icon',
                  {
                    'mdi-sort': sortColumn !== 'birthDate',
                    'mdi-sort-ascending':
                      sortColumn === 'birthDate' && sortDirection === 'asc',
                    'mdi-sort-descending':
                      sortColumn === 'birthDate' && sortDirection === 'desc',
                  },
                ]"
              ></i>
            </th>
            <th>Additional Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <contact-item
            v-for="contact in filteredContactsList"
            :key="contact.id"
            :id="contact.id"
            :firstName="contact.firstName"
            :lastName="contact.lastName"
            :email="contact.email"
            :phone="contact.phone"
            :position="contact.position"
            :selectedCity="contact.selectedCity"
            :birthDate="contact.birthDate"
            :additionalInformation="contact.additionalInformation"
          ></contact-item>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <v-pagination
          v-model="currPage"
          :length="totalPages"
          :total-visible="5"
          @input="changePage"
          prev-icon="mdi mdi-chevron-left"
          next-icon="mdi mdi-chevron-right"
        ></v-pagination>
      </div>
    </div>
    <base-card v-else>
      <h3>
        There are no data yet for contacts. If you want to add a contact please
        click
        <router-link to="/register">register contact</router-link>
      </h3>
    </base-card>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseDialog from "@/components/layouts/BaseDialog.vue";
import ContactItem from "../../components/contacts/ContactItem.vue";
import BaseCard from "@/components/layouts/BaseCard.vue";
import BaseSpinner from "@/components/layouts/BaseSpinner.vue";

export default {
  components: {
    ContactItem,
    BaseDialog,
    BaseCard,
    BaseSpinner,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      searchString: "",
      currPage: 1,
      pageSize: 5,
      sortColumn: "",
      sortDirection: "asc",
    };
  },
  computed: {
    contacts() {
      return this.$store.getters["contacts/contacts"];
    },
    totalContacts() {
      return this.contacts.length;
    },
    totalPages() {
      return Math.ceil(this.totalContacts / this.pageSize);
    },
    filteredContactsList() {
      const startIndex = (this.currPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const filteredContacts = this.contacts.filter(
        (contact) =>
          contact.id.toLowerCase().includes(this.searchString) ||
          contact.firstName.toLowerCase().includes(this.searchString) ||
          contact.lastName.toLowerCase().includes(this.searchString) ||
          contact.email.toLowerCase().includes(this.searchString) ||
          contact.phone.toLowerCase().includes(this.searchString) ||
          contact.position.toLowerCase().includes(this.searchString) ||
          contact.selectedCity.toLowerCase().includes(this.searchString) ||
          contact.birthDate.toLowerCase().includes(this.searchString)
      );
      return filteredContacts.slice(startIndex, endIndex);
    },
    showMessage() {
      return this.$store.getters["contacts/getMessage"] !== "";
    },
    message() {
      return this.$store.getters["contacts/getMessage"];
    },
  },
  created() {
    this.loadContacts();
  },
  methods: {
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortDirection = "asc";
      }

      this.contacts.sort((contactA, contactB) => {
        const valueA = contactA[column].toLowerCase();
        const valueB = contactB[column].toLowerCase();

        if (valueA < valueB) {
          return this.sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    },
    async loadContacts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("contacts/loadAllContacts");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    changePage(page) {
      this.currPage = page;
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 0.78rem;
}
.table thead th {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background-color: #11253b;
  color: white;
}
.contacts-list-title {
  color: #11253b;
  font-weight: bold;
}
sort-icon {
  font-size: 20px;
  color: #fff;
}
</style>