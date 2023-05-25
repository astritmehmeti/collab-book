<template>
  <teleport to="body">
    <transition name="dialog">
      <div class="container">
        <base-dialog :show="showModal" @close="close" title="View contact">
          <base-card>
            <h4 class="d-flex justify-content-center">Contact Information</h4>
            <div class="row justify-content-center">
              <div class="col-md-11">
                <div class="row mb-2">
                  <div class="col">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="firstName"
                        class="form-control"
                        placeholder="First name"
                        v-model.trim="firstName"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="lastName"
                        class="form-control"
                        placeholder="Last name"
                        v-model.trim="lastName"
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div class="form-outline mb-2">
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="Email Address"
                    v-model.trim="email"
                    readonly
                  />
                </div>
                <div class="form-outline mb-2">
                  <input
                    type="tel"
                    id="phone"
                    class="form-control"
                    v-model.trim="phone"
                    readonly
                  />
                </div>
                <div class="form-outline mb-2">
                  <input
                    type="text"
                    id="position"
                    class="form-control"
                    v-model.trim="position"
                    readonly
                  />
                </div>
                <div class="form-outline mb-2">
                  <input
                    id="selectedCity"
                    class="form-control"
                    v-model="selectedCity"
                    readonly
                  />
                </div>
                <div class="form-outline mb-2">
                  <input
                    class="form-control"
                    type="text"
                    id="birthDate"
                    v-model="birthDate"
                    readonly
                  />
                </div>
                <div class="form-outline mb-2">
                  <textarea
                    class="form-control"
                    id="additionalInformation"
                    rows="4"
                    v-model="additionalInformation"
                    readonly
                  ></textarea>
                </div>

                <div>
                  <base-button type="button" @click="close"
                    >OK <i class="mdi mdi-checkbox-marked-circle-outline"></i
                  ></base-button>
                </div>
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
export default {
  components: { BaseDialog, BaseButton, BaseCard },
  props: ["id"],
  data() {
    return {
      showModal: true,
      firstName: "",
      lastName: "",
      email: "",
      phone: null,
      position: "",
      selectedCity: "",
      birthDate: "",
      additionalInformation: "",
    };
  },
  methods: {
    close() {
      this.showModal = false;
      this.$router.replace("/archive");
    },
  },

  mounted() {
    const contacts = JSON.parse(localStorage.getItem("archivedContacts")) || [];
    const contact = contacts.find((contact) => contact.id === this.id);
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.email = contact.email;
    this.phone = contact.phone;
    this.position = contact.position;
    this.selectedCity = contact.selectedCity;
    this.birthDate = contact.birthDate;
    this.additionalInformation = contact.additionalInformation;
  },
};
</script>

