<template>
  <v-container>
    <v-card width="800" style="margin: 0 auto">
      <div style="width: 150px"><v-img :src="wiseStampLogo" /></div>
      <v-card-title class="justify-center"
        >Please enter your personnal details here:</v-card-title
      >
      <v-card-text>
        <div class="text-fields-block">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="fullName"
              :rules="nameRules"
              label="Full name"
              required
            ></v-text-field>

            <v-text-field
              v-model="jobTitle"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>

            <v-text-field
              v-model="company"
              :rules="companyRules"
              label="Company"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail address"
              required
            ></v-text-field>

            <vue-tel-input-vuetify
              @input="validateAndSetPhone"
              :error="!isNumberValid"
            ></vue-tel-input-vuetify>

            <v-text-field
              v-model="address"
              :rules="nameRules"
              label="Address"
              required
            ></v-text-field>
          </v-form>
        </div>
        <div class="py-10 your-template" v-if="yourTemplate">
          <div v-html="yourTemplate"></div>
          <v-btn
            :loading="isLoading"
            :disabled="!valid || !isNumberValid"
            @click="yourTemplate = ''"
            >Select another template</v-btn
          >
        </div>
        <div
          class="d-flex justify-space-around py-10"
          v-if="!yourTemplate && !!templates.length"
        >
          <div v-for="(template, i) in templates" :key="i">
            <div v-html="template.html"></div>
            <v-btn
              :loading="isLoading"
              :disabled="!valid || !isNumberValid"
              @click="selectTemplate(template.title)"
              class="primary"
              >Select</v-btn
            >
          </div>
        </div>
      </v-card-text>
      <v-snackbar v-model="snackbarStatus">
        {{ snackBarText }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import axiosInstance from "../axios";
import wiseStampLogo from "../assets/wiseStampLogo.png";

export default {
  name: "Form",

  data: () => ({
    wiseStampLogo,
    valid: true,
    fullName: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    jobTitle: "",
    titleRules: [(v) => !!v || "Title is required"],
    company: "",
    companyRules: [(v) => !!v || "Company is required"],
    phoneNumber: null,
    isNumberValid: true,
    address: "",
    templates: [],
    yourTemplate: "",
    isLoading: false,
    snackbarStatus: false,
    snackBarText: "",
  }),
  async created() {
    this.getTemplates();
  },
  methods: {
    validateAndSetPhone(number, data) {
      this.$data.valid = this.$refs.form.validate();
      this.$data.isNumberValid = data.isValid;
      if (data.isValid) {
        this.$data.phoneNumber = data.number.international;
      }
    },
    async getTemplates() {
      try {
        this.$data.isLoading = true;
        const { data } = await axiosInstance.get("/template");
        this.$data.templates = data;
      } catch (e) {
        const message = `Something went wrong: ${e.message}`;
        this.$data.snackbarStatus = true;
        this.$data.snackBarText = message;
      } finally {
        this.$data.isLoading = false;
      }
    },
    async selectTemplate(value) {
      const isValid = this.$refs.form.validate();
      if (!this.$data.phoneNumber) {
        return (this.$data.isNumberValid = false);
      }
      if (!isValid) {
        return;
      }

      const form = {
        fullName: this.$data.fullName,
        jobTitle: this.$data.jobTitle,
        company: this.$data.company,
        email: this.$data.email,
        phone: this.$data.phoneNumber,
        address: this.$data.address,
      };
      try {
        this.$data.isLoading = true;
        const { data } = await axiosInstance.post("/template", {
          form,
          templateTitle: value,
        });
        this.$data.yourTemplate = data.html;
      } catch (e) {
        const message = `Something went wrong: ${e.response.statusText}`;
        this.$data.snackbarStatus = true;
        this.$data.snackBarText = message;
      } finally {
        this.$data.isLoading = false;
      }
    },
  },
};
</script>
<style scoped>
.text-fields-block {
  max-width: 650px;
  margin: 0 auto;
}
.your-template {
  max-width: 650px;
  margin: 0 auto;
}
</style>
