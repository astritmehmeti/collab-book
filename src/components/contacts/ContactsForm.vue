<template>
  <div class="container">
    <base-card>
      <h4>Add new contact</h4>
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
              />
              <p v-if="!phone.isValid">
                Please enter Phone Number in accepted format: +383-44-123-456
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
              <p v-if="!selectedCity.isValid">Please select municipality</p>
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
              ></textarea>
            </div>
            <div class="my-4">
              <base-button>Add Contact</base-button>
            </div>
          </form>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseButton from "../layouts/BaseButton.vue";
import BaseCard from "../layouts/BaseCard.vue";
import { fetchCityData } from "../../helpers.js";
export default {
  components: { BaseButton, BaseCard },
  emits: ["save-data"],
  data() {
    return {
      cities: [],
      formIsValid: true,
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
    clearValidity(input) {
      this[input].isValid = true;
    },
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
      this.formValidation();
      if (!this.formIsValid) return;

      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        phone: this.phone.value,
        position: this.position.value,
        selectedCity: this.selectedCity.value,
        birthDate: this.birthDate.value,
        additionalInformation: this.additionalInformation.value,
      };
      this.$emit("save-data", formData);
    },
  },
  created() {
    fetchCityData().then((data) => {
      this.cities = data;
    });
  },
};
</script>


<style scoped>
div,
form {
  background-color: white;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  background-color: white;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>