<template>
  <teleport to="body">
    <transition name="dialog">
      <div class="container">
        <base-dialog :show="showModal" @close="cancel" title="Edit contact">
          <base-card>
            <h4 class="d-flex justify-content-center">Edit contact</h4>
            <div class="row justify-content-center">
              <div class="col-md-11">
                <form @submit.prevent="submitForm">
                  <div class="row mb-2">
                    <div class="col">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          class="form-control"
                          placeholder="First name"
                          v-model.trim="firstName.value"
                          @blur="clearValidity('firstName')"
                          :class="{ invalid: !firstName.isValid }"
                        />
                        <p v-if="!firstName.isValid">Please enter First Name</p>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          class="form-control"
                          placeholder="Last name"
                          v-model.trim="lastName.value"
                          @blur="clearValidity('lastName')"
                          :class="{ invalid: !lastName.isValid }"
                        />
                        <p v-if="!lastName.isValid">Please enter Last Name</p>
                      </div>
                    </div>
                  </div>
                  <div class="form-outline mb-2">
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      placeholder="Email Address"
                      v-model.trim="email.value"
                      @blur="clearValidity('email')"
                      :class="{ invalid: !email.isValid }"
                    />
                    <p v-if="!email.isValid">Please enter Email Address</p>
                  </div>
                  <div class="form-outline mb-2">
                    <input
                      type="tel"
                      id="phone"
                      pattern="\+\d{3}-\d{2}-\d{3}-\d{3}"
                      class="form-control"
                      placeholder="Phone number / Accepted Format: +383-44-123-456"
                      v-model.trim="phone.value"
                      @blur="clearValidity('phone')"
                      :class="{ invalid: !phone.isValid }"
                    />
                    <p v-if="!phone.isValid">
                      Please enter Phone Number in accepted format:
                      +383-44-123-456
                    </p>
                  </div>
                  <div class="form-outline mb-2">
                    <input
                      type="text"
                      id="position"
                      class="form-control"
                      placeholder="Job/Position"
                      v-model.trim="position.value"
                      @blur="clearValidity('position')"
                      :class="{ invalid: !position.isValid }"
                    />
                    <p v-if="!position.isValid">
                      Please enter your current Position/Job
                    </p>
                  </div>
                  <div class="form-outline mb-2">
                    <select
                      id="selectedCity"
                      class="form-control"
                      v-model="selectedCity.value"
                      @blur="clearValidity('selectedCity')"
                      :class="{ invalid: !selectedCity.isValid }"
                    >
                      <option value="" disabled selected>
                        Please select municipality
                      </option>
                      <option
                        v-for="city in cities"
                        :key="city.name"
                        :value="city.name"
                      >
                        {{ city.name }}
                      </option>
                    </select>
                    <p v-if="!selectedCity.isValid">
                      Please select municipality
                    </p>
                  </div>
                  <div class="form-outline mb-2">
                    <input
                      placeholder="Birthdate"
                      class="form-control"
                      type="text"
                      onfocus="(this.type='date')"
                      id="birthDate"
                      v-model="birthDate.value"
                      @blur="clearValidity('birthDate')"
                      :class="{ invalid: !birthDate.isValid }"
                    />
                    <p v-if="!birthDate.isValid">Please enter Birthdate</p>
                  </div>
                  <div class="form-outline mb-2">
                    <textarea
                      class="form-control"
                      id="additionalInformation"
                      rows="4"
                      v-model="additionalInformation.value"
                      placeholder="Additional Information(Optional)"
                      :class="{ invalid: !additionalInformation.value }"
                    ></textarea>
                  </div>
                  <p v-if="!formIsValid">
                    Please fix the above errors and submit again!
                  </p>

                  <div>
                    <base-button type="button" @click="cancel"
                      >Cancel <i class="mdi mdi-cancel text-danger"></i
                    ></base-button>
                    <base-button
                      >Save <i class="mdi mdi-content-save"></i
                    ></base-button>
                  </div>
                </form>
              </div>
            </div>
          </base-card>
        </base-dialog>
      </div>
    </transition>
  </teleport>
</template>

<script>
import BaseDialog from "@/components/layouts/BaseDialog.vue";
import BaseButton from "@/components/layouts/BaseButton.vue";
import BaseCard from "@/components/layouts/BaseCard.vue";
import { fetchCityData } from "@/helpers";
export default {
  components: { BaseDialog, BaseButton, BaseCard },
  props: ["id"],
  data() {
    return {
      cities: [],
      formIsValid: true,
      showModal: true,
      firstName: {
        type: String,
        required: true,
        value: "",
        isValid: true,
      },
      lastName: {
        type: String,
        required: true,
        value: "",
        isValid: true,
      },
      email: {
        type: String,
        required: true,
        value: "",
        isValid: true,
      },
      phone: {
        type: Number,
        required: true,
        value: null,
        isValid: true,
      },
      position: {
        type: String,
        required: true,
        value: "",
        isValid: true,
      },
      selectedCity: {
        type: String,
        required: true,
        value: "",
        isValid: true,
      },
      birthDate: {
        type: Date,
        required: true,
        value: "",
        isValid: true,
      },
      additionalInformation: {
        type: String,
        required: false,
        value: "",
      },
    };
  },
  methods: {
    formValidation() {
      this.formIsValid = true;
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.value === "" || !this.email.value.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.phone.value === "" ||
        !/\+\d{3}-\d{2}-\d{3}-\d{3}/.test(this.phone.value)
      ) {
        this.phone.isValid = false;
        this.formIsValid = false;
      }
      if (this.position.value === "") {
        this.position.isValid = false;
        this.formIsValid = false;
      }
      if (this.selectedCity.value === "") {
        this.selectedCity.isValid = false;
        this.formIsValid = false;
      }
      if (this.birthDate.value === "") {
        this.birthDate.isValid = false;
        this.formIsValid = false;
      }
      if (this.additionalInformation.value === "") {
        this.additionalInformation.value =
          "No additional information provided!";
      }
    },
    submitForm() {
      // this.showModal = true;
      this.formValidation();
      if (!this.formIsValid) return;
      try {
        const formData = {
          id: this.id,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,
          phone: this.phone.value,
          position: this.position.value,
          selectedCity: this.selectedCity.value,
          birthDate: this.birthDate.value,
          additionalInformation: this.additionalInformation.value,
        };
        this.$store.dispatch("contacts/editContact", formData);
        this.showModal = false;
        this.$router.replace("/contacts");
      } catch (error) {
        alert(error.message);
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    cancel() {
      this.showModal = false;
      this.$router.replace("/contacts");
    },
  },
  created() {
    fetchCityData().then((data) => {
      this.cities = data;
    });
  },

  mounted() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = contacts.find((contact) => contact.id === this.id);
    this.firstName.value = contact.firstName;
    this.lastName.value = contact.lastName;
    this.email.value = contact.email;
    this.phone.value = contact.phone;
    this.position.value = contact.position;
    this.selectedCity.value = contact.selectedCity;
    this.birthDate.value = contact.birthDate;
    this.additionalInformation.value = contact.additionalInformation;
  },
};
</script>

<style scoped>
.invalid label,
p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
