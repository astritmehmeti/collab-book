<template>
  <div class="login-container">
    <base-dialog :show="!!error" title="An error occured!" @close="handleError"
      ><h5>{{ error }}</h5>
      <base-button @click="handleError" class="mt-5"
        >Close<i class="ms-2 mdi mdi-close-circle"></i
      ></base-button>
    </base-dialog>
    <div>
      <div class="login-card">
        <div class="card-inner" :class="{ flip: !showLoginForm }">
          <div class="card-front">
            <h2>Login</h2>
            <form @submit.prevent="submitForm">
              <!-- Login form -->
              <input
                type="email"
                id="email"
                v-model.trim="loginData.email.value"
                @blur="clearValidity('email', loginData)"
                :class="{ invalid: !loginData.email.isValid }"
                placeholder="Email Address"
              />
              <p v-if="!loginData.email.isValid">Please enter Email Address</p>
              <input
                type="password"
                id="password"
                v-model.trim="loginData.password.value"
                @blur="clearValidity('password', loginData)"
                :class="{ invalid: !loginData.password.isValid }"
                placeholder="Password"
              />
              <p v-if="!loginData.password.isValid">
                Your password must be at least 8 characters long!
              </p>
              <button class="login-button">Login</button>
            </form>
            <div class="switch-button" @click="showLoginForm = false">
              Click to Signup
            </div>
          </div>
          <div class="card-back">
            <h2>Signup</h2>
            <form @submit.prevent="submitForm">
              <!-- Signup form -->
              <input
                type="email"
                v-model.trim="signupData.email.value"
                @blur="clearValidity('email', signupData)"
                :class="{ invalid: !signupData.email.isValid }"
                placeholder="Email"
              />
              <p v-if="!signupData.email.isValid">Please enter Email Address</p>
              <input
                type="password"
                v-model.trim="signupData.password.value"
                @blur="clearValidity('password', signupData)"
                :class="{ invalid: !signupData.password.isValid }"
                placeholder="Password"
              />
              <p v-if="!signupData.password.isValid">
                Your password must be at least 8 characters long!
              </p>
              <button class="signup-button">Signup</button>
            </form>
            <div class="switch-button" @click="showLoginForm = true">
              Click to Login
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BaseDialog from "@/components/layouts/BaseDialog.vue";

export default {
  components: { BaseDialog },
  data() {
    return {
      showLoginForm: true,
      formIsValid: true,
      error: null,
      loginData: {
        email: {
          value: "",
          required: true,
          isValid: true,
        },
        password: {
          value: "",
          required: true,
          isValid: true,
        },
      },
      signupData: {
        email: {
          value: "",
          required: true,
          isValid: true,
        },
        password: {
          value: "",
          required: true,
          isValid: true,
        },
      },
    };
  },
  computed: {
    submitButtonCaption() {
      return this.showLoginForm ? "Login" : "Signup";
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      try {
        if (this.showLoginForm) {
          if (
            this.loginData.email.value === "" ||
            !this.loginData.email.value.includes("@")
          ) {
            this.loginData.email.isValid = false;
            this.formIsValid = false;
            return;
          }
          if (this.loginData.password.value.length < 8) {
            this.loginData.password.isValid = false;
            this.formIsValid = false;
            return;
          }
          const loginData = { ...this.loginData };
          await this.$store.dispatch("login", loginData);
          this.$store.dispatch("loggedUser", this.loginData.email.value);
        } else {
          if (
            this.signupData.email.value === "" ||
            !this.signupData.email.value.includes("@")
          ) {
            this.signupData.email.isValid = false;
            this.formIsValid = false;
            return;
          }
          if (this.signupData.password.value.length < 8) {
            this.signupData.password.isValid = false;
            this.formIsValid = false;
            return;
          }
          const signupData = { ...this.signupData };
          await this.$store.dispatch("signup", signupData);
          this.$store.dispatch("loggedUser", this.signupData.email.value);
        }
        this.$router.replace("/contacts");
      } catch (error) {
        this.error = error.message || "Failed to authenticate! Try again";
      }
    },
    clearValidity(input, data) {
      data[input].isValid = true;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.login-container {
  background-image: url("../../assets/Fluid-100s-2401px.svg");
  background-repeat: none;
}
.invalid label,
p,
h5 {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  position: relative;
  width: 300px;
  height: 400px;
  perspective: 800px;
}

.card-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card-inner.flip {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
}

button {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.login-button {
  background-color: #4caf50;
  color: white;
  border: none;
}

.signup-button {
  background-color: #2196f3;
  color: white;
  border: none;
}

.switch-button {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  color: #2196f3;
  text-decoration: underline;
}
</style>
